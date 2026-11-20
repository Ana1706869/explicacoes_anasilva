export const isExplicador = () => {
  return sessionStorage.getItem("tipoUsuario") === "Explicador";
};

export const isExplicando = () => {
  return sessionStorage.getItem("tipoUsuario") === "Explicando";
};
