import Menu from "./Menu";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { wsUrl } from "./apiConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isLessonInProgress } from "./lessonTiming";
import Pagination, { paginateItems } from "./Pagination";

const ExplicacoesConfirmadasExplicador = () => {
  const [nomeExplicando, setNomeExplicando] = useState("");
  const [, setErro] = useState("");
  const [explicacoes, setExplicacoes] = useState([]);
  const [explicandos, setExplicandos] = useState([]);
  const [filtroData, setFiltroData] = useState("");
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroConfirmacao, setFiltroConfirmacao] = useState("");
  const [confirmacaoSelecionada, setConfirmacaoSelecionada] = useState("");
  const [inputData, setInputData] = useState(null);
  const [inputNome, setInputNome] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [agora, setAgora] = useState(() => new Date());
  const itensPorPagina = 10;

  useEffect(() => {
    // Atualiza o relógio para que as ações dependentes da hora acompanhem a aula.
    const intervalo = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

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

    axios
      .get(`/explicandos/${emailLogin}`)
      .then((response) => {
        console.error("Resposta do backend:", response.data);
        setNomeExplicando(response.data.nome);
      })
      .catch((error) => console.error("Erro ao obter o explicando:", error));
  }, []);

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("tipoUsuario") !== "Explicador") return;

    // Recebe remoções em tempo real sem ter de voltar a carregar a página.
    const socket = new WebSocket(wsUrl());
    const handleOpen = () => {
      socket.send(JSON.stringify({ type: "subscribe-explanation-list" }));
    };
    const handleMessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "explanation-deleted") {
          setExplicacoes((current) =>
            current.filter(
              (explicacao) => explicacao._id !== message.explanationId,
            ),
          );
        }
      } catch (error) {
        console.error("Erro ao processar atualização da lista", error);
      }
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);
    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.close();
    };
  }, []);

  useEffect(() => {
    setPaginaAtual(1);
  }, [filtroData, filtroNome]);

  const carregarDados = async () => {
    const explicacoesRes = await axios.get(`/explicacoes`);
    const explicandosRes = await axios.get(`/explicandos`);

    const agora = new Date();
    const hojeData = agora.toISOString().split("T")[0];
    const horaAtual = agora.toTimeString().split(":").slice(0, 2).join(":");
    // Oculta aulas passadas e recusas cujo horário de hoje já terminou.
    const explicacoesFiltradas = explicacoesRes.data.filter((e) => {
      const dataExplicacao = new Date(e.data).toISOString().split("T")[0];

      if (dataExplicacao > hojeData) {
        return e.confirmacao === "Confirmada" || e.confirmacao === "Recusada";
      } else if (dataExplicacao === hojeData) {
        return (
          e.confirmacao === "Confirmada" ||
          (e.confirmacao === "Recusada" && e.horaInicio >= horaAtual)
        );
      }
      return false;
    });
    setExplicandos(explicandosRes.data);
    setExplicacoes(explicacoesFiltradas);
  };

  const getNomeExplicando = (idExplicando) => {
    const explicando = explicandos.find((e) => e._id === idExplicando);
    return explicando ? explicando.nome : "Explicando Desconhecido";
  };

  const explicacoesFiltradas = explicacoes.filter((e) => {
    const dataExplicacao = new Date(e.data).toLocaleDateString("sv-SE");
    const dataValida = filtroData ? dataExplicacao === filtroData : true;
    const nomeValido = filtroNome
      ? getNomeExplicando(e.explicandoId)
          .toLowerCase()
          .includes(filtroNome.toLowerCase())
      : true;
    const confirmacaoValida = filtroConfirmacao
      ? e.confirmacao === filtroConfirmacao
      : true;
    return confirmacaoValida && dataValida && nomeValido;
  });
  const { items: explicacoesPaginadas, totalPages: totalPaginas } =
    paginateItems(explicacoesFiltradas, paginaAtual, itensPorPagina);

  const aplicarFiltroData = () => {
    if (inputData) {
      const dataSelecionada = inputData.toLocaleDateString("sv-SE");
      setFiltroData(dataSelecionada);
    }
  };

  const aplicarFiltroNome = () => {
    setFiltroNome(inputNome);
  };

  return (
    <div>
      <Menu />
      <br />
      <br />
      <br />
      <br />
      <p className="saudacao">Olá, {nomeExplicando}</p>
      <h2 className="explicacoes">Lista de explicações</h2>
      <br />
      <br />
      <div className="data">
        <label className="data">Data</label>
        <DatePicker
          className="datePicker2"
          selected={inputData}
          onChange={(date) => setInputData(date)}
          minDate={new Date()}
          placeholderText="Seleccione uma data"
          dateFormat="yyyy-MM-dd"
        />

        <button
          onClick={aplicarFiltroData}
          className="bg-blue-500 text-white px-3 py-1 ml-2 rounded"
        >
          Pesquisar por Data
        </button>
        <button
          type="button"
          onClick={() => {
            setInputData(null);
            setFiltroData("");
          }}
        >
          Limpar data
        </button>
      </div>
      <br />
      <div className="nomeExplicando">
        <label className="nomeExplicando">Nome do Explicando</label>
        <input
          type="text"
          placeholder="Nome do explicando"
          className="border_px-2_py-1"
          value={inputNome}
          onChange={(e) => setInputNome(e.target.value)}
        />
        <button
          onClick={aplicarFiltroNome}
          className="bg-green-500 text-white px-3 py-1 ml-2 rounded"
        >
          Pesquisar por Nome
        </button>
        <button
          type="button"
          onClick={() => {
            setInputNome("");
            setFiltroNome("");
          }}
        >
          Limpar nome
        </button>
      </div>
      <br />
      <div className="filtroConfirmacao">
        <label>Confirmação</label>
        <select
          value={confirmacaoSelecionada}
          onChange={(e) => setConfirmacaoSelecionada(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Recusada">Recusada</option>
        </select>
        <button onClick={() => setFiltroConfirmacao(confirmacaoSelecionada)}>
          Pesquisar por Confirmação
        </button>
        <button
          type="button"
          onClick={() => {
            setConfirmacaoSelecionada("");
            setFiltroConfirmacao("");
          }}
        >
          Limpar confirmação
        </button>
      </div>
      <br />
      <br />
      <table className="table-auto_border-collapse_w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border_px-2_py-1">Explicando</th>
            <th className="border_px-2_py-1">Data</th>
            <th className="border_px-2_py-1">Hora Início</th>
            <th className="border_px-2_py-1">Hora Fim</th>
            <th className="border_px-2_py-1">Linguagem</th>
            <th className="border_px-2_py-1">Modalidade</th>
            <th className="border_px-2_py-1">Pagamento</th>
            <th className="border_px-2_py-1">Confirmação</th>
            <th className="border_px-2_py-1">Ações</th>
          </tr>
        </thead>
        <tbody>
          {explicacoesPaginadas.map((e) => (
            <tr key={e._id}>
              <td className="border_px-2_py-1">
                {getNomeExplicando(e.explicandoId)}
              </td>
              <td className="border_px-2_py-1">
                {new Date(e.data).toISOString().split("T")[0]}
              </td>
              <td className="border_px-2_py-1">{e.horaInicio}</td>
              <td className="border_px-2_py-1">{e.horaFim}</td>
              <td className="border_px-2_py-1">{e.linguagem}</td>
              <td className="border_px-2_py-1">{e.tipo}</td>
              <td className="border_px-2_py-1">{e.pagamento}</td>
              <td className="border_px-2_py-1">{e.confirmacao}</td>
              <td className="border_px-2_py-1">
                {e.confirmacao === "Confirmada" &&
                  e.tipo === "On-line" &&
                  isLessonInProgress(e, agora) && (
                    <Link to={`/ExplicacoesOnline/${e._id}`}>
                      Entrar na explicação
                    </Link>
                  )}
              </td>
            </tr>
          ))}
          {explicacoesFiltradas.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center_py-4">
                Nenhuma explicação pendente encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
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

export default ExplicacoesConfirmadasExplicador;
