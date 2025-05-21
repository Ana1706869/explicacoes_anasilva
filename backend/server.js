const express=require ("express")
const mongoose=require("mongoose")
console.log("Mongoose carregado com sucesso")
const bodyParser=require("body-parser")
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
const bcrypt=require("bcryptjs")
const users={}
const usersInRoom=[]
const {ExpressPeerServer}=require("peer")
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/")
  },
    filename:(req,file,cb)=>{
      cb(null,Date.now()+""+file.originalname)
    }
  
})
const upload=multer({storage:storage})




const app=express()
const server=http.createServer(app)
const wss=new WebSocket.Server({server,path:"/ws"})






    wss.on("connection", (ws,req) => {
        console.log("Cliente conectado:")
       

       

       

        ws.on("message", (message) => {
            try {
              const data = JSON.parse(message);
              console.log("Mensagem recebida do cliente", data);
         
              if (data.type === "join-room") {
                const { roomId, peerId, nome } = data;
                console.log(`Usuário ${nome} com peerId ${peerId} entrou na sala ${roomId}`);
                users[peerId] = nome;
                ws.peerId = peerId;
         
                if (!usersInRoom.includes(peerId)) {
                  usersInRoom.push(peerId);
                }
         
                const roomUpdate = JSON.stringify({
                  type: "room-update",
                  usersInRoom,
                  userNames: users,
                });
         
                wss.clients.forEach((client) => {
                  if (client.readyState === WebSocket.OPEN) {
                    client.send(roomUpdate);
                  }
                });
         
                ws.send(
                  JSON.stringify({
                    type: "join-room",
                    message: `Bem-vindo à sala ${roomId}`,
                    roomId,
                    peerId,
                    users: usersInRoom,
                    userNames: users,
                  })
                );
         
                console.log("Enviando room-update para todos", { usersInRoom, userNames: users });
              }
         
              if (data.type === "chat-message") {
                const sender = data.sender || ws.peerId || "anónimo";
                wss.clients.forEach((client) => {
                  if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(
                      JSON.stringify({
                        type: "chat-message",
                        sender,
                        text: data.text,
                      })
                    );
                  }
                });
              }
         
              if (data.type === "send-file") {
                const sender = data.sender || ws.peerId || "anónimo";
                const payload = {
                  type: "receive-file",
                  sender,
                  filename: data.filename,
                  link: data.link
                 
                };
                broadcast(JSON.stringify(payload),ws);
              }

         
              ws.send(JSON.stringify({ type: "ack", message: "Usuário conectado com sucesso" }));
            } catch (err) {
              console.error("Erro ao processar a mensagem do WebSocket", err);
            }
          })


    ws.on("close",()=>{
        const {peerId}=ws
        if(peerId && users[peerId]){

        delete users[peerId]
        const index=usersInRoom.indexOf(peerId)
        if(index>-1){
           usersInRoom.splice(index,1)
    }
}
    console.log(`Utilizador com peerId ${ws.peerId} desconectado da sala`)
})
    })

function broadcast(msg,exclude) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !==exclude) {
        client.send(msg);
      }
    });
  }

       


   


app.use(cors({origin:"*"}))

app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname,"uploads")))



const peerServer=ExpressPeerServer(server,{
    debug:true,
})
app.use("/peerjs",peerServer)
app.post("/upload",upload.single("file"),(req,res)=>{
  const file=req.file
  if(!file)return res.status(400).json({error:"Nenhum ficheiro recebido"})

 

  res.json({
    originalName:file.originalname,
    url:`${process.env.REACT_APP_SERVER_URI}/uploads/${file.filename}`
  })
})

   







    












mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,})
.then(()=>console.log("Conectado ao MongoDB"))
.catch((err)=>console.error("Erro ao conectar ao MongoDB",err))

const validarDataHora=(data,horaInicio)=>{
    const agora=new Date()
    const dataAtual=new Date(agora.getFullYear(), agora.getMonth(),agora.getDate())
    const horaAtual=agora.getHours() *60 +agora.getMinutes()
    const dataEscolhida=new Date(data)

    if (dataEscolhida.getTime()===dataAtual.getTime()){
        const [hora, minuto]=horaInicio.split(":").map(Number)
        const horaInicioEscolhida=hora *60 + minuto

        if(horaInicioEscolhida<horaAtual){
            return "Se escolher a data atual, a hora de início deve ser igual ou posterior à hora atual"
        }
    }
    return null
}



app.get("/",async(req,res)=>{
    res.send("API do sistema de explicações está a  funcionar!")
})

app.get("/explicandos", async(req,res)=>{
    try {
        const explicandos=await Explicandos.find()
        res.json(explicandos)
    }catch(error){

    res.status(500).json({message:"Erro ao buscar os explicandos"})

}
})



app.get("/explicacoes", async(req,res)=>{
    try {
        const explicacoes=await Explicacoes.find()
        res.json(explicacoes)
    }catch(error){

    res.status(500).json({message:"Erro ao buscar as explicacoes"})

}

    
})

app.post("/registo", async(req,res)=>{
    try{
console.log("Dados recebidos:",req.body)
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

    app.get("/explicandos/:email", async(req,res)=>{
        const{email}=req.params
        const getExplicando=await Explicandos.findOne({email})
    
        if(!getExplicando){
            return res.status(404).json({error:"Explicando não encontrado!"})
        }
    
        res.json({explicandoId:getExplicando._id, nome:getExplicando.nome})
    }
    )

    app.post("/login", async (req, res)=>{
        try{
            const {email, password}=req.body
            if(!email ||!password){
                return 
                res.status(400).json({message:"Todos os campos são obrigatórios!"})
            }
            const explicando=await Explicandos.findOne({email})

            if(!explicando){
                return res.status (401).json({message:"Login inválido! Certifique-se de que o email ou a palavra-passe estão corretos!"})
            }
            const isMatch=await bcrypt.compare(password, explicando.password)

            if(!isMatch){
                return res.status(401).json({message: "Login inválido! Certifique-se de que o email ou palavra-passe estão corretos!"})
            }
            res.status(200).json({sucesso:true,
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

    app.delete("/explicacoes/:id",async (req,res)=>{
      const id=req.params.id
      try{
        const explicacao=await Explicacoes.findByIdAndDelete(id)
        if(!explicacao){
          return res.status(400).send({message:"Explicaçâo não encontrada!"})
        }
        res.status(200).send({message:"Explicação eliminada com sucesso!"})
      }catch(error){
        console.error("Erro ao eliminar explicação!",error)
        res.status(500).send({message:"Erro interno ao eliminar explicação!"})
      }
    })
        

    const {v4: uuidv4}=require("uuid")
const { error } = require("console")

    app.post("/explicacoes", async (req,res)=>{
        try{
        const {explicandoId, data, horaInicio, horaFim, linguagem, tipo, pagamento}=req.body

        const obterExplicando=await Explicandos.findById(explicandoId)

        if (!explicandoId){
            return res.status(400).json({mensagem:"ExplicandoId é obrigatório"})
        }

        if(!obterExplicando){

            return res.status(400).json({mensagem:"Explicando não encontrado!"})
        }

        const mensagemErro=validarDataHora(data, horaInicio)
        if(mensagemErro){
            return res.status(400).json({mensagem:mensagemErro})
        }
        const conflito=await Explicacoes.findOne({
            data,$or:[
                {horaInicio:{$lt:horaFim, $gte:horaInicio}},
                {horaFim:{$gt:horaInicio, $lte: horaFim}}
            ]
        })
        if(conflito){
            return res.json({sucesso:false, confirmacao:"Não"})
        }
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
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { confirmacao } = req.body;
  try {
    const explicacao = await Explicacoes.findByIdAndUpdate(
      id,
      { confirmacao },
      { new: true } // retorna a explicação atualizada
      
      
    );
    console.log("Explicação atualizada")
    

    if (!explicacao) {
      return res.status(404).json({ message: 'Explicação não encontrada' });
    }

    res.json(explicacao);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a confirmação', error });
  }
});

app.get("/explicacoes/:id",async(req,res)=>{

  try{
    const explicacao=await Explicacoes.findById(req.params.id)
    if(!explicacao){
      return res.status(404).json({sucesso:false, mensagem:"Explicação não encontrada!"})
    }
    res.json(explicacao)
  }catch(error){
    console.error("Erro ao obter explicação por Id",error)
    res.status(500).json({sucesso:false,mensagem:"Erro ao buscar a explicação"})
  }
})

app.put("/explicacoes/:id",async(req,res)=>{
  try{
    const id=req.params.id
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

    const mensagemErro=validarDataHora(data, horaInicio)
        if(mensagemErro){
            return res.status(400).json({mensagem:mensagemErro})
        }

        const conflito=await Explicacoes.findOne({
          data,$or:[
              {horaInicio:{$lt:horaFim, $gte:horaInicio}},
              {horaFim:{$gt:horaInicio, $lte: horaFim}}
          ]
      })
      if(conflito){
          return res.json({sucesso:false, confirmacao:"Não"})
      }

    
    const explicacaoAtualizada=await Explicacoes.findByIdAndUpdate(id,{
      explicandoId,
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
    return
    res.status(404).json({sucesso:false, mensagem:"Explicação não encontrada"})
  }
  

  res.json({sucesso:true, mensagem:"Explicação atualizada com sucesso",explicacao:explicacaoAtualizada})
}catch(error){
  console.error("Erro ao atualizar explicação",error)
  res.status(500).json({sucesso:false,mensagem:"Erro interno ao atualizar a explicação!"})
}


    })

    app.post("/forum",upload.single("ficheiro"),async(req,res)=>{
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
    })

    app.get("/forum",async(req,res)=>{
      const mensagens=await Forum.find().sort({criadoEm:-1})
      res.json(mensagens)
    })
 

    

server.listen(PORT,()=>{
    console.log(`Servidor está a correr em http://localhost:${PORT}`)
})


module.exports = router;
