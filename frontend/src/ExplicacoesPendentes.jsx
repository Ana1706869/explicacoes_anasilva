import Menu from "./Menu";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination, { paginateItems } from "./Pagination";

const ExplicacoesPendentes = () => {
  const [nomeExplicando, setNomeExplicando] = useState("");
  const [, setErro] = useState("");
  const [explicacoes, setExplicacoes] = useState([]);
  const [explicandos, setExplicandos] = useState([]);
  const [filtroData, setFiltroData] = useState("");
  const [filtroNome, setFiltroNome] = useState("");
  const [inputData, setInputData] = useState(null);
  const [inputNome, setInputNome] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

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
    setPaginaAtual(1);
  }, [filtroData, filtroNome]);

  const carregarDados = async () => {
    const explicacoesRes = await axios.get(`/explicacoes`);
    const explicandosRes = await axios.get(`/explicandos`);

    const agora = new Date();
    const hojeData = agora.toISOString().split("T")[0];
    const horaAtual = agora.toTimeString().split(":").slice(0, 2).join(":");
    // A lista inclui pedidos futuros e os de hoje cujo início ainda não passou.
    const explicacoesFiltradas = explicacoesRes.data.filter((e) => {
      const dataExplicacao = new Date(e.data).toISOString().split("T")[0];
      if (dataExplicacao > hojeData) {
        return e.confirmacao === "Pendente";
      } else if (dataExplicacao === hojeData) {
        return e.confirmacao === "Pendente" && e.horaInicio >= horaAtual;
      }
      return false;
    });
    setExplicandos(explicandosRes.data);
    setExplicacoes(explicacoesFiltradas);
  };

  const atualizarEstado = async (id, novoEstado) => {
    await axios.patch(`/explicacoes/${id}`, { confirmacao: novoEstado });
    // Recarrega para retirar pedidos que deixaram de estar pendentes.
    carregarDados();
  };

  const getNomeExplicando = (idExplicando) => {
    const explicando = explicandos.find((e) => e._id === idExplicando);
    return explicando ? explicando.nome : "Explicando Desconhecido";
  };

  const explicacoesFiltradas = explicacoes.filter((e) => {
    // Mantém a paginação sincronizada com os filtros aplicados pelo explicador.
    const dataExplicacao = new Date(e.data).toLocaleDateString("sv-SE");
    const dataValida = filtroData ? dataExplicacao === filtroData : true;
    const nomeValido = filtroNome
      ? getNomeExplicando(e.explicandoId)
          .toLowerCase()
          .includes(filtroNome.toLowerCase())
      : true;
    return e.confirmacao === "Pendente" && dataValida && nomeValido;
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
      <h2 className="explicacoes">Explicações Pendentes</h2>
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

              <td className="border_px-2_py-1">
                <button
                  className="bg-green-500_text-white_px-2_py-1_mr-2"
                  onClick={() => atualizarEstado(e._id, "Confirmada")}
                >
                  Confirmar
                </button>
                <button
                  className="bg-red-500_text-white_px-2_py-1"
                  onClick={() => atualizarEstado(e._id, "Recusada")}
                >
                  Recusar
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

export default ExplicacoesPendentes;
