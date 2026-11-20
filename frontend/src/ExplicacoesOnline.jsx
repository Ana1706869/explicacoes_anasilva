import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Menu from "./Menu";
import Peer, { StreamConnection } from "peerjs";
import { useParams } from "react-router-dom";
import { httpBaseUrl, wsUrl } from "./apiConfig";

const appendUniqueChatMessage = (messages, message) => {
  // O mesmo envio pode chegar pelo eco do servidor depois de já aparecer localmente.
  if (
    message.id &&
    messages.some((existingMessage) => existingMessage.id === message.id)
  ) {
    return messages;
  }
  return [...messages, message];
};

const appendRecording = (setRecordings, setRecordingsLoaded, recording) => {
  if (!recording?.id) return;
  setRecordings((currentRecordings) => {
    if (currentRecordings.some((item) => item.id === recording.id)) {
      return currentRecordings;
    }
    return [
      ...currentRecordings,
      {
        ...recording,
        date: new Date(recording.uploadedAt).toLocaleString("pt-PT"),
        url: null,
      },
    ];
  });
  setRecordingsLoaded(true);
};

const ExplicacoesOnline = () => {
  const { explicacaoId } = useParams();
  const [nomeExplicando, setNomeExplicando] = useState("");
  const localVideoRef = useRef(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const peerConnections = useRef({});
  const [file, setFile] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const ws = useRef(null);
  const [erro, setErro] = useState("");
  const originalStream = useRef(null);
  const localStream = useRef(null);
  const screenTrackRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [recordingsLoaded, setRecordingsLoaded] = useState(false);
  const [recordingsError, setRecordingsError] = useState("");
  const [recordingsModalOpen, setRecordingsModalOpen] = useState(false);
  const recordingUrlsRef = useRef([]);
  const peerRef = useRef(null);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const sentFiles = useRef(new Set());
  const messagesEndRef = useRef(null);

  useEffect(
    () => () => {
      recordingUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );

  useEffect(() => {
    let isMounted = true;
    if (!explicacaoId || !sessionStorage.getItem("token")) {
      setRecordingsLoaded(true);
      return undefined;
    }

    axios
      .get(`/explicacoes/${explicacaoId}/recordings`)
      .then((response) => {
        if (!isMounted) return;
        const loadedRecordings = response.data.map((item) => ({
          ...item,
          date: new Date(item.uploadedAt).toLocaleString("pt-PT"),
          url: null,
        }));
        setRecordings((currentRecordings) => {
          const recordingsById = new Map(
            loadedRecordings.map((item) => [item.id, item]),
          );
          currentRecordings.forEach((item) => {
            if (!recordingsById.has(item.id)) recordingsById.set(item.id, item);
          });
          return [...recordingsById.values()];
        });
        setRecordingsLoaded(true);
      })
      .catch((error) => {
        console.error("Erro ao carregar gravações partilhadas", error);
        if (!isMounted) return;
        setRecordingsError(
          "Não foi possível carregar as gravações desta explicação.",
        );
        setRecordingsLoaded(true);
      });
    return () => {
      isMounted = false;
    };
  }, [explicacaoId]);

  const loadRecordingFile = async (recording) => {
    if (recording.url) return;
    try {
      setRecordingsError("");
      const response = await axios.get(
        `/explicacoes/${explicacaoId}/recordings/${recording.id}`,
        { responseType: "blob" },
      );
      const url = URL.createObjectURL(response.data);
      recordingUrlsRef.current.push(url);
      setRecordings((currentRecordings) =>
        currentRecordings.map((item) =>
          item.id === recording.id ? { ...item, url } : item,
        ),
      );
    } catch (error) {
      console.error("Erro ao transferir gravação", error);
      setRecordingsError("Não foi possível carregar esta gravação.");
    }
  };

  useEffect(() => {
    if (!recordingsModalOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setRecordingsModalOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [recordingsModalOpen]);

  const initChatFallback = (nome, id, roomId) => {
    if (ws.current) return;

    // Sem acesso à câmara, mantém o utilizador na sala para poder usar o chat.
    const fallbackPeerId = `chat-${id || "anon"}-${Date.now()}`;
    ws.current = new WebSocket(wsUrl());

    ws.current.onopen = () => {
      ws.current.send(
        JSON.stringify({
          type: "join-room",
          userId: id,
          peerId: fallbackPeerId,
          roomId,
          nome,
        }),
      );
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "room-update") {
          const { usersInRoom, userNames } = data;
          if (usersInRoom && userNames) {
            setUsersInRoom(
              usersInRoom.map((peerId) => ({
                peerId,
                nomeUtilizador: userNames[peerId] || "Utilizador desconhecido",
              })),
            );
          }
        }

        if (data.type === "recording-created") {
          appendRecording(setRecordings, setRecordingsLoaded, data.recording);
        }

        if (data.type === "chat-message") {
          setChatMessages((prev) =>
            appendUniqueChatMessage(prev, {
              id: data.id,
              sender: data.sender,
              text: data.text,
            }),
          );
        }

        if (data.type === "receive-file") {
          setChatMessages((prev) =>
            appendUniqueChatMessage(prev, {
              id: data.id,
              sender: data.sender,
              text: `Ficheiro: ${data.filename}`,
              link: data.link,
            }),
          );
        }
      } catch (error) {
        console.error("Erro ao processar mensagem WebSocket (fallback)", error);
      }
    };
  };

  useEffect(() => {
    let isActive = true;
    const emailLogin = sessionStorage.getItem("emailUsuario");
    const storedExplicandoId = sessionStorage.getItem("explicandoId");

    if (!emailLogin || !sessionStorage.getItem("token")) {
      window.location.replace("/");
      return;
    }

    if (!explicacaoId) {
      const listaPath =
        sessionStorage.getItem("tipoUsuario") === "Explicador"
          ? "/ExplicacoesConfirmadasExplicador"
          : "/ExplicacoesConfirmadasExplicando";
      window.location.replace(listaPath);
      return;
    }

    if (!storedExplicandoId) {
      setErro("Erro! Utilizador não autenticado");
    }

    // Confirma no servidor que a marcação existe e está autorizada para vídeo antes de pedir mídia.
    axios
      .get(`${httpBaseUrl}/explicacoes/${explicacaoId}`)
      .then((response) => {
        if (!isActive) return null;
        const explicacao = response.data;
        if (
          explicacao.confirmacao !== "Confirmada" ||
          explicacao.tipo !== "On-line"
        ) {
          throw new Error("A explicação não está disponível online");
        }
        return axios.get(`${httpBaseUrl}/explicandos/${emailLogin}`);
      })
      .then((response) => {
        if (!isActive || !response) return;
        const nome = response.data.nome;
        const id = response.data.explicandoId;
        setNomeExplicando(nome);

        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            if (!isActive) {
              stream.getTracks().forEach((track) => track.stop());
              return;
            }
            originalStream.current = stream;
            localStream.current = stream;
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
              localVideoRef.current.muted = true;
              localVideoRef.current.play().catch((playErr) => {
                console.error("Erro ao iniciar vídeo local", playErr);
              });
            }
            if (!peerRef.current) {
              peerRef.current = new Peer();
              const peer = peerRef.current;
              peer.on("open", () => {
                ws.current = new WebSocket(wsUrl());

                ws.current.onopen = () => {
                  const message = {
                    type: "join-room",
                    userId: id,
                    peerId: peer.id,
                    roomId: explicacaoId,
                  };

                  ws.current.send(JSON.stringify(message));
                };

                ws.current.onmessage = (event) => {
                  try {
                    const data = JSON.parse(event.data);

                    if (data.type === "error") {
                      setErro(data.message);
                    }

                    if (data.type === "recording-created") {
                      appendRecording(
                        setRecordings,
                        setRecordingsLoaded,
                        data.recording,
                      );
                    }

                    // Se receber a lista de usuários conectados
                    if (data.type === "room-update") {
                      const { usersInRoom, userNames } = data;

                      if (usersInRoom && userNames) {
                        setUsersInRoom(
                          usersInRoom.map((peerId) => ({
                            peerId,
                            nomeUtilizador:
                              userNames[peerId] || "Utilizador desconhecido",
                          })),
                        );
                      } else {
                        console.error(
                          "Dados de utilizadores não recebido corretamente",
                        );
                      }

                      usersInRoom.forEach((peerId) => {
                        // Evita abrir chamadas duplicadas quando chegam atualizações repetidas da sala.
                        if (
                          peerId !== peer.id &&
                          !peerConnections.current[peerId]
                        ) {
                          try {
                            const call = peerRef.current.call(peerId, stream);

                            peerConnections.current[peerId] = call;

                            call.on("stream", (remoteStream) => {
                              setRemoteStreams((prevStreams) => {
                                if (!prevStreams[peerId]) {
                                  return {
                                    ...prevStreams,
                                    [peerId]: remoteStream,
                                  };
                                }
                                return prevStreams;
                              });
                            });

                            call.on("close", () => {
                              delete peerConnections.current[peerId];

                              setRemoteStreams((prevStreams) => {
                                const newStreams = { ...prevStreams };
                                delete newStreams[peerId];
                                return newStreams;
                              });
                            });
                          } catch (error) {
                            console.error(
                              "Erro ao processar chamada Peer",
                              error,
                            );
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
                      const screenCall =
                        peerConnections.current[`screen-${peerId}`];
                      if (screenCall) {
                        screenCall.close();
                        delete peerConnections.current[`screen-${peerId}`];
                      }
                    }
                    if (data.type === "chat-message") {
                      setChatMessages((prev) =>
                        appendUniqueChatMessage(prev, {
                          id: data.id,
                          sender: data.sender,
                          text: data.text,
                        }),
                      );
                    }

                    if (data.type === "receive-file") {
                      setChatMessages((prev) =>
                        appendUniqueChatMessage(prev, {
                          id: data.id,
                          sender: data.sender,
                          text: `Ficheiro: ${data.filename}`,
                          link: data.link,
                        }),
                      );
                    }
                  } catch (error) {
                    console.error(
                      "Erro ao processar mensagem Websocket",
                      error,
                    );
                  }
                };

                peer.on("call", (call) => {
                  try {
                    if (call.metadata?.type === "screen") {
                      // Uma partilha de ecrã não substitui o stream normal da câmara.
                      call.answer(); // Responde a chamada com o próprio stream

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
                      call.answer(originalStream.current);
                      call.on("stream", (remoteCamStream) => {
                        setRemoteStreams((prev) => ({
                          ...prev,
                          [call.peer]: remoteCamStream,
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
              });
            }
          })
          .catch((err) => {
            if (!isActive) return;
            console.error("Erro ao acessar câmara/microfone", err);
            setErro(
              "Não foi possível aceder à câmara ou ao microfone. Verifique as permissões e se outra aplicação está a utilizar os dispositivos.",
            );
            initChatFallback(nome, id, explicacaoId);
          });
      })
      .catch((err) => {
        if (!isActive) return;
        console.error("Erro ao validar a explicação online", err);
        setErro("Não foi possível aceder a esta explicação online.");
      });

    window.addEventListener("beforeunload", handleWindowClose);
    return () => {
      isActive = false;
      handleWindowClose();
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, [explicacaoId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [chatMessages]);

  const handleWindowClose = () => {
    // Liberta sockets, chamadas e tracks para não deixar câmara ou microfone ativos.
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
    if (originalStream.current) {
      originalStream.current.getTracks().forEach((track) => track.stop());
      originalStream.current = null;
      localStream.current = null;
    }
  };

  const shareScreen = async () => {
    try {
      if (screenTrackRef.current) {
        stopScreenShare();
        return;
      }

      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      const screenTrack = screenStream.getVideoTracks()[0];
      screenTrackRef.current = screenTrack;

      // Abre um canal Peer separado para o ecrã de cada participante ligado.
      Object.keys(usersInRoom).forEach((_, index) => {
        const peerId = usersInRoom[index].peerId;
        if (peerId === peerRef.current.id) return;

        const call = peerRef.current.call(peerId, screenStream, {
          metadata: { type: "screen" },
        });

        peerConnections.current[`screen-${peerId}`] = call;

        call.on("stream", (remoteStream) => {
          setRemoteStreams((prevStreams) => ({
            ...prevStreams,
            [`screen-${peerId}`]: remoteStream,
          }));
        });
        call.on("close", () => {
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
          peerId: peerRef.current.id,
        }),
      );
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      alert("Conexão de chat indisponível. Recarregue a página.");
      return;
    }

    file.uploading = true;

    if (sentFiles.current.has(file.name)) {
      file.uploading = false;
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${httpBaseUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      const fileMessage = {
        type: "send-file",
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        sender: nomeExplicando,
        filename: result.url.split("/").pop(),
        link: result.url,
      };

      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(fileMessage));
      }
      setChatMessages((prev) =>
        appendUniqueChatMessage(prev, {
          id: fileMessage.id,
          sender: nomeExplicando,
          text: `Ficheiro ${result.originalname}`,
          link: result.url,
        }),
      );
      sentFiles.current.add(file.name);
    } catch (error) {
      console.error("Erro ao fazer upload do ficheiro", error);
    }
    file.uploading = false;
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    const msg = {
      type: "chat-message",
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      sender: nomeExplicando || "Eu",
      text: message,
    };

    // Renderiza primeiro localmente; o id permite ignorar a cópia devolvida pelo servidor.
    setChatMessages((prev) =>
      appendUniqueChatMessage(prev, {
        id: msg.id,
        sender: msg.sender,
        text: msg.text,
      }),
    );
    setMessage("");

    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      setErro(
        "Conexão de chat indisponível. A mensagem foi mostrada localmente.",
      );
      return;
    }
    try {
      ws.current.send(JSON.stringify(msg));
    } catch (error) {
      console.error("Erro ao enviar mensagem", error);
      setErro("Não foi possível enviar para os outros utilizadores.");
    }
  };

  const startRecording = async () => {
    try {
      // Captura o ecrã e combina o áudio do microfone antes de iniciar o MediaRecorder.
      const sessionStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const combinedStream = new MediaStream([
        ...sessionStream.getVideoTracks(),
        ...micStream.getAudioTracks(),
      ]);
      const recorder = new MediaRecorder(combinedStream);
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };
      recorder.onstop = async () => {
        const mimeType = recorder.mimeType || "video/webm";
        const blob = new Blob(chunks, { type: mimeType });
        const date = new Date();
        const extension = mimeType.includes("mp4") ? "mp4" : "webm";
        const name = `gravacao-${date.toISOString().replace(/[:.]/g, "-")}.${extension}`;
        try {
          const formData = new FormData();
          formData.append("recording", blob, name);
          const response = await axios.post(
            `/explicacoes/${explicacaoId}/recordings`,
            formData,
          );
          appendRecording(setRecordings, setRecordingsLoaded, response.data);
          setRecordingsError("");
        } catch (error) {
          console.error("Erro ao partilhar gravação", error);
          const serverMessage = error.response?.data?.message;
          const statusMessage = error.response?.status
            ? `O servidor respondeu com erro HTTP ${error.response.status}.`
            : "Não foi possível contactar o servidor.";
          setRecordingsError(serverMessage || statusMessage);
        } finally {
          combinedStream.getTracks().forEach((track) => track.stop());
        }
      };
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error("Erro ao iniciar gravação de ecrã", error);
    }
  };
  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  return (
    <div>
      <Menu />
      {erro && <p role="alert">{erro}</p>}
      <br />
      <br />
      <br />
      <br />
      <p className="saudacao">Olá, {nomeExplicando}</p>
      <h2 className="explicacoes">Explicações on-line</h2>
      <br />
      <br />
      <h2 className="cabecalhoCamaraLocal">{nomeExplicando}</h2>
      <div className="camaraWrapper">
        <div className="localVideo">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{ width: "300px", height: "200px" }}
          />
          {recording ? (
            <button onClick={stopRecording}>Parar gravação</button>
          ) : (
            <button onClick={startRecording} disabled={recording}>
              Iniciar gravação
            </button>
          )}
          <button type="button" onClick={() => setRecordingsModalOpen(true)}>
            Ver gravações
          </button>
          {recordingsError && <p role="alert">{recordingsError}</p>}

          <button onClick={shareScreen}>Partilhar ecrã</button>
        </div>

        <div className="remoteCamaraContainer">
          {usersInRoom.map((user) => {
            const camaraStream = remoteStreams[user.peerId];

            return (
              camaraStream && (
                <div key={user.peerId}>
                  <h2 className="cabecalhoCamaraRemota">
                    {user.nomeUtilizador}
                  </h2>
                  <video
                    ref={(video) => {
                      if (video && camaraStream) video.srcObject = camaraStream;
                    }}
                    autoPlay
                    playsInline
                    style={{ width: "300px", height: "200px" }}
                  />
                </div>
              )
            );
          })}
        </div>
      </div>

      <br />
      <br />

      <h4 className="headLocalScreen"> Partilha de ecrã de {nomeExplicando}</h4>
      <div className="localScreen">
        <video
          id="local-shared-screen"
          autoPlay
          playsInline
          style={{
            width: "2000px",
            height: "2000px",
            position: "relative",
            top: "-350px",
            zIndex: "1",
            pointerEvents: "none",
          }}
        />
      </div>

      {usersInRoom.map((user) => {
        const screenStream = remoteStreams[`screen-${user.peerId}`];
        return (
          screenStream && (
            <div className="remoteScreen" key={`screen-${user.peerId}`}>
              <h4 className="headRemoteScreen">
                {" "}
                Partilha de ecrã de {user.nomeUtilizador}
              </h4>

              <video
                ref={(video) => {
                  if (video && screenStream) video.srcObject = screenStream;
                }}
                autoPlay
                playsInline
                style={{
                  width: "2000px",
                  height: "2000px",
                  border: "1 px solid black",
                  frameElement: "black",
                  position: "relative",
                  top: "-450px",
                  zIndex: "1",
                  pointerEvents: "none",
                }}
              />
            </div>
          )
        );
      })}

      <div className="chat">
        {chatMessages.map((msg, i) => (
          <div key={i} className="chatBox">
            <strong>{msg.sender}: </strong>
            {""}
            {msg.link ? (
              <a href={msg.link} target="_blank" rel="noopener noreferrer">
                {" "}
                {msg.link}
              </a>
            ) : (
              msg.text
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />

        <textarea
          className="inputMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mensagem"
        />
        <button onClick={sendMessage}>Enviar</button>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleFileUpload}>Enviar Ficheiro</button>
      </div>
      {recordingsModalOpen && (
        <div
          onClick={(event) => {
            if (event.target === event.currentTarget)
              setRecordingsModalOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.65)",
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="recordings-modal-title"
            style={{
              background: "white",
              color: "#222",
              width: "min(720px, 100%)",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 24,
              borderRadius: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
              }}
            >
              <h2 id="recordings-modal-title">Gravações</h2>
              <button
                type="button"
                aria-label="Fechar gravações"
                onClick={() => setRecordingsModalOpen(false)}
              >
                Fechar
              </button>
            </div>
            {recordingsError && <p role="alert">{recordingsError}</p>}
            {!recordingsLoaded ? (
              <p>A carregar gravações...</p>
            ) : recordings.length === 0 ? (
              <p>Ainda não existem gravações guardadas nesta explicação.</p>
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: 16,
                }}
              >
                {recordings.map((item) => (
                  <li
                    key={item.id}
                    style={{ borderTop: "1px solid #ddd", paddingTop: 16 }}
                  >
                    <p>
                      <strong>{item.name}</strong>
                      <br />
                      {item.date}
                    </p>
                    {item.url ? (
                      <>
                        <video
                          src={item.url}
                          controls
                          playsInline
                          aria-label={`Pré-visualização de ${item.name}`}
                          style={{
                            display: "block",
                            width: "100%",
                            maxHeight: 360,
                            background: "#111",
                          }}
                        />
                        <a href={item.url} download={item.name}>
                          Descarregar gravação
                        </a>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => loadRecordingFile(item)}
                      >
                        Carregar gravação
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default ExplicacoesOnline;
