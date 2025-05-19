import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
import React, {useState, useEffect} from "react"
import Multibanco from "./Multibanco"
import TransferenciaBancaria from "./TransferenciaBancaria"
import MBWAy from "./MBWay"
import { useNavigate } from "react-router-dom";
import Menu from "./Menu"





const Explicacoes=()=>{
    const [nomeExplicando,setNomeExplicando]=useState("")
    const [explicandoId, setExplicandoId]=useState("")
    const [data,setData]=useState(null)
    const [horaInicio, setHoraInicio]=useState(null)
    const [horaFim, setHoraFim]=useState("")
    const [linguagem, setLinguagem]=useState("")
    
    const [tipo,setTipo]=useState("Presencial")
    const [pagamento,setPagamento]=useState("Multibanco")
    const [erro,setErro]=useState("")
    const navigate=useNavigate()
    

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
        if(horaInicio){
            const novaHoraFim=new Date(horaInicio)
            novaHoraFim.setHours(novaHoraFim.getHours()+2)
            setHoraFim(novaHoraFim)
        }

    },[horaInicio])

    const handleSubmit= async (e)=>{
        e.preventDefault()

        const agora=new Date()
        const dataAtual=new Date(agora.getFullYear(),agora.getMonth(),agora.getDate())
        const horaAtual=agora.getHours()* 60 +agora.getMinutes()

        
        if(!data || !horaInicio){
            setErro("Data e hora de início são obrigatórias!")
            return
        }


        const dataEscolhida=new Date(data.getFullYear(), data.getMonth(), data.getDate())

        if(dataEscolhida.getTime()===dataAtual.getTime()){
            const horaInicioEscolhida=horaInicio.getHours() *60 +horaInicio.getMinutes()

            if(horaInicioEscolhida<horaAtual){
                setErro("Se escolher a data atual, a hora de início deve ser igual ao posterior à hora atual!")
                return
            }
        }
        try{
       const response= await axios.post(`${process.env.REACT_APP_SERVER_URI}/explicacoes`,{
            explicandoId,
            data:new Date(data).toLocaleDateString("sv-SE"),
            horaInicio: horaInicio.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"}),
            horaFim: horaFim.toLocaleTimeString([],{hour:"2-digit", minute:"2-digit"}),
            linguagem,
            tipo,
            pagamento})
                

            if(response.data.sucesso){
                setErro("")
                alert("Explicação agendada com sucesso. Aguarde a confirmação")
                setErro("")
                limparCampos()

                if (pagamento === "Multibanco") {
                    navigate("/Multibanco");
                } else if (pagamento === "Transferência Bancária") {
                    navigate("/TransferenciaBancaria");
                } else if (pagamento === "MBWay") {
                    navigate("/MBWay");
                }


            }
            else{
                setErro("A sua explicação não pode ser agendada para esse período de tempo. Por favor, escolha outro!")
            }
            }catch(error){
                console.error("Erro ao agendar explicação", error)
                setErro("Ocorreu um erro ao agendar a explicação!")
                limparCampos()
            }
        }
              

        

        const limparCampos=()=>{
            setData(null)
            setHoraInicio(null)
            setHoraFim(null)
            setLinguagem("")
            setTipo("Presencial")
            setPagamento("Multibanco")
        }
    


        return(<div >
            <Menu/>
            <br/>
            <br/>
            <br/>
            <br/>
            <p className="saudacao">Olá, {nomeExplicando}</p>
            <h2 className="explicacoes">Marcação de Explicações</h2>
            <br/>
            <br/>
            

            
            
            <p className="introducaoExplicacoes"> Agende aqui uma explicação de 2 horas para poder esclarecer suas dúvidas de programação!</p>
            
            
            <form className="formularioExplicacoes" onSubmit={handleSubmit}>
            <label>Data:<span style={{color: "red"}}> *</span></label> 
            <DatePicker className="datePicker" selected={data} onChange={(date)=>setData(date)} dateFormat="yyyy-MM-dd" minDate={new Date()}/>
                <br/>
                <br/>
              <label>Hora de Início: <span style={{color: "red"}}>*</span></label>  
              <DatePicker className="datePicker" selected={horaInicio} onChange={(time)=>setHoraInicio(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Hora"
                dateFormat="HH:mm"
                minTime={new Date().setHours(9,0)}
                maxTime={new Date().setHours(18,0)}
                />
                <br/>
                <br/>
                <label> Hora de fim:</label>
                
                <input  type="text" value={horaFim? horaFim.toLocaleTimeString([],{hour:"2-digit", minute:"2-digit"}):""}
                readOnly/>
                <br/>
                <br/>
                <label>Linguagem de Programação:</label>
                <input type="text" value={linguagem} onChange={(e)=>setLinguagem(e.target.value)}/>
                <br/>
                <br/>
                <label>Tipo:</label>
                <select value={tipo} onChange={(e)=>setTipo(e.target.value)}>
                    <option value="Presencial">Presencial</option>
                    <option value="On-line">On-line</option>
                    
                </select>
                <br/>
                <br/>
                <label>Método de Pagamento:</label>
                <select value={pagamento} onChange={(e)=>setPagamento(e.target.value)}>
                    <option value="Multibanco">Multibanco</option>
                    <option value="Transferência Bancária">Transferência Bancária</option>
                    <option value="MBWay">MBWay</option>

                </select>
                <br/>
                <br/>
                
    
                <p className="obrigatorio">*Campos de preenchimento obrigatório</p>
                <button type="submit">Submeter</button>

            </form>
            {erro && <p style={{color:"red",marginLeft:"50px"}}>{erro}</p>}
            
        </div>)
        
    }
    
    



export default Explicacoes