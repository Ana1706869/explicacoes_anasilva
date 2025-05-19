import {useState,useEffect} from "react"
import Home from "./Home"
import {useNavigate} from "react-router-dom"




const  Registo=()=>{
    const [formData,setFormData]=useState({
        nome:"",
        email:"",
        password:"",
    })
    const [erro,setErro]=useState("")
    const navigate=useNavigate()
    

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
        
        
            
        
    }

    const handleSubmit=async (e)=>{e.preventDefault();
        

        if(!formData.nome || !formData.email || !formData.password){
            setErro("Todos os campos são obrigatórios!")
            return
        }
        try{
        const response= await fetch(`${process.env.REACT_APP_SERVER_URI}/registo`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formData)
            
            })
            limparCampos()
        
            const data=await response.json()
            
           if (!response.ok){
            throw new Error(data.message ||"Utilizador já registado!")
           }
           
           alert("Registo feito com sucesso!")
           
          
           navigate("/")
           
        }catch(error){
            limparCampos()
            setErro(error.message)
            
        }

        
        }

        const limparCampos=()=>{
                setFormData({ nome: "",email:"",password:""})
                setErro(null)
        }

        

        return(
            <div className="Registo">
                <h2 className="Registo-titulo">Registo</h2>
                <br>
                </br>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <label>
                        Nome: <span style={{color: "red"}}> *</span>
                    </label>
                    <input className="nome"
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        autoComplete="off"
                        required/>
                    <br/>
                    <br/>
                    <label>
                        E-mail: <span style={{color: "red"}}> *</span>
                
                    </label>
                    <input className="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="off"
                        required 
                        />
                    <br/>
                    <br/>
                    <label>
                        Palavra-passe: <span style={{color: "red"}}> *</span>
                        
                        
                    </label>
                    <input className="pass"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                        />
                    <br/>
                    <br/>
                    <p style={{color:"red"}}>* Campos de preenchimento obrigatório</p>
                    <button type="submit">Registar</button>

                    
                </form>
                {erro && <p style={{color:"red"}}>{erro}</p>}
            </div>
        )



}
export default Registo