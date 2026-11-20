import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { wsUrl } from "./apiConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EditarExplicacao from "./EditarExplicacao";
import { isLessonInProgress } from "./lessonTiming";
import Pagination, { paginateItems } from "./Pagination";

const isVisibleForStudent = (lesson, studentId, now) => {
  // A lista do explicando nunca deve incluir aulas associadas a outra pessoa.
  if (String(lesson.explicandoId) !== String(studentId)) return false;

  const lessonDate = new Date(lesson.data).toISOString().slice(0, 10);
  const today = now.toISOString().slice(0, 10);
  const currentTime = now.toTimeString().slice(0, 5);

  if (lessonDate > today) {
    return (
      lesson.confirmacao === "Confirmada" || lesson.confirmacao === "Recusada"
    );
  }
  if (lessonDate === today) {
    return (
      lesson.confirmacao === "Confirmada" ||
      (lesson.confirmacao === "Recusada" && lesson.horaInicio >= currentTime)
    );
  }
  return false;
};

const ExplicacoesConfirmadasExplicando = () => {
  const [nomeExplicando, setNomeExplicando] = useState("");
  const [explicandoId, setExplicandoId] = useState("");
  const [, setErro] = useState("");
  const [explicacoes, setExplicacoes] = useState([]);
  const [filtroData, setFiltroData] = useState("");

  const [filtroConfirmacao, setFiltroConfirmacao] = useState("");
  const [confirmacaoSelecionada, setConfirmacaoSelecionada] = useState("");
  const [inputData, setInputData] = useState(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [agora, setAgora] = useState(() => new Date());
  const itensPorPagina = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const intervalo = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  const carregarDados = useCallback(async () => {
    const explicacoesRes = await axios.get(`/explicacoes`);

    // Centraliza o filtro para aplicar as mesmas regras ao carregar e ao receber eventos.
    const now = new Date();
    const explicacoesFiltradas = explicacoesRes.data.filter((lesson) =>
      isVisibleForStudent(lesson, explicandoId, now),
    );
    setExplicacoes(explicacoesFiltradas);
  }, [explicandoId]);

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
        setExplicandoId(response.data.explicandoId);
      })
      .catch((error) => console.error("Erro ao obter o explicando:", error));
  }, []);

  useEffect(() => {
    if (explicandoId) {
      carregarDados();
    }
  }, [carregarDados, explicandoId]);

  useEffect(() => {
    if (
      !explicandoId ||
      sessionStorage.getItem("tipoUsuario") !== "Explicando"
    ) {
      return;
    }

    const socket = new WebSocket(wsUrl());
    const handleOpen = () => {
      socket.send(JSON.stringify({ type: "subscribe-explanation-list" }));
    };
    const handleMessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "explanation-list-subscribed") {
          carregarDados();
          return;
        }
        if (
          message.type !== "explanation-status-updated" ||
          !message.explanation
        ) {
          return;
        }

        // Atualiza ou remove a aula localmente conforme o novo estado e a data.
        const updatedLesson = message.explanation;
        setExplicacoes((current) => {
          const remaining = current.filter(
            (lesson) => lesson._id !== updatedLesson._id,
          );
          if (!isVisibleForStudent(updatedLesson, explicandoId, new Date())) {
            return remaining;
          }
          return [...remaining, updatedLesson];
        });
        setPaginaAtual(1);
      } catch (error) {
        console.error("Erro ao processar atualização da explicação", error);
      }
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);
    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.close();
    };
  }, [carregarDados, explicandoId]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [filtroData]);

  const explicacoesFiltradas = explicacoes.filter((e) => {
    const dataExplicacao = new Date(e.data).toLocaleDateString("sv-SE");
    const dataValida = filtroData ? dataExplicacao === filtroData : true;

    const confirmacaoValida = filtroConfirmacao
      ? e.confirmacao === filtroConfirmacao
      : true;
    return confirmacaoValida && dataValida;
  });
  const { items: explicacoesPaginadas, totalPages: totalPaginas } =
    paginateItems(explicacoesFiltradas, paginaAtual, itensPorPagina);

  const aplicarFiltroData = () => {
    if (inputData) {
      const dataSelecionada = inputData.toLocaleDateString("sv-SE");
      setFiltroData(dataSelecionada);
    }
  };

  const handleAlterar = (id) => {
    navigate(`/EditarExplicacao/${id}`);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("Tem a certez que deseja eliminar esta explicação?")) {
      try {
        await axios.delete(`/explicacoes/${id}`);
        alert("Explicação eliminada com sucesso!");
        carregarDados();
      } catch (error) {
        console.error("Erro ao eliminar explicação", error);
      }
    }
  };

  return (
    <div>
      <Menu />
      <br />
      <br />
      <br />
      <br />
      <p className="saudacao">Olá, {nomeExplicando}</p>
      <h2 className="explicacoes">Explicações de {nomeExplicando}</h2>
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
                <button
                  className="bg-green-500_text-white_px-2_py-1_mr-2"
                  onClick={() => handleAlterar(e._id)}
                >
                  Alterar
                </button>
                <button
                  className="bg-red-500_text-white_px-2_py-1"
                  onClick={() => handleEliminar(e._id)}
                >
                  Eliminar
                </button>
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

export default ExplicacoesConfirmadasExplicando;
