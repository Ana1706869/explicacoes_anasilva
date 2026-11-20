const express=require ("express")
const mongoose=require("mongoose")
const cors= require("cors")
const Explicandos=require("./modelos/Explicandos")
const Explicacoes=require("./modelos/Explicacoes")
const PORT= process.env.PORT ||9090
require("dotenv").config()

const http=require("http")
const WebSocket=require("ws")
const router = express.Router();
const Forum=require("./modelos/Forum")


const multer=require("multer")
const path=require("path")
const fs=require("fs")
const { pipeline }=require("stream/promises")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")
const getUserRole=require("./userRole")
const usersByRoom=new Map()
const uploadsDir=path.join(__dirname,"uploads")
const recordingTempDir=path.join(__dirname,"recording-tmp")
const frontendBuildPath=path.resolve(__dirname,"..","frontend-build")

if(!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir,{recursive:true})
}
if(!fs.existsSync(recordingTempDir)){
  fs.mkdirSync(recordingTempDir,{recursive:true})
}

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,uploadsDir)
  },
    filename:(req,file,cb)=>{
      cb(null,Date.now()+""+file.originalname)
    }
  
})
const upload=multer({storage:storage,limits:{fileSize:10*1024*1024}})
const getRecordingContentType = async(filePath)=>{
  const file=await fs.promises.open(filePath,"r")
  try{
    const header=Buffer.alloc(12)
    const {bytesRead}=await file.read(header,0,header.length,0)
    if(bytesRead>=4 && header.subarray(0,4).equals(Buffer.from([0x1a,0x45,0xdf,0xa3]))){
      return "video/webm"
    }
    if(bytesRead>=8 && header.toString("ascii",4,8)==="ftyp"){
      return "video/mp4"
    }
    return null
  }finally{
    await file.close()
  }
}
const uploadRecording=multer({
  dest:recordingTempDir,
  limits:{fileSize:2*1024*1024*1024},
})
const parseRecordingUpload=(req,res,next)=>{
  uploadRecording.single("recording")(req,res,async(error)=>{
    if(!error){
      if(!req.file) return next()
      try{
        const contentType=await getRecordingContentType(req.file.path)
        if(!contentType){
          await fs.promises.unlink(req.file.path).catch(()=>{})
          return res.status(415).json({message:"O ficheiro enviado não é um vídeo suportado"})
        }
        req.file.mimetype=contentType
        return next()
      }catch(validationError){
        await fs.promises.unlink(req.file.path).catch(()=>{})
        console.error("Erro ao verificar o formato da gravação",validationError)
        return res.status(500).json({message:"Não foi possível verificar o formato da gravação"})
      }
    }
    if(error.code==="LIMIT_FILE_SIZE"){
      return res.status(413).json({message:"A gravação excede o limite de 2 GB"})
    }
    return res.status(400).json({message:"Não foi possível ler o ficheiro enviado"})
  })
}




const app=express()
const server=http.createServer(app)
const wss=new WebSocket.Server({noServer:true,perMessageDeflate:false})

const isMongoReady = () => mongoose.connection.readyState === 1
const getRecordingsBucket = () =>
  new mongoose.mongo.GridFSBucket(mongoose.connection.db,{bucketName:"explanationRecordings"})

const serializeRecording = (file) => ({
  id:String(file._id),
  name:file.metadata?.originalName || file.filename,
  uploadedAt:file.uploadDate,
  size:file.length,
  mimeType:file.contentType || "video/webm"
})

if(!process.env.JWT_SECRET && process.env.NODE_ENV === "production"){
  throw new Error("JWT_SECRET tem de estar configurada em produção")
}
if(!process.env.JWT_SECRET){
  console.warn("JWT_SECRET não definida: a usar segredo aleatório (as sessões terminam a cada reinício)")
}
const JWT_SECRET=process.env.JWT_SECRET||crypto.randomBytes(32).toString("hex")
const authenticate=(req,res,next)=>{
  // Todas as rotas protegidas usam o mesmo token para obter a identidade e o papel do pedido.
  const header=req.headers.authorization||""
  const token=header.startsWith("Bearer ")?header.slice(7):null
  if(!token){
    return res.status(401).json({message:"Autenticação necessária"})
  }
  try{
    req.user=jwt.verify(token,JWT_SECRET)
    next()
  }catch(error){
    res.status(401).json({message:"Sessão inválida ou expirada"})
  }
}

