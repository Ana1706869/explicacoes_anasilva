import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Menu from "./Menu";
import Peer from "peerjs"
import { wsBaseUrl } from "./apiConfig";

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
  const originalStream = useRef(null);
  const screenTrackRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [screenSharingActive, setScreenSharingActive] = useState(false);
  const peerRef = useRef(null);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const messagesEndRef = useRef(null);
  const idRef = useRef("");
  const nomeRef = useRef("");
  const seenMessageIdsRef = useRef(new Set());

  const setupRealtime = () => {
    if (peerRef.current) return;

    console.log("Inicializando Peer...");
    
    peerRef.current = new Peer(undefined, {
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          { urls: "stun:stun3.l.google.com:19302" }
        ]
      }
    });

    const peer = peerRef.current;

    peer.on("open", (peerId) => {
      console.log("Peer conectado com id:", peerId);

      const runtimeWsBaseUrl = wsBaseUrl || `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}`;
      console.log("Conectando ao WebSocket:", runtimeWsBaseUrl);
      
      ws.current = new WebSocket(`${runtimeWsBaseUrl}/ws`);

      ws.current.onopen = () => {
        console.log("WebSocket conectado");
        const joinMessage = {
          type: "join-room",
          userId: idRef.current,
          peerId,
          roomId: "explicacoes-room",
          nome: nomeRef.current
        };

        ws.current.send(JSON.stringify(joinMessage));
        console.log("Mensagem de join-room enviada");
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === "room-update") {
            const { usersInRoom: roomUsers, userNames } = data;

            if (roomUsers && userNames) {
              setUsersInRoom(roomUsers.map((roomPeerId) => ({
                peerId: roomPeerId,
                nomeUtilizador: userNames[roomPeerId] || "Utilizador desconhecido"
              })));
            }

            roomUsers.forEach((roomPeerId) => {
              if (roomPeerId !== peer.id && !peerConnections.current[roomPeerId]) {
                const outboundStream = originalStream.current;
                if (!outboundStream) {
                  console.log("Sem stream para enviar para", roomPeerId);
                  return;
                }

                try {
                  const call = peer.call(roomPeerId, outboundStream);
                  peerConnections.current[roomPeerId] = call;

                  call.on("stream", (remoteStream) => {
                    setRemoteStreams((prevStreams) => {
                      if (!prevStreams[roomPeerId]) {
                        return { ...prevStreams, [roomPeerId]: remoteStream };
                      }
                      return prevStreams;
                    });
                  });

                  call.on("close", () => {
                    delete peerConnections.current[roomPeerId];
                    setRemoteStreams((prevStreams) => {
                      const newStreams = { ...prevStreams };
                      delete newStreams[roomPeerId];
                      return newStreams;
                    });
                  });
                } catch (error) {
                  console.error("Erro ao processar chamada Peer", error);
                }
              }
            });
          }

          if (data.type === "screen-share-stop") {
            const peerId = data.peerId;
            setRemoteStreams((prevStreams) => {
              const newStreams = { ...prevStreams };
              delete newStreams[`screen-${peerId}`];
              return newStreams;
            });

            const screenCall = peerConnections.current[`screen-${peerId}`];
            if (screenCall) {
              screenCall.close();
              delete peerConnections.current[`screen-${peerId}`];
            }
          }

          if (data.type === "chat-message") {
            console.log("Mensagem recebida:", data);
            if (data.id && seenMessageIdsRef.current.has(data.id)) return;
            if (data.id) seenMessageIdsRef.current.add(data.id);
            setChatMessages((prev) => [...prev, { sender: data.sender, text: data.text, id: data.id }]);
          }

          if (data.type === "receive-file") {
            if (data.id && seenMessageIdsRef.current.has(data.id)) return;
            if (data.id) seenMessageIdsRef.current.add(data.id);
            setChatMessages((prev) => [
              ...prev,
              {
                sender: data.sender,
                text: `Ficheiro: ${data.filename}`,
                link: data.link,
                id: data.id
              }
            ]);
          }
        } catch (error) {
          console.error("Erro ao processar mensagem Websocket", error);
        }
      };

      ws.current.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
      };

      ws.current.onclose = () => {
        console.log("WebSocket desconectado");
      };
    });

    peer.on("call", (call) => {
      try {
        if (call.metadata?.type === "screen") {
          call.answer();
          peerConnections.current[`screen-${call.peer}`] = call;

          call.on("stream", (remoteStream) => {
            setRemoteStreams((prevStreams) => ({
              ...prevStreams,
              [`screen-${call.peer}`]: remoteStream,
            }));

            remoteStream.getVideoTracks().forEach((track) => {
              track.onended = () => {
                setRemoteStreams((prevStreams) => {
                  const newStreams = { ...prevStreams };
                  delete newStreams[`screen-${call.peer}`];
                  return newStreams;
                });
              };
            });
          });
        } else {
          if (originalStream.current) {
            call.answer(originalStream.current);
          } else {
            call.answer();
          }

          call.on("stream", (remoteCamStream) => {
            setRemoteStreams((prev) => ({
              ...prev,
              [call.peer]: remoteCamStream
            }));
          });
        }

        call.on("close", () => {
          delete peerConnections.current[call.peer];

          setRemoteStreams((prevStreams) => {
            const newStreams = { ...prevStreams };
            delete newStreams[`screen-${call.peer}`];
            return newStreams;
          });
        });
      } catch (err) {
        console.error("Erro ao acesar câmara/microfone", err);
      }
    });

    peer.on("error", (error) => {
      console.error("Erro no Peer:", error);
    });
  };

  useEffect(() => {
    const emailLogin = localStorage.getItem("emailUsuario");
    const explicandoId = localStorage.getItem("explicandoId");

    if (!emailLogin) {
      console.error("Nenhum email encontrado no localStorage");
      return;
    }

    let nome = emailLogin;
    let id = explicandoId || "";
    
    nomeRef.current = nome;
    idRef.current = id;
    
    setNomeExplicando(nome);
    if (id) setExplicandoId(id);

    // Fetch user data
    axios
      .get(`/explicandos/${emailLogin}`)
      .then((response) => {
        nome = response.data.nome;
        id = response.data.explicandoId;
        nomeRef.current = nome;
        idRef.current = id;
        setNomeExplicando(nome);
        setExplicandoId(id);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do explicando:", err);
      });

    // Try to get media, but also initialize chat if it fails
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        originalStream.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setupRealtime();
      })
      .catch((err) => {
        console.error("Erro ao acessar câmara/microfone", err);
        setErro("Permissão de câmara/microfone bloqueada. O chat continuará disponível.");
        setupRealtime();
      });

    // Cleanup on unmount
    return () => {
      handleWindowClose();
    };
  }, []);

  const handleWindowClose = () => {
    Object.values(peerConnections.current).forEach((call) => {
      call.close();
    });
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      alert("Conexão ao chat não disponível. Tente recarregar a página.");
      return;
    }

    try {
      const messageId = Date.now();
      
      // Adiciona a mensagem imediatamente ao chat local
      setChatMessages((prev) => [...prev, { sender: nomeRef.current, text: message, id: messageId }]);
      
      // Envia a mensagem ao servidor para os outros utilizadores
      ws.current.send(
        JSON.stringify({
          type: "chat-message",
          sender: nomeRef.current,
          text: message,
          id: messageId
        })
      );

      setMessage("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  const shareScreen = async () => {
    try {
      if (screenTrackRef.current) {
        stopScreenShare();
        return;
      }

      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      const screenTrack = screenStream.getVideoTracks()[0];
      screenTrackRef.current = screenTrack;

      setScreenSharingActive(true);

      usersInRoom.forEach((user) => {
        const peerId = user.peerId;
        if (peerId === peerRef.current.id) return;

        const call = peerRef.current.call(peerId, screenStream, {
          metadata: { type: "screen" }
        });

        peerConnections.current[`screen-${peerId}`] = call;

        call.on("stream", (remoteStream) => {
          console.log(`Recebendo partilha de ecrã de ${peerId}`);
          setRemoteStreams((prevStreams) => ({
            ...prevStreams,
            [`screen-${peerId}`]: remoteStream
          }));
        });

        call.on("close", () => {
          console.log(`Partilha de ecrã com ${peerId} encerrada`);
          delete peerConnections.current[`screen-${peerId}`];
          setRemoteStreams((prevStreams) => {
            const newStreams = { ...prevStreams };
            delete newStreams[`screen-${peerId}`];
            return newStreams;
          });
        });
      });

      const sharedScreenVideo = document.getElementById("local-shared-screen");
      if (sharedScreenVideo) {
        sharedScreenVideo.srcObject = screenStream;
      }

      screenTrack.onended = () => {
        stopScreenShare();
      };
    } catch (err) {
      console.error("Erro ao partilhar o ecrã", err);
    }
  };

  const stopScreenShare = () => {
    if (!screenTrackRef.current) return;
    screenTrackRef.current.stop();
    screenTrackRef.current = null;

    setScreenSharingActive(false);

    Object.keys(peerConnections.current).forEach((key) => {
      if (key.startsWith("screen-")) {
        const screenCall = peerConnections.current[key];
        if (screenCall) {
          screenCall.close();
          delete peerConnections.current[key];
        }
      }
    });

    const sharedScreenVideo = document.getElementById("local-shared-screen");
    if (sharedScreenVideo) {
      sharedScreenVideo.srcObject = null;
    }

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: "screen-share-stop",
          peerId: peerRef.current.id
        })
      );
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <p className="saudacao">Olá, {nomeExplicando}</p>
        <h2 className="explicacoes">Explicações on-line</h2>
        {erro && <div className="alert alert-warning">{erro}</div>}

        <div className="controls">
          <button
            className="btn btn-primary"
            onClick={() => setRecording(!recording)}
          >
            {recording ? "Parar gravação" : "Iniciar gravação"}
          </button>
          <button className="btn btn-info" onClick={shareScreen}>
            {screenSharingActive ? "Parar partilha" : "Partilhar ecrã"}
          </button>
        </div>

        <h2 className="cabecalhoCamaraLocal">{nomeExplicando}</h2>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          style={{ width: "300px", height: "200px", border: "1px solid black" }}
        />

        <video
          id="local-shared-screen"
          autoPlay
          muted
          style={{ width: "300px", height: "200px", border: "1px solid blue", marginTop: "20px" }}
        />

        <h4 className="headLocalScreen">Partilha de ecrã de {nomeExplicando}</h4>

        <div className="remoteCamaraContainer">
          {usersInRoom.map((user) => {
            const camaraStream = remoteStreams[user.peerId];
            return (
              camaraStream && (
                <div key={user.peerId}>
                  <h2 className="cabecalhoCamaraRemota">{user.nomeUtilizador}</h2>
                  <video
                    ref={(video) => {
                      if (video && camaraStream) video.srcObject = camaraStream;
                    }}
                    autoPlay
                    playsInline
                    style={{ width: "300px", height: "200px", border: "1px solid green" }}
                  />
                </div>
              )
            );
          })}
        </div>

        {usersInRoom.map((user) => {
          const screenStream = remoteStreams[`screen-${user.peerId}`];
          return (
            screenStream && (
              <div className="remoteScreen" key={`screen-${user.peerId}`}>
                <h4 className="headRemoteScreen">Partilha de ecrã de {user.nomeUtilizador}</h4>
                <video
                  ref={(video) => {
                    if (video && screenStream) video.srcObject = screenStream;
                  }}
                  autoPlay
                  playsInline
                  style={{ width: "300px", height: "200px", border: "1px solid purple" }}
                />
              </div>
            )
          );
        })}

        <div className="chat-box" style={{ marginTop: "30px", height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
          {chatMessages.map((msg, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <strong>{msg.sender}:</strong> {msg.text}
              {msg.link && <a href={msg.link}> Download</a>}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            style={{ width: "80%", padding: "8px" }}
          />
          <button onClick={sendMessage} className="btn btn-success" style={{ marginLeft: "10px" }}>
            Enviar
          </button>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ marginLeft: "10px" }} />
          <button className="btn btn-warning" style={{ marginLeft: "10px" }}>
            Enviar Ficheiro
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h4>Utilizadores na sala:</h4>
          <ul>
            {usersInRoom.map((user) => (
              <li key={user.peerId}>{user.nomeUtilizador} (ID: {user.peerId.substring(0, 5)}...)</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExplicacoesOnline;
