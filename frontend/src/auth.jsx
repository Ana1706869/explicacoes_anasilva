export const isExplicador=()=>{
    return localStorage.getItem("tipoUsuario")==="Explicador"
}

export const isExplicando=()=>{
return localStorage.getItem("tipoUsuario")==="Explicando"
}