const requireExplicador=(req,res,next)=>{
  if(req.user.role!=="Explicador"){
    return res.status(403).json({message:"Acesso negado"})
  }
  next()
}

const canAccess=(user,explicandoId)=>user.role==="Explicador"||String(explicandoId)===user.id

const requireOnlineLessonAccess = async (req,res,next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).json({message:"Identificador de explicação inválido"})
  }
  try{
    const lesson=await Explicacoes.findById(req.params.id)
    if(!lesson){
      return res.status(404).json({message:"Explicação não encontrada"})
    }
    if(!canAccess(req.user,lesson.explicandoId)){
      return res.status(403).json({message:"Acesso negado"})
    }
    if(lesson.tipo!=="On-line"){
      return res.status(400).json({message:"As gravações só existem para explicações online"})
    }
    req.recordingLesson=lesson
    next()
  }catch(error){
    console.error("Erro ao validar acesso às gravações",error)
    res.status(500).json({message:"Erro ao validar acesso às gravações"})
  }
}

const requireMongoConnection = (req, res, next) => {
  if (!isMongoReady()) {
    return res.status(503).json({
      message: "Base de dados indisponivel. Verifique MONGO_URI no Render e o DNS do MongoDB Atlas."
    })
  }

  next()
}

server.on("upgrade",(request, socket,head)=>{
  const url=new URL (request.url, `http://${request.headers.host}`)
  const pathname=url.pathname
  if (pathname=="/ws"){
    let user
    // O handshake WebSocket é recusado antes da ligação se o token não for válido.
    try{
      user=jwt.verify(url.searchParams.get("token")||"",JWT_SECRET)
    }catch(error){
      socket.write("HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n")
      socket.destroy()
      return
    }
    wss.handleUpgrade(request,socket,head,(ws)=>{
      ws.user=user

   
    wss.emit("connection",ws,request)
     })
  }
})

    wss.on("connection", (ws) => {
        ws.on("message", async (message) => {
         
            try {
              const data=JSON.parse(message)
         
              if (data.type === "subscribe-explanation-list") {
                if (!['Explicador', 'Explicando'].includes(ws.user?.role)) {
                  ws.send(JSON.stringify({ type: "error", message: "Acesso negado" }));
                  return;
                }
                ws.explanationListSubscriber = true;
                ws.send(JSON.stringify({ type: "explanation-list-subscribed" }));
                return;
              }

              if (data.type === "join-room") {
                const peerId = typeof data.peerId === "string" ? data.peerId.trim() : "";
                const roomId = typeof data.roomId === "string" ? data.roomId.trim() : "";
                const peerInUse = [...wss.clients].some(
                  (client) => client !== ws && client.peerId === peerId,
                );
                if (
                  !peerId ||
                  peerId.length > 200 ||
                  !roomId ||
                  roomId.length !== 24 ||
                  peerInUse ||
                  (ws.peerId && (ws.peerId !== peerId || ws.roomId !== roomId))
                ) {
                  ws.send(JSON.stringify({ type: "error", message: "Sala ou peer inválido" }));
                  return;
                }
                const lesson = await Explicacoes.findById(roomId);
                // Só participantes autorizados podem entrar numa aula online já confirmada.
                if (
                  !lesson ||
                  lesson.confirmacao !== "Confirmada" ||
                  lesson.tipo !== "On-line" ||
                  !canAccess(ws.user, lesson.explicandoId)
                ) {
                  ws.send(JSON.stringify({ type: "error", message: "Sem acesso a esta explicação online" }));
                  return;
                }

                const nome = ws.user.nome || ws.user.email;
                let roomUsers = usersByRoom.get(roomId);
                if (!roomUsers) {
                  // Cada explicação mantém a sua própria lista para não misturar participantes.
                  roomUsers = new Map();
                  usersByRoom.set(roomId, roomUsers);
                }
                roomUsers.set(peerId, nome);
                ws.peerId = peerId;
                ws.roomId = roomId;
                ws.nome = nome;

                broadcastRoomUpdate(roomId);
                ws.send(
                  JSON.stringify({
                    type: "join-room",
                    message: `Bem-vindo à sala ${roomId}`,
                    roomId,
                    peerId,
                    users: [...roomUsers.keys()],
                    userNames: Object.fromEntries(roomUsers),
                  })
                );
                return;
              }

              if (!ws.roomId) {
                ws.send(JSON.stringify({ type: "error", message: "Entre numa explicação antes de enviar mensagens" }));
                return;
              }
         
              if (data.type === "chat-message") {
                const sender = ws.nome || ws.user.email;
                const text = typeof data.text === "string" ? data.text.trim() : "";

                if (!text) {
                  ws.send(JSON.stringify({ type: "error", message: "Mensagem vazia" }));
                } else {
                  const payload = {
                    type: "chat-message",
                    id: data.id || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
                    roomId: ws.roomId,
                    sender,
                    senderPeerId: ws.peerId,
                    text,
                    sentAt: new Date().toISOString(),
                  };

                  broadcastToRoom(JSON.stringify(payload), payload.roomId);
                }
              }
         
              if (data.type === "send-file") {
                const sender = ws.nome || ws.user.email;
                const payload = {
                  type: "receive-file",
                  id: data.id || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
                    roomId: ws.roomId,
                  sender,
                  filename: data.filename,
                  link: data.link,
                  sentAt: new Date().toISOString(),
                 
                };
                broadcastToRoom(JSON.stringify(payload), payload.roomId);
              }

         
              ws.send(JSON.stringify({ type: "ack", message: "Usuário conectado com sucesso" }));
            } catch (err) {
              console.error("Erro ao processar a mensagem do WebSocket", err);
            }
          })


    ws.on("close",()=>{
      if(!ws.peerId){
        return
      }
      const roomUsers=usersByRoom.get(ws.roomId)
      roomUsers?.delete(ws.peerId)
      if(roomUsers?.size===0){
        usersByRoom.delete(ws.roomId)
      }else if(roomUsers){
        broadcastRoomUpdate(ws.roomId)
      }
})
    })

