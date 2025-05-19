import React from "react"
import {Link} from "react-router-dom"
import Explicacoes from "./Explicacoes"
import ExplicacoesOnline from "./ExplicacoesOnline"
import ExplicacoesPendentes from "./ExplicacoesPendentes"
import ExplicacoesConfirmadasExplicador from "./ExplicacoesConfirmadasExplicador"
import ExplicacoesConfirmadasExplicando from "./ExplicacoesConfirmadasExplicando"
import Forum from "./Forum"
import Contactos from "./Contactos"
import { isExplicador,isExplicando } from "./auth"



const  Menu=()=>{

    return(<nav className="Menu">
        <ul>
            
                {isExplicando() &&(<li><Link to="/Explicacoes">Marcação de Explicações</Link>
            </li>)}
                
            <li>
                <Link to="/ExplicacoesOnline">Explicações Online</Link>
            </li>
            {isExplicador() && (<li><Link to="/ExplicacoesPendentes">Explicações Pendentes</Link>
            </li>)}
                
            
                {isExplicador() && (<li> <Link to="/ExplicacoesConfirmadasExplicador">Lista de Explicações</Link>

            </li>) }
                {isExplicando() && (<li><Link to="/ExplicacoesConfirmadasExplicando">Lista de Explicações</Link></li>)}
           
            <li>
                <Link to="/Forum">Fórum</Link>
            </li>
            
                {isExplicando() && (<li><Link to="/Contactos">Contactos</Link>
            </li>)}
               
            <li>
                <Link to ="/">Logout</Link>
            </li>
        </ul>

    </nav>
    )
}
   
export default Menu