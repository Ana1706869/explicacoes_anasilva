import Menu from "./Menu";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { httpBaseUrl } from "./apiConfig";
import Pagination, { paginateItems } from "./Pagination";
const Forum = () => {
  const [nomeExplicando, setNomeExplicando] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [ficheiro, setFicheiro] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const mensagensPorPagina = 10;
  const [erro, setErro] = useState("");
  const inputFileRef = useRef();

  useEffect(() => {
    const emailLogin = sessionStorage.getItem("emailUsuario");
    const explicandoId = sessionStorage.getItem("explicandoId");

    if (!emailLogin) {
      console.error("Nenhum email encontrado na sessão atual");
      return;
    }

    if (!explicandoId) {
      setErro("Erro! Utilizador não autenticado");
    }

    axios.get(`/explicandos/${emailLogin}`).then((response) => {
      console.error("Resposta do backend:", response.data);
      setNomeExplicando(response.data.nome);
    });

    carregarMensagens();
  }, []);

  const carregarMensagens = () => {
    axios.get(`/forum`).then((res) => {
      setMensagens(res.data);
    });
  };

  const enviarMensagens = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("mensagem", mensagem);
    formData.append("nome", nomeExplicando);

    if (ficheiro) formData.append("ficheiro", ficheiro);

    // Aceita texto, ficheiro ou ambos, mas não permite uma publicação vazia.
    if (!mensagem && !ficheiro) {
      setErro(
        "Por favor, escreva uma mensagem ou selecione um ficheiro antes de enviar",
      );
      return;
    }

    await axios.post(`/forum`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setMensagem("");
    setFicheiro(null);
    carregarMensagens();
    setErro("");
    setMensagem("");
    if (inputFileRef.current) inputFileRef.current.value = "";
  };
  // A paginação é aplicada depois de carregar todas as mensagens ordenadas pelo backend.
  const { items: mensagensVisiveis, totalPages: totalPaginas } = paginateItems(
    mensagens,
    paginaAtual,
    mensagensPorPagina,
  );

  return (
    <div>
      <Menu />
      <br />
      <br />
      <br />
      <br />
      <p className="saudacao">Olá, {nomeExplicando}</p>
      <h2 className="explicacoes">Fórum</h2>
      <br />
      <br />
      <p className="forum">
        Partilhe suas dúvidas, através de mensagens e ficheiros com a comunidade
        aqui no fórum que nós teremos todo o gosto em ajudar!
      </p>
      <br />
      <form className="forumUtilizadores" onSubmit={enviarMensagens}>
        <textarea
          className="inputMessage"
          placeholder="Escreva a sua mensagem..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        ></textarea>
        <br />
        <input
          className="ficheiro"
          type="file"
          ref={inputFileRef}
          onChange={(e) => setFicheiro(e.target.files[0])}
        />

        <br />
        <button className="enviar" type="submit">
          Enviar
        </button>
      </form>
      {erro && <p style={{ color: "red", marginLeft: "50px" }}>{erro}</p>}
      <br />

      <h3 className="tituloMensagens">Mensagens no Fórum:</h3>
      {mensagensVisiveis.map((m, idx) => (
        <div
          className="messageArea"
          key={idx}
          style={{ border: "1px solid gray" }}
        >
          <p className="nomeRemetente">
            <strong>{m.nome} </strong>escreveu em{" "}
            {new Date(m.criadoEm).toLocaleString("pt-PT", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
            :
          </p>
          <p className="mensagemForum">{m.mensagem}</p>
          {m.ficheiro && (
            <p className="ficheiroForum">
              Ficheiro:
              <a href={`${httpBaseUrl}/uploads/${m.ficheiro}`} download>
                {m.ficheiro}
              </a>
            </p>
          )}
        </div>
      ))}
      <br />
      <br />
      <br />
      <br />
      <Pagination
        currentPage={paginaAtual}
        totalPages={totalPaginas}
        setCurrentPage={setPaginaAtual}
      />
    </div>
  );
};

export default Forum;