function broadcast(msg,exclude) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !==exclude) {
        client.send(msg);
      }
    });
  }

function broadcastRoomUpdate(roomId) {
  const roomUsers=usersByRoom.get(roomId)
  if(!roomUsers)return
  const message=JSON.stringify({
    type:"room-update",
    usersInRoom:[...roomUsers.keys()],
    userNames:Object.fromEntries(roomUsers)
  })
  // A atualização é enviada apenas a sockets associados a esta explicação.
  wss.clients.forEach(client=>{
    if(client.readyState===WebSocket.OPEN && client.roomId===roomId){
      client.send(message)
    }
  })
}

function broadcastToRoom(msg, roomId) {
  wss.clients.forEach((client) => {
    if (client.readyState !== WebSocket.OPEN) return
    if (client.roomId !== roomId) return
    client.send(msg)
  })
}

function broadcastExplanationDeleted(explanationId) {
  const message = JSON.stringify({ type: "explanation-deleted", explanationId });
  wss.clients.forEach((client) => {
    if (
      client.readyState === WebSocket.OPEN &&
      client.user?.role === "Explicador" &&
      client.explanationListSubscriber
    ) {
      client.send(message);
    }
  });
}

function broadcastExplanationStatusUpdated(explanation) {
  const message = JSON.stringify({
    type: "explanation-status-updated",
    explanation,
  });
  wss.clients.forEach((client) => {
    if (
      client.readyState === WebSocket.OPEN &&
      client.user?.role === "Explicando" &&
      String(client.user.id) === String(explanation.explicandoId) &&
      client.explanationListSubscriber
    ) {
      client.send(message);
    }
  });
}

       


   


app.use(cors({origin:"*"}))

app.use(express.json())
app.use("/uploads", express.static(uploadsDir))

if(fs.existsSync(frontendBuildPath)){
  app.use(express.static(frontendBuildPath))
}




app.post("/upload",authenticate,upload.single("file"),(req,res)=>{
  const file=req.file
  if(!file)return res.status(400).json({error:"Nenhum ficheiro recebido"})

  const publicBaseUrl=process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get("host")}`

 

  res.json({
    originalName:file.originalname,
    url:`${publicBaseUrl}/uploads/${file.filename}`
  })
})

app.get("/explicacoes/:id/recordings",authenticate,requireMongoConnection,requireOnlineLessonAccess,async(req,res)=>{
  try{
    const files=await getRecordingsBucket()
      .find({"metadata.lessonId":String(req.recordingLesson._id)})
      .sort({uploadDate:-1})
      .toArray()
    res.json(files.map(serializeRecording))
  }catch(error){
    console.error("Erro ao listar gravações da explicação",error)
    res.status(500).json({message:"Erro ao carregar as gravações"})
  }
})

app.post("/explicacoes/:id/recordings",authenticate,requireMongoConnection,requireOnlineLessonAccess,parseRecordingUpload,async(req,res)=>{
  if(!req.file){
    return res.status(400).json({message:"Nenhuma gravação de vídeo foi recebida"})
  }

  let bucket
  let uploadStream
  try{
    bucket=getRecordingsBucket()
    uploadStream=bucket.openUploadStream(req.file.originalname,{
      contentType:req.file.mimetype,
      metadata:{
        lessonId:String(req.recordingLesson._id),
        uploaderId:String(req.user.id),
        originalName:req.file.originalname
      }
    })
    await pipeline(fs.createReadStream(req.file.path),uploadStream)
    const recording={
      id:String(uploadStream.id),
      name:req.file.originalname,
      uploadedAt:new Date().toISOString(),
      size:req.file.size,
      mimeType:req.file.mimetype
    }
    broadcastToRoom(
      JSON.stringify({type:"recording-created",recording}),
      String(req.recordingLesson._id)
    )
    res.status(201).json(recording)
  }catch(error){
    if(bucket && uploadStream?.id){
      try{
        await bucket.delete(uploadStream.id)
      }catch(deleteError){
        console.error("Erro ao limpar gravação incompleta",deleteError)
      }
    }
    console.error("Erro ao guardar gravação",error)
    res.status(500).json({message:"Não foi possível guardar a gravação"})
  }finally{
    await fs.promises.unlink(req.file.path).catch(()=>{})
  }
})

app.get("/explicacoes/:id/recordings/:recordingId",authenticate,requireMongoConnection,requireOnlineLessonAccess,async(req,res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.recordingId)){
    return res.status(400).json({message:"Identificador de gravação inválido"})
  }
  try{
    const bucket=getRecordingsBucket()
    const file=await bucket.find({
      _id:new mongoose.mongo.ObjectId(req.params.recordingId),
      "metadata.lessonId":String(req.recordingLesson._id)
    }).next()
    if(!file){
      return res.status(404).json({message:"Gravação não encontrada"})
    }

    const name=file.metadata?.originalName || file.filename
    res.setHeader("Content-Type",file.contentType || "video/webm")
    res.setHeader("Content-Length",file.length)
    res.setHeader("Content-Disposition",`inline; filename*=UTF-8''${encodeURIComponent(name)}`)
    bucket.openDownloadStream(file._id)
      .on("error",(error)=>{
        console.error("Erro ao transmitir gravação",error)
        if(!res.headersSent) res.status(404).end()
        else res.destroy(error)
      })
      .pipe(res)
  }catch(error){
    console.error("Erro ao obter gravação",error)
    res.status(500).json({message:"Não foi possível carregar a gravação"})
  }
})

   







    












const connectMongo = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI não está configurada")
  }

  try {
    await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,})
  } catch (error) {
    if (error.syscall==="querySrv") {
      // O DNS local do sistema pode recusar consultas SRV; repete com DNS públicos.
      console.warn("Consulta SRV falhou, a tentar com DNS público")
      require("dns").setServers(["8.8.8.8","1.1.1.1"])
      try {
        await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,})
        return
      } catch (retryError) {
        console.error("Erro ao conectar ao MongoDB",retryError.message)
        throw retryError
      }
    }
    console.error("Erro ao conectar ao MongoDB",error.message)
    throw error
  }
}

const validarDataHora=(data,horaInicio,horaFim)=>{
    const agora=new Date()
    const dataAtual=new Date(agora.getFullYear(), agora.getMonth(),agora.getDate())
    const horaAtual=agora.getHours() *60 +agora.getMinutes()
    const dataEscolhida=new Date(data)

  const converterHoraMinutos=(hora)=>{
    const correspondencia=/^([01]\d|2[0-3]):([0-5]\d)$/.exec(hora)
    return correspondencia
      ? Number(correspondencia[1]) * 60 + Number(correspondencia[2])
      : null
  }
  const horaInicioEscolhida=converterHoraMinutos(horaInicio)
  const horaFimEscolhida=converterHoraMinutos(horaFim)

  if(horaInicioEscolhida===null || horaFimEscolhida===null){
    return "A hora de início e a hora de fim devem estar no formato HH:mm"
  }
  if(horaInicioEscolhida>16 * 60){
    return "A hora de início não pode ser posterior às 16:00"
  }
  if([12 * 60, 12 * 60 + 30, 13 * 60].includes(horaInicioEscolhida)){
    return "Não é possível marcar uma explicação para as 12:00, 12:30 ou 13:00"
  }
  if(horaFimEscolhida>18 * 60){
    return "A hora de fim não pode ser posterior às 18:00"
  }

    if (dataEscolhida.getTime()===dataAtual.getTime()){
        if(horaInicioEscolhida<horaAtual){
            return "Se escolher a data atual, a hora de início deve ser igual ou posterior à hora atual"
        }
    }
    return null
}

const findScheduleConflict = ({ data, horaInicio, horaFim, excludeId }) => {
  // Dois intervalos conflituam quando se sobrepõem; horários contíguos são permitidos.
  const query = {
    data,
    horaInicio: { $lt: horaFim },
    horaFim: { $gt: horaInicio },
  };

  if (excludeId) query._id = { $ne: excludeId };
  return Explicacoes.findOne(query);
};





app.get("/explicandos", authenticate, requireMongoConnection, async(req,res)=>{
    try {
    // O explicando só consulta o próprio perfil; o explicador pode consultar todos.
        const filtro=req.user.role==="Explicador"?{}:{_id:req.user.id}
        const explicandos=await Explicandos.find(filtro).select("-password")
        res.json(explicandos)
    }catch(error){

    res.status(500).json({message:"Erro ao buscar os explicandos"})

}
})



app.get("/explicacoes", authenticate, requireMongoConnection, async(req,res)=>{
    try {
    // Limita a lista ao dono da explicação, salvo para o papel de explicador.
    const dataAtual = new Date()
    dataAtual.setHours(0, 0, 0, 0)
    const filtro=req.user.role==="Explicador"?{}:{explicandoId:req.user.id}
    filtro.data = { $gte: dataAtual }
        const explicacoes=await Explicacoes.find(filtro)
        res.json(explicacoes)
    }catch(error){

    res.status(500).json({message:"Erro ao buscar as explicacoes"})

}

    
})

app.post("/registo", requireMongoConnection, async(req,res)=>{
    try{
const {nome, email, password}=req.body

if(!nome||!email||!password){
    return res.status(400).json({message:"Todos os campos são obrigatórios"})
}

const existeExplicando=await Explicandos.findOne({email})
if(existeExplicando){
    return res.status(400).json({error:"Este utilizador já está registado!"})
}

const hashedPassword=await bcrypt.hash(password,10)




const novoExplicando=new Explicandos({nome,email,password:hashedPassword})
await novoExplicando.save()

res.status(201).json({message:"Explicando registado com sucesso"})
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Erro ao registar o explicando"})
    }
    })

    app.get("/explicandos/:email", authenticate, requireMongoConnection, async(req,res)=>{
      try{
        const{email}=req.params
        if(req.user.role!=="Explicador" && email.toLowerCase()!==req.user.email){
            return res.status(403).json({message:"Acesso negado"})
        }
        const getExplicando=await Explicandos.findOne({email})
    
        if(!getExplicando){
            return res.status(404).json({error:"Explicando não encontrado!"})
        }
    
        res.json({explicandoId:getExplicando._id, nome:getExplicando.nome})
      }catch(error){
        console.error("Erro ao buscar explicando",error)
        res.status(500).json({message:"Erro ao buscar o explicando"})
      }
    }
    )

    app.post("/login", requireMongoConnection, async (req, res)=>{
        try{
            const {email, password}=req.body
            if(!email ||!password){
          return res.status(400).json({message:"Todos os campos são obrigatórios!"})
            }
            const explicando=await Explicandos.findOne({email})

            if(!explicando){
                return res.status (401).json({message:"Login inválido! Certifique-se de que o email ou a palavra-passe estão corretos!"})
            }
            const isMatch=await bcrypt.compare(password, explicando.password)

            if(!isMatch){
                return res.status(401).json({message: "Login inválido! Certifique-se de que o email ou palavra-passe estão corretos!"})
            }
            const role=getUserRole(explicando.email)
            const token=jwt.sign(
              {id:String(explicando._id),email:explicando.email.toLowerCase(),nome:explicando.nome,role},
              JWT_SECRET,
              {expiresIn:"8h"}
            )
            res.status(200).json({sucesso:true,
              token,
              role,
              user:{
                explicandoId:explicando._id,
                nome:explicando.nome,
                email: explicando.email

              }  
            })
        }catch(error){
            console.error(error)
            res.status(500).json({message:"Erro no servidor ao tentar fazer login!"})
        }
    })

    app.delete("/explicacoes/:id",authenticate,async (req,res)=>{
      const id=req.params.id
      try{
        const existente=await Explicacoes.findById(id)
        if(existente && !canAccess(req.user,existente.explicandoId)){
          return res.status(403).send({message:"Acesso negado"})
        }
        const explicacao=await Explicacoes.findByIdAndDelete(id)
        if(!explicacao){
          return res.status(400).send({message:"Explicaçâo não encontrada!"})
        }
        broadcastExplanationDeleted(id)
        res.status(200).send({message:"Explicação eliminada com sucesso!"})
      }catch(error){
        console.error("Erro ao eliminar explicação!",error)
        res.status(500).send({message:"Erro interno ao eliminar explicação!"})
      }
    })
        

    app.post("/explicacoes", authenticate, async (req,res)=>{
        try{
        const {explicandoId, data, horaInicio, horaFim, linguagem, tipo, pagamento}=req.body

        if(!explicandoId){
            return res.status(400).json({mensagem:"ExplicandoId é obrigatório"})
        }
        if(!canAccess(req.user,explicandoId)){
            return res.status(403).json({mensagem:"Acesso negado"})
        }

        const obterExplicando=await Explicandos.findById(explicandoId)

        if(!obterExplicando){

            return res.status(400).json({mensagem:"Explicando não encontrado!"})
        }

        const mensagemErro=validarDataHora(data, horaInicio, horaFim)
        if(mensagemErro){
            return res.status(400).json({mensagem:mensagemErro})
        }
        const conflito = await findScheduleConflict({
          data,
          horaInicio,
          horaFim,
        });
        if(conflito){
            return res.json({sucesso:false, confirmacao:"Não"})
        }
        // Um pedido novo começa sempre pendente até ser decidido pelo explicador.
        const novaExplicacao=new Explicacoes({
            explicandoId,
            data,
            horaInicio,
            horaFim,
            linguagem,
            tipo,
            pagamento,
            confirmacao:"Pendente"
        })
        await novaExplicacao.save()
        res.json({sucesso:true, confirmacao:"Pendente"})
    } catch(error){
        console.error("Erro ao agendar explicação:",error)
        res.status(500).json({mensagem:"Erro ao agendar explicação"})
    }
    }
)
app.use("/explicacoes",router)
router.patch('/:id', authenticate, requireExplicador, async (req, res) => {
  const { id } = req.params;
  const { confirmacao } = req.body;
  try {
    const explicacao = await Explicacoes.findByIdAndUpdate(
      id,
      { confirmacao },
      { new: true } // retorna a explicação atualizada
      
      
    );
    if (!explicacao) {
      return res.status(404).json({ message: 'Explicação não encontrada' });
    }

    broadcastExplanationStatusUpdated(explicacao);
    res.json(explicacao);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a confirmação', error });
  }
});

app.get("/explicacoes/:id",authenticate,async(req,res)=>{

  try{
    const explicacao=await Explicacoes.findById(req.params.id)
    if(!explicacao){
      return res.status(404).json({sucesso:false, mensagem:"Explicação não encontrada!"})
    }
    if(!canAccess(req.user,explicacao.explicandoId)){
      return res.status(403).json({sucesso:false, mensagem:"Acesso negado"})
    }
    res.json(explicacao)
  }catch(error){
    console.error("Erro ao obter explicação por Id",error)
    res.status(500).json({sucesso:false,mensagem:"Erro ao buscar a explicação"})
  }
})

app.put("/explicacoes/:id",authenticate,async(req,res)=>{
  try{
    const id=req.params.id
    const existente=await Explicacoes.findById(id)
    if(!existente){
      return res.status(404).json({sucesso:false, mensagem:"Explicação não encontrada"})
    }
    if(!canAccess(req.user,existente.explicandoId)){
      return res.status(403).json({sucesso:false, mensagem:"Acesso negado"})
    }
    const{
      explicandoId,
      data,
      horaInicio,
      horaFim,
      linguagem,
      tipo,
      pagamento,
      confirmacao
    }=req.body

    const mensagemErro=validarDataHora(data, horaInicio, horaFim)
        if(mensagemErro){
            return res.status(400).json({mensagem:mensagemErro})
        }

        const conflito = await findScheduleConflict({
          data,
          horaInicio,
          horaFim,
          excludeId: id,
        });
      if(conflito){
          return res.json({sucesso:false, confirmacao:"Não"})
      }

    // A edição volta a pendente para exigir nova confirmação dos dados alterados.
    const explicacaoAtualizada=await Explicacoes.findByIdAndUpdate(id,{
      explicandoId:req.user.role==="Explicador"?explicandoId:existente.explicandoId,
      data,
      horaInicio,
      horaFim,
      linguagem,
      tipo,
      pagamento,
      confirmacao:"Pendente"
    },{new:true}
  )
  if(!explicacaoAtualizada){
    return res.status(404).json({sucesso:false, mensagem:"Explicação não encontrada"})
  }
  

  res.json({sucesso:true, mensagem:"Explicação atualizada com sucesso",explicacao:explicacaoAtualizada})
}catch(error){
  console.error("Erro ao atualizar explicação",error)
  res.status(500).json({sucesso:false,mensagem:"Erro interno ao atualizar a explicação!"})
}


    })

    app.post("/forum",authenticate,requireMongoConnection,upload.single("ficheiro"),async(req,res)=>{
      try{
      const {nome,mensagem,}=req.body
      if(!nome || (! mensagem && !req.file)){
        return res.status(400).json({erro:"A mensagem e o ficheiro não podem estar vazios!"})
      }
      const novaMensagem= new Forum({
        nome,
        mensagem,
        ficheiro:req.file?req.file.filename:null
      })
      await novaMensagem.save()
      res.json({sucesso:true})
      }catch(error){
        console.error("Erro ao guardar mensagem do fórum",error)
        res.status(500).json({erro:"Erro ao guardar a mensagem"})
      }
    })

    app.get("/forum",requireMongoConnection,async(req,res)=>{
      try{
      const mensagens=await Forum.find().sort({criadoEm:-1})
      res.json(mensagens)
      }catch(error){
        console.error("Erro ao carregar mensagens do fórum",error)
        res.status(500).json({erro:"Erro ao carregar as mensagens"})
      }
    })

if(fs.existsSync(frontendBuildPath)){
  app.get("*",(req,res)=>{
    res.sendFile(path.join(frontendBuildPath,"index.html"))
  })
}
 

    

const startServer = async () => {
  try {
    await connectMongo()
    server.listen(PORT)
  } catch (error) {
    // Mantém a API disponível para devolver erros controlados enquanto a base de dados falha.
    console.error("Servidor não iniciado porque a base de dados não está disponível")
    server.listen(PORT)
  }
}

if (require.main === module) {
  startServer()
}


module.exports = router;
module.exports.app = app;
module.exports.server = server;
module.exports.wss = wss;
