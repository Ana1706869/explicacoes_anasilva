import {useState} from "react"
import {useNavigate} from "react-router-dom"
import Explicacoes from "./Explicacoes"
import Registo from "./Registo"
import React from "react"
import reactLogo from "./assets/React.jpg"
import axios from "axios"




const Home=()=>{
    const [formData, setFormData]=useState({email:"", password:""})
    const[erro,setErro]=useState()
    const navigate=useNavigate()

    const handleChange=(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}


    const handleSubmit=async(e)=>{e.preventDefault()

        if(!formData.email ||!formData.password){
            setErro("Todos os campos são obrigatórios!")
            return
        }
        try{
            const response=await axios.post(`${process.env.REACT_APP_SERVER_URI}/login`,{
                email:formData.email,
                password:formData.password,
            })
            if(response.data.sucesso){
                localStorage.setItem("emailUsuario",formData.email)
                localStorage.setItem("explicandoId", response.data.user.explicandoId)
                limparCampos()
                if(formData.email==="anasilva_pinhel@hotmail.com"){
                    localStorage.setItem("tipoUsuario","Explicador")
                    navigate("/ExplicacoesOnline")
                }else{
                    localStorage.setItem("tipoUsuario","Explicando")
                    navigate("/explicacoes")
                }
                
            }else{
                setErro("Login falhou! Verifique suas credenciais!")
            }
        }catch(error){
            
            console.error("Erro ao fazer login", error)
            limparCampos()
            setErro("Erro ao fazer login. Tente novamente.")
            
        }
        
            }


             const limparCampos=()=>{
                setFormData({email:"",password:""})
                setErro(null)
           
        }
            
                
        

        
        
        return(<div className="login-container">
            <h1 className="Login">Ana Silva- Explicacões de Programação</h1>
            <br/>
            <br/>
            <p className="Text">
                Olá a todos! O meu nome é Ana Silva, sou Licenciada em Engenharia Informática e domino as mais diversas linguagens de programação, desde JAVA, Python, Kotlin, Assembly, C#, Prolog, Javascript e SAP. Também tenho conhecimentos em bases de dados como SQL, Airtable e MongoDb.
            </p>
            <p>
                Se quiser esclarecer dúvidas de programação, seja para exames, certificações, projetos empresariais ou simplesmente prazer em enriquecer-se profissionalmente, basta só fazer o login, marcar que um encontro que eu terei todo o gosto em esclarecer suas dúvidas, quer presencialmente, quer remotamente através de explicações online e fóruns aqui neste site.
    
            </p>
            <p> Caso ainda não esteja registado, clique no link de registo, faça o seu registo e embarque nesta aventura fantástica! </p>
    <br/>
    <br/>
            <img src={reactLogo} className="image"/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>Login</h2>
            <br/>
            <form onSubmit={handleSubmit} autoComplete="off">
                <label>
                    Nome de Utilizador:
                    <input className="utilizador" type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    />

                </label>
                <br/>
                <br/>
                <label>
                    Palavra-passe: 
                    <input className="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    />
                </label>
                <br/>
                <br/>
                <button type="submit" >Login</button>
            </form>
            {erro && <p style={{color: "red"}}>{erro}</p>}
            <p>

                <a href="/registo" className="Link" style={{color:"blue"}}>Se ainda não estiver registado clique aqui para se registar</a>
            </p>

        </div>)
    }

export default Home