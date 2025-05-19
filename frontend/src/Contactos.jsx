
import Menu from "./Menu"
import { useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react"
import axios from "axios"
import {FaWhatsapp,FaFacebook,FaInstagram,FaLinkedin} from "react-icons/fa"
const  Contactos=()=>{
    const [nomeExplicando,setNomeExplicando]=useState("")
        const [explicandoId, setExplicandoId]=useState("")
        const [erro,setErro]=useState("")

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
    
            axios.get(`http://localhost:9090/explicandos/${emailLogin}`).then (response =>{
                console.error("Resposta do backend:",response.data)
                setNomeExplicando(response.data.nome)
                setExplicandoId(response.data.explicandoId)
                
    
            })
            .catch(error=>console.error("Erro ao obter o explicando:",error))
        },[])

    return(<div>
        <Menu/>
        <br/>
            <br/>
            <br/>
            <br/>
            <p className="saudacao">Olá, {nomeExplicando}</p>
            <h2 className="explicacoes">Contactos</h2>
            <br/>
            <br/>
            <div className="container">
      {/* Coluna 1: Dados de contato */}
      <div className="coluna">
        
        <p><strong>Nome:</strong> Ana Catarina Nascimento Matias Silva</p>
        <p><strong>Morada:</strong> Rua Padre Matos nº1 6400-449 Pinhel (Guarda)</p>
        <p><strong>Telefone:</strong> 917071858</p>
        <p><strong>Email:</strong> anasilva_pinhel@hotmail.com</p>
      </div>

      {/* Coluna 2: Mapa e redes sociais */}
      <div className="coluna">
        <h2>Localização</h2>
        
          
        <iframe title="Google Maps"
          className="mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.384647508261!2d-7.073451924498266!3d40.775557133723105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3c6049ce37a6ad%3A0x89412a70f8bc1b5b!2sR.%20Padre%20Matos%2C%20Pinhel!5e0!3m2!1spt-PT!2spt!4v1746741767189!5m2!1spt-PT!2spt" width="600" height="450"  allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        

        <div className="redesSociais">
          <div className="rede">
            <FaWhatsapp size={30} color="#25D366" />
            <a href="https://wa.me/351917071858" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <div className="rede">
            <FaLinkedin size={30} color="#25D366" />
            <a href="https://www.linkedin.com/in/ana-silva-24ab7394/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="rede">
            <FaFacebook size={30} color="#1877F2" />
            <a href="https://www.facebook.com/anasilva.pinhel?locale=pt_PT" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
          <div className="rede">
            <FaInstagram size={30} color="#C13584" />
            <a href="https://www.instagram.com/anasilva_pinhel/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      </div>

      
        
    </div>)
}
   
export default Contactos