import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Menu from "./Menu";
import Peer, { StreamConnection } from "peerjs"





const ExplicacoesOnline = () => {
  const [nomeExplicando, setNomeExplicando] = useState("");
  const [explicandoId, setExplicandoId] = useState("");
  const localVideoRef = useRef(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const peerConnections = useRef({});
  const [file, setFile] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const ws = useRef(null);
  const [erro, setErro] = useState("");
  const pendingCandidates = useRef({});
  const originalStream = useRef(null);
  const localStream = useRef(null);
  const screenTrackRef=useRef(null)
  const [recording,setRecording]=useState(false)
  const [mediaRecorder, setMediaRecorder]=useState(null)
  const [recordedChunks, setRecordedChunks]=useState([])
  const [screenSharingActive,setScreenSharingActive]=useState(false)
  const peerRef=useRef(null)
  const [usersInRoom,setUsersInRoom]=useState([])
  const remoteStreamBackup=useRef({})
  const sentFiles=useRef(new Set())
  const messagesEndRef=useRef(null)
 

  useEffect(() => {
    const emailLogin = localStorage.getItem("emailUsuario");
    const explicandoId = localStorage.getItem("explicandoId");
 
    if (!emailLogin) {
      console.error("Nenhum email encontrado no localStorage");
      return;
    }
 
    if (!explicandoId) {
      setErro("Erro! Utilizador não autenticado");
    }
 
    axios
      .get(`${process.env.REACT_APP_SERVER_URI}/explicandos/${emailLogin}`)
      .then((response) => {
        const nome=response.data.nome
        const id=response.data.explicandoId
        setNomeExplicando(nome);
        setExplicandoId(id);

         navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        originalStream.current=stream
        localStream.current=stream
        if(localVideoRef.current){
          localVideoRef.current.srcObject=stream
        }
        if(!peerRef.current){
        peerRef.current=new Peer()
         const peer=peerRef.current
          peer.on("open",(peerId)=>{
            console.log("Peer conectado com id:", peerId);
           
        ws.current = new WebSocket(process.env.REACT_APP_WS_URL)
       
     
      ws.current.onopen=()=>{
        console.log("Websocket aberto")
       
        const message={
          type:"join-room",
          userId:id,
          peerId: peer.id,
          roomId:"explicacoes-room",
          nome:nome
        }
       
        console.log(message)
        ws.current.send(JSON.stringify(message))
      }
         
         

 
     
      ws.current.onmessage=(event)=>{

     
        console.log("Websocket recebeu algo")
        console.log("Mensagem recebida via websocket",event.data)
        try{
        const data = JSON.parse(event.data);
     
        console.log("Data recebida",data)



                    // Se receber a lista de usuários conectados
                    if (data.type === "room-update" ) {
                      console.log("Room update recebido",data)
                   
                     
                        const {usersInRoom,userNames}=data

                        console.log("Utilizadores conectados",usersInRoom)
                        console.log("Nomes dos utilizadores conetados",userNames)
                       
                        if(usersInRoom && userNames){
                        setUsersInRoom(usersInRoom.map((peerId)=>({
                          peerId,
                          nomeUtilizador:userNames[peerId] ||"Utilizador desconhecido",
                     }) )
                    )
                    console.log("Estado atualizado usersInRoom",usersInRoom)
                   
                 
                  }else{
                    console.error("Dados de utilizadores não recebido corretamente")
                  }
                 
                 
                 
                         usersInRoom.forEach((peerId) => {
                            if (peerId!==peer.id &&!peerConnections.current[peerId]) {
                              try{
                             
                           
                           

                              const call = peerRef.current.call(peerId, stream);
                             
                              console.log(call)
                              console.log(stream)
                             
                              peerConnections.current[peerId]=call
                           
                              call.on("stream", (remoteStream) => {
                                console.log(`Recebendo stream de ${peerId}`);

                               

                               
                                setRemoteStreams((prevStreams) =>{
                                  if(!prevStreams[peerId]){
                                 return {...prevStreams,[peerId]:remoteStream}
                                  }
                                  return prevStreams
                                })
                                 
                     
                                console.log("Estado atualizado com novo stream remoto");
                              });
                           
                     
                              call.on("close", () => {
                                console.log(`Chamada com ${peerId} encerrada.`);
                                delete peerConnections.current[peerId]
                         
                                setRemoteStreams((prevStreams)=>{
                                const newStreams={...prevStreams}
                                delete newStreams [peerId]
                                return newStreams
                              });
                              })
                            }catch(error){
                              console.error("Erro ao processar chamada Peer",error)
                            }
                          }
                        })
                      }
                      if(data.type==="screen-share-stop"){
                        const peerId=data.peerId
                        console.log(`Utilizador ${peerId} terminou a partilha`)
                        setRemoteStreams((prevStreams)=>{
                          const newStreams={...prevStreams}
                          delete newStreams[`screen-${peerId}`]
                          return newStreams
                        })
                        const screenCall=peerConnections.current[`screen-${peerId}`]
                        if(screenCall){
                          screenCall.close()
                          delete peerConnections.current[`screen-${peerId}`]
                        }
                      }
                      if (data.type === "chat-message") {
                        setChatMessages((prev) => [...prev, { sender: data.sender, text: data.text }]);
                      }
                 
                      if (data.type === "receive-file") {
                        
                       
                        setChatMessages((prev) => [
                          ...prev,
                          {
                            sender:data.sender,
                            text: `Ficheiro: ${data.filename}`,
                            link: data.link
                          },
                        ]);
                      }
                 
                    } catch (error) {
                      console.error("Erro ao processar mensagem Websocket", error);
                    }
                  };
                 
   
                   
                       
                     
                   
                   
                   
                   
                 

                   
                 
                 
               
                  peer.on("call", (call) => {
                  try{

                    if(call.metadata?.type==="screen"){
             
             
              call.answer(); // Responde a chamada com o próprio stream
             
             peerConnections.current[`screen-${call.peer}`]=call
             
             
              call.on("stream", (remoteStream) => {
                  console.log(`Recebendo stream de ${call.peer}`);
                 
                  setRemoteStreams((prevStreams) => ({
                      ...prevStreams,
                      [`screen-${call.peer}`]:remoteStream,
                  }));
                  remoteStream.getVideoTracks().forEach((track)=>{
                    track.onended=()=>{
                      console.log(`Partilha de ecrã de ${call.peer}terminou`)
                      setRemoteStreams((prevStreams)=>{
                        const newStreams={...prevStreams}
                        delete newStreams[`screen-${call.peer}`]
                        return newStreams
                      })
                    }
                  })
                })
                }else{
                  call.answer(originalStream.current)
                  call.on("stream",(remoteCamStream)=>{
                    setRemoteStreams((prev)=>({
                      ...prev,[call.peer]:remoteCamStream
                    }))
                  })

                }
               
                 
         
             
              call.on("close", () => {
                                console.log(`Chamada com ${call.peer} encerrada.`);
                               
                                delete peerConnections.current[call.peer]
                         
                                setRemoteStreams((prevStreams)=>{
                                const newStreams={...prevStreams}
                                delete newStreams [`screen-${call.peer}`]
                                return newStreams
                              });
                            })

                           
                           
                           
                         
                           
                         
                       
     
                       
                          }catch(err){
                          console.error("Erro ao acesar câmara/microfone",err)
                          }
                        })
                      })
                    }
                   

                 




                  }).catch((err)=>{console.error("Erro ao acessar câmara/microfone",err)
                  })

                }).catch((err)=>{console.error("Erro ao buscar dados do explicando",err)
                })
               
                   
                 
               
               
                   
                     
                     
                      window.addEventListener("beforeunload",handleWindowClose)
                      return()=>{
                        handleWindowClose()
                        window.removeEventListener("beforeunload",handleWindowClose)
                      }
    }, [])

    useEffect(()=>{
      console.log("Lista atualizada de usuáerios",usersInRoom)
      usersInRoom.forEach((user)=>console.log(`Usuário ${user.nomeUtilizador},PeerId ${user.peerId}`))
    },[usersInRoom])

    useEffect(()=>{
      if(messagesEndRef.current){
        messagesEndRef.current.scrollIntoView({behaviour:"smooth"})
      }
    },[chatMessages])

    const handleWindowClose=()=>{
      Object.values(peerConnections.current).forEach((call)=>{
        call.close()
      })
      if(peerRef.current){
        peerRef.current.destroy()
        peerRef.current=null

      }
      if(ws.current){
        ws.current.close()
        ws.current=null
      }

    }
     
   
  const shareScreen = async () => {
    try {
      if( screenTrackRef.current){
        stopScreenShare()
        return
            }
         
       
      const screenStream=await navigator.mediaDevices.getDisplayMedia({video:true,audio:false})
      const screenTrack=screenStream.getVideoTracks()[0]
      screenTrackRef.current=screenTrack
     
      setScreenSharingActive(true)

     Object.keys(usersInRoom).forEach((_,index)=>{
      const peerId=usersInRoom[index].peerId
      if(peerId===peerRef.current.id)
        return

     
          const call=peerRef.current.call(peerId,screenStream,{
            metadata:{type:"screen"}
          })
         
          peerConnections.current[`screen-${peerId}`]=call

          call.on("stream",remoteStream=>{
            console.log(`Recebendo partilha de ecrã de ${peerId} `)
            setRemoteStreams(prevStreams=>({
              ...prevStreams,[`screen-${peerId}`]:remoteStream
            }))
          })
          call.on("close",()=>{
            console.log(`Partilha de ecrã com ${peerId} encerrada`)
            delete peerConnections.current[`screen-${peerId}`]
            setRemoteStreams(prevStreams=>{
              const newStreams={...prevStreams}
              delete newStreams[`screen-${peerId}`]
              return newStreams
            })
          })
        })
       
     

      const sharedScreenVideo=document.getElementById("local-shared-screen")
      if(sharedScreenVideo){
        sharedScreenVideo.srcObject=screenStream
      }

      screenTrack.onended=()=>{
        stopScreenShare()
       
 
       
       
      }
       

   
        }catch(err){
          console.error("Erro ao partilhar o ecrã",err)
        }

      }

      const stopScreenShare=()=>{
        if(!screenTrackRef.current)return
        screenTrackRef.current.stop()
        screenTrackRef.current=null
       
        setScreenSharingActive(false)


        Object.keys(peerConnections.current).forEach((key)=>{
          if(key.startsWith("screen-")){
          const screenCall=peerConnections.current[key]
          if(screenCall){
            screenCall.close()
            delete peerConnections.current[key]
          }
        }
        })
     
       const sharedScreenVideo=document.getElementById("local-shared-screen")
       if(sharedScreenVideo){
        sharedScreenVideo.srcObject=null
       }


       if(ws.current && ws.current.readyState===WebSocket.OPEN){
       ws.current.send(JSON.stringify({
        type:"screen-share-stop",
        peerId:peerRef.current.id
       }))
       
        }
      }
     
       
     

     
     
       
         
         

 

      const handleFileUpload = async () => {
        if (!file) return

       
        file.uploading=true

        if(sentFiles.current.has(file.name)){
          file.uploading=false
          return

        }

        const formData=new FormData()
        formData.append("file",file)

        try{
          const response=await fetch(`${process.env.REACT_APP_SERVER_URI}/upload`,{
            method:"POST",
            body:formData
          })

          const result=await response.json()
        
     
        
          const fileMessage = {
            type: "send-file",
            sender: nomeExplicando,
            filename:result.url.split("/").pop(),
            link:result.url
           
         
          };
     
         if (ws.current && ws.current.readyState===WebSocket.OPEN){
          ws.current.send(JSON.stringify(fileMessage))
         }
          setChatMessages((prev)=>[
            ...prev,{

            
            sender:nomeExplicando,
            text:`Ficheiro ${result.originalname}`,
            link:result.url
          }
        ])
        sentFiles.current.add(file.name)
      }catch(error){
        console.error("Erro ao fazer upload do ficheiro",error)
      }
      file.uploading=false
    }
          
       
  const sendMessage = () => {
    if (message.trim() === "") return
      const msg = {
        type: "chat-message",
        sender: nomeExplicando,
        text: message,
      };
      ws.current.send(JSON.stringify(msg));
      setChatMessages((prev)=>[...prev,{sender:msg.sender,text:msg.text}])
      setMessage("");
    }
   
 

 

  const startRecording=async()=>{
    try{
      const sessionStream=await navigator.mediaDevices.getDisplayMedia({video:true, audio:true})
   
      const micStream=await navigator.mediaDevices.getUserMedia({audio:true})

      const combinedStream=new MediaStream([...sessionStream.getVideoTracks(),...micStream.getAudioTracks()])
    const recorder=new MediaRecorder(combinedStream)
   
    recorder.ondataavailable=(event)=>{
      setRecordedChunks((prev)=>[...prev,event.data])
    }
    recorder.onstop=()=>{
      const blob=new Blob(recordedChunks,{
        type: "video/mp4"})
        const url=URL.createObjectURL(blob)
        const link=document.createElement("a")
        link.href=url
        link.download="avestruz.mp4"
        link.click()
      }
      recorder.start()
      setMediaRecorder(recorder)
      setRecording(true)
    }catch(error){
      console.error("Erro ao iniciar gravação de ecrã",error)
    }
  }
    const stopRecording=()=>{
      mediaRecorder.stop()
      setRecording(false)
    }




  return (
    <div>
      <Menu />
      <br/>
            <br/>
            <br/>
            <br/>
            <p className="saudacao">Olá, {nomeExplicando}</p>
            <h2 className="explicacoes">Explicações on-line</h2>
            <br/>
            <br/>
        <h2 className="cabecalhoCamaraLocal">{nomeExplicando}</h2>
        <div className="camaraWrapper">
        <div className="localVideo">

       

        <video ref={localVideoRef}  autoPlay  style={{ width: "300px", height:"200px"}} />
        {recording?(<button onClick={stopRecording}  >Parar gravação</button>): <button onClick={startRecording}  disabled={recording}>Iniciar gravação</button>}
        
       
       
        <button onClick={shareScreen}>Partilhar ecrã</button>
        </div>
        
        <div className="remoteCamaraContainer">
        
        
        {usersInRoom.map((user)=>{
          const camaraStream=remoteStreams[user.peerId]
          
          return(
            camaraStream &&(<div 
             key={user.peerId}>
              <h2 className="cabecalhoCamaraRemota">{user.nomeUtilizador}</h2>
             <video ref={(video)=>{
                  if(video && camaraStream) video.srcObject=camaraStream}} autoPlay  playsInline style={{width:"300px", height:"200px"}}/>
        </div>
            )
          )
        })}
        </div>
        </div>
        



        <br/>
        <br/>
          

        
          

       <h4 className="headLocalScreen"> Partilha de ecrã de  {nomeExplicando}</h4>
       <div className="localScreen">
         
           
          <video id="local-shared-screen" autoPlay  playsInline style={{width:"2000px",height:"2000px",position:"relative",top:"-350px",zIndex:"1",pointerEvents:"none"}} />
        </div>
        

          {usersInRoom.map((user)=>{
        const screenStream=remoteStreams[`screen-${user.peerId}`]
          return(
            screenStream && (<div className="remoteScreen" key={`screen-${user.peerId}`}>
              <h4 className="headRemoteScreen"> Partilha de ecrã de  {user.nomeUtilizador}</h4>










            
               
                 <video ref={(video)=>{
                  if (video && screenStream) video.srcObject=screenStream}} autoPlay  playsInline style={{width:"2000px", height:"2000px", border:"1 px solid black", frameElement:"black",position:"relative",top:"-450px",zIndex:"1",pointerEvents:"none"}}/>
                
                </div>
                )
              )
            })}
            
            
            
          
            


         
       
        
        <div className="chat">
  {chatMessages.map((msg, i) => (
    <div key={i} className="chatBox">
      <strong>{msg.sender}: </strong>{""}
      {msg.link?(
        <a href={msg.link} target="_blank" rel="noopener noreferrer"> {msg.link}</a>
      ):(msg.text)
      }
      </div>
      
         
          ))}
          <div ref={messagesEndRef}/>
   
 
 
 
 
  <textArea className="inputMessage"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Mensagem"
  />
  <button onClick={sendMessage}>Enviar</button>

  <input type="file" onChange={(e) => setFile(e.target.files[0])} />
  <button onClick={handleFileUpload}>Enviar Ficheiro</button>
</div>
</div>
  );
};

export default ExplicacoesOnline;
