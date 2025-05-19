import { useNavigate } from "react-router-dom";
import Menu from "./Menu"
import React, {useState, useEffect} from "react"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ExplicacoesConfirmadasExplicando from "./ExplicacoesConfirmadasExplicando";

const  ExplicacoesConfirmadasExplicador=()=>{
    const [nomeExplicando,setNomeExplicando]=useState("")
        const [explicandoId, setExplicandoId]=useState("")
        const [erro,setErro]=useState("")
        const [explicacoes,setExplicacoes]=useState([])
        const [explicandos,setExplicandos]=useState([])
        const [filtroData,setFiltroData]=useState("")
        const [filtroNome, setFiltroNome]=useState("")
        const [filtroConfirmacao,setFiltroConfirmacao]=useState("")
        const [confirmacaoSelecionada,setConfirmacaoSelecionada]=useState("")
        const [inputData, setInputData] = useState(null);
        const [inputNome, setInputNome] = useState('');
        const [paginaAtual, setPaginaAtual]=useState(1)
        const itensPorPagina=10
        
        useEffect(()=>{
            const emailLogin=localStorage.getItem("emailUsuario")
            const explicandoId=localStorage.getItem("explicandoId")
            
    
            if(!emailLogin){
                console.error("Nenhum email encontrado no localStorage")
                return
            }
    
            if(!explicandoId){
                setErro("Erro! Utilizador não autenticado")
            }
    
            axios.get(`${process.env.REACT_APP_SERVER_URI}/explicandos/${emailLogin}`).then (response =>{
                console.error("Resposta do backend:",response.data)
                setNomeExplicando(response.data.nome)
                setExplicandoId(response.data.explicandoId)
                
    
            })
            .catch(error=>console.error("Erro ao obter o explicando:",error))
        },[])

        useEffect(()=>{
            carregarDados()
        },[])

        useEffect(()=>{
          setPaginaAtual(1)
        },[filtroData,filtroNome])

        const carregarDados=async()=>{
            const explicacoesRes=await axios.get(`${process.env.REACT_APP_SERVER_URI}/explicacoes`)
            const explicandosRes= await axios.get(`${process.env.REACT_APP_SERVER_URI}/explicandos`)
            

            const agora=new Date()
            const hojeData=agora.toISOString().split("T")[0]
            const horaAtual=agora.toTimeString().split(":").slice(0,2).join(":")
            const explicacoesFiltradas=explicacoesRes.data.filter(e=>{
              
              const dataExplicacao=new Date(e.data).toISOString().split("T")[0]
              
              if(dataExplicacao>hojeData){
                return e.confirmacao==="Confirmada" || e.confirmacao==="Recusada"

              }
              else if
                (dataExplicacao===hojeData){
                  return e.confirmacao==="Confirmada" || e.confirmacao==="Recusada" && e.horaInicio>=horaAtual
                }
                return false
              
              
             
            })
            setExplicandos(explicandosRes.data)
            setExplicacoes(explicacoesFiltradas)

        }

        const atualizarEstado=async(id, novoEstado)=>{
          console.log("Id a atualizar",id)
            await axios.patch(`${process.env.REACT_APP_SERVER_URI}/explicacoes/${id}`,{confirmacao:novoEstado})
            carregarDados()
        }

        const getNomeExplicando=(idExplicando)=>{
            const explicando=explicandos.find(e=>e._id===idExplicando)
            return explicando? explicando.nome : "Explicando Desconhecido"
        }

        
        const explicacoesFiltradas=explicacoes.filter(e=>{
          const dataExplicacao=new Date(e.data).toLocaleDateString("sv-SE")
            const dataValida=filtroData ? dataExplicacao ===filtroData:true
            const nomeValido=filtroNome
            ? getNomeExplicando(e.explicandoId).toLowerCase().includes(filtroNome.toLowerCase())
            :true
            console.log("Data da explicação",dataExplicacao)
            console.log("Filtro da data",filtroData)
            const confirmacaoValida=filtroConfirmacao ? e.confirmacao===filtroConfirmacao:true
            return confirmacaoValida && dataValida && nomeValido
            
        })
        const indiceInicial=(paginaAtual-1) * itensPorPagina
        const indiceFinal=indiceInicial +itensPorPagina
        const explicacoesPaginadas=explicacoesFiltradas.slice(indiceInicial,indiceFinal)
        const totalPaginas=Math.ceil(explicacoesFiltradas.length/itensPorPagina)


        const aplicarFiltroData = () => {
           if(inputData){
            const dataSelecionada=inputData.toLocaleDateString("sv-SE")
            console.log("Data Selecionada",dataSelecionada)
            setFiltroData(dataSelecionada)
            
           }
          
          }
          
          const aplicarFiltroNome = () => {
            setFiltroNome(inputNome);
          };

    return(<div>
            <Menu/>
           <br/>
            <br/>
            <br/>
            <br/>
            <p className="saudacao">Olá, {nomeExplicando}</p>
            <h2 className="explicacoes">Lista de explicações</h2>
            <br/>
            <br/>
        <div className="data">
        <label className="data">Data</label> 
            <DatePicker className="datePicker2" selected={inputData} onChange={(date)=>setInputData(date)} minDate={new Date()} placeholderText="Seleccione uma data" dateFormat="yyyy-MM-dd"/>
                
            <button
      onClick={aplicarFiltroData}
      className="bg-blue-500 text-white px-3 py-1 ml-2 rounded"
    >
      Pesquisar por Data
    </button>
    </div>
    <br/>
    <div className="nomeExplicando">
      <label className="nomeExplicando">Nome do Explicando</label>
    <input
      type="text"
      placeholder="Nome do explicando"
      className="border_px-2_py-1"
      value={inputNome}
      onChange={e => setInputNome(e.target.value)}
    />
    <button
      onClick={aplicarFiltroNome}
      className="bg-green-500 text-white px-3 py-1 ml-2 rounded"
    >
      Pesquisar por Nome
    </button>
  </div>
  <br/>
  <div className="filtroConfirmacao">
    <label>Confirmação</label>
    <select value={confirmacaoSelecionada} onChange={(e)=>setConfirmacaoSelecionada(e.target.value)}>
    <option value="">Todas</option>
    <option value="Confirmada">Confirmada</option>
    <option value="Recusada">Recusada</option>
    </select>
    <button onClick={()=>setFiltroConfirmacao(confirmacaoSelecionada)}>Pesquisar por Confirmação

    </button>
    

  </div>
  <br/>
  <br/>
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
           
          </tr>
        </thead>
        <tbody>
          {explicacoesPaginadas.map(e => (
            <tr key={e._id}>
              <td className="border_px-2_py-1">{getNomeExplicando(e.explicandoId)}</td>
              <td className="border_px-2_py-1">{new Date(e.data).toISOString().split("T")[0]}</td>
              <td className="border_px-2_py-1">{e.horaInicio}</td>
              <td className="border_px-2_py-1">{e.horaFim}</td>
              <td className="border_px-2_py-1">{e.linguagem}</td>
              <td className="border_px-2_py-1">{e.tipo}</td>
              <td className="border_px-2_py-1">{e.pagamento}</td>
              <td className="border_px-2_py-1">{e.confirmacao}</td>
              
            </tr>
          ))}
          {explicacoesFiltradas.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center_py-4">Nenhuma explicação pendente encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="paginas">
        <button onClick={()=>setPaginaAtual((prev)=>Math.max(prev-1,1))}
        disabled={paginaAtual===1}

        className="bg-gray-300_px-300_px-3_py-1_rounded_disabled_opacity-50">Anterior</button>
        {Array.from({length:totalPaginas},(_,index)=>(
          <button key={index} onClick={()=>setPaginaAtual(index+1)}
          className="bg-gray-300_px-300_px-3_py-1_rounded_disabled_opacity-50">
            {index+1}
          </button>
        ))}

        <button onClick={()=>setPaginaAtual((prev)=>Math.min(prev+1,totalPaginas))}
        disabled={paginaAtual===totalPaginas}
        className="bg-gray-300_px-300_px-3_py-1_rounded_disabled_opacity-50">Próxima</button>
      </div>
  

    </div>)
}
   
export default ExplicacoesConfirmadasExplicador