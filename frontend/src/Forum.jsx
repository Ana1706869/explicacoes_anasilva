import { useNavigate } from "react-router-dom";
import Menu from "./Menu"
import React, {useState, useEffect,useRef} from "react"
import axios from "axios"
const  Forum=()=>{
    const [nomeExplicando,setNomeExplicando]=useState("")
        const [explicandoId, setExplicandoId]=useState("")
        const[mensagem,setMensagem]=useState("")
        const [ficheiro,setFicheiro]=useState(null)
        const [mensagens,setMensagens]=useState([])
        const[paginaAtual,setPaginaAtual]=useState(1)
        const mensagensPorPagina=10
        const[erro,setErro]=useState("")
        const [data,setData]=useState(null)
        const inputFileRef=useRef()


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
        
        carregarMensagens()
    },[])

    const carregarMensagens=()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URI}/forum`).then((res)=>{
            setMensagens(res.data)
        })
    }

    const enviarMensagens=async(e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append("mensagem",mensagem)
        formData.append("nome",nomeExplicando)
        
        if(ficheiro) formData.append("ficheiro",ficheiro)

            if(!mensagem && !ficheiro){
                setErro("Por favor, escreva uma mensagem ou selecione um ficheiro antes de enviar")
                return
            }

            await axios.post(`${process.env.REACT_APP_SERVER_URI}/forum`,formData,{
                headers:{"Content-Type":"multipart/form-data"}
            })
            setMensagem("")
            setFicheiro(null)
            carregarMensagens()
            setErro("")
            setMensagem("")
            if(inputFileRef.current)
                inputFileRef.current.value=""
    }
    const indexUltimaMensagem=paginaAtual * mensagensPorPagina
    const indexPrimeiraPagina=indexUltimaMensagem-mensagensPorPagina
    const mensagensVisiveis=mensagens.slice(indexPrimeiraPagina,indexUltimaMensagem)
    const totalPaginas=Math.ceil(mensagens.length/mensagensPorPagina)
            
        

    return(<div>
        <Menu/>
        <br/>
            <br/>
            <br/>
            <br/>
            <p className="saudacao">Olá, {nomeExplicando}</p>
            <h2 className="explicacoes">Fórum</h2>
            <br/>
            <br/>
            <p className="forum">Partilhe suas dúvidas, através de mensagens e ficheiros com a comunidade aqui no fórum que nós teremos todo o gosto em ajudar!</p>
            <br/>
            <form classname="forumUtilizadores" onSubmit={enviarMensagens}>
                <textarea className="inputMessage" placeholder="Escreva a sua mensagem..." 
                value={mensagem}
                onChange={(e)=>setMensagem(e.target.value)}></textarea>
                <br/>
                <input className="ficheiro" type="file" ref={inputFileRef} onChange={(e)=>setFicheiro(e.target.files[0])}/>
                
                <br/>
                <button className="enviar" type="submit">Enviar</button>

            </form>
            {erro && <p style={{color:"red",marginLeft:"50px"}}>{erro}</p>}
            <br/>

            <h3 className="tituloMensagens">Mensagens no Fórum:</h3>
            {mensagensVisiveis.map((m,idx)=>(
                <div className="messageArea" key={idx} style={{border:"1px solid gray"}}>
                <p className="nomeRemetente"><strong>{m.nome} </strong>escreveu em {new Date(m.criadoEm).toLocaleString("pt-PT",{
                    day:"2-digit",
                    month:"2-digit",
                    year:"numeric",
                    hour:"2-digit",
                    minute:"2-digit"
                })}:</p>
                <p className="mensagemForum">{m.mensagem}</p>
                {m.ficheiro && (
                <p className="ficheiroForum">
                    Ficheiro:<a href={`${process.env.REACT_APP_SERVER_URI}/uploads/${m.ficheiro}`}download>{m.ficheiro}</a>
                </p>
                )}
                </div>

            ))}
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
   
export default Forum