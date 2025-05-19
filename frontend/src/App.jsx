import React from 'react'
import Registo from  "./Registo"
import Home from "./Home"
import { BrowserRouter  as Router,Routes,Route} from "react-router-dom"
import Explicacoes from "./Explicacoes"
import ExplicacoesPendentes from './ExplicacoesPendentes'
import ExplicacoesConfirmadasExplicador from './ExplicacoesConfirmadasExplicador'
import ExplicacoesConfirmadasExplicando from './ExplicacoesConfirmadasExplicando'
import ExplicacoesOnline from './ExplicacoesOnline'
import Forum from './Forum'
import Contactos from './Contactos'
import Menu from './Menu'
import Multibanco from './Multibanco'
import TransferenciaBancaria from './TransferenciaBancaria'
import MBWAy from './MBWay'
import EditarExplicacao from './EditarExplicacao'
import {Helmet} from "react-helmet"
import {useEffect} from "react"





const App=()=>{

    useEffect(()=>{
    document.title="Ana Silva-Explicações"
},[])
    return(
    <Router>
        
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Registo" element={<Registo/>}/>
            <Route path="/Explicacoes" element={<Explicacoes/>}/>
            <Route path="/Multibanco" element={<Multibanco/>}/>
            <Route path="/TransferenciaBancaria" element={<TransferenciaBancaria/>}/>
            <Route path="/MBWay" element={<MBWAy/>}/>
            <Route path="/ExplicacoesPendentes" element={<ExplicacoesPendentes/>}/>
            <Route path="/ExplicacoesConfirmadasExplicador" element={<ExplicacoesConfirmadasExplicador/>}/>
            <Route path="/ExplicacoesConfirmadasExplicando" element={<ExplicacoesConfirmadasExplicando/>}/>
            <Route path="/ExplicacoesOnline" element={<ExplicacoesOnline/>}/>
            <Route path="/Forum" element={<Forum/>}/>
            <Route path="/Contactos" element={<Contactos/>}/>
            <Route path="/EditarExplicacao/:id" element={<EditarExplicacao/>}/>
            
            


        </Routes>

    </Router>

    )
}
export default App
