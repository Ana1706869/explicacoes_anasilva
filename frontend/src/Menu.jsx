import { Link } from "react-router-dom";
import { isExplicador, isExplicando } from "./auth";

const Menu = () => {
  return (
    <nav className="Menu">
      <ul>
        {/* Os links de gestão e marcação variam conforme o papel guardado na sessão. */}
        {isExplicando() && (
          <li>
            <Link to="/Explicacoes">Marcação de Explicações</Link>
          </li>
        )}

        <li>
          <Link
            to={
              isExplicador()
                ? "/ExplicacoesConfirmadasExplicador"
                : "/ExplicacoesConfirmadasExplicando"
            }
          >
            Explicações Online
          </Link>
        </li>
        {isExplicador() && (
          <li>
            <Link to="/ExplicacoesPendentes">Explicações Pendentes</Link>
          </li>
        )}

        {isExplicador() && (
          <li>
            {" "}
            <Link to="/ExplicacoesConfirmadasExplicador">
              Lista de Explicações
            </Link>
          </li>
        )}
        {isExplicando() && (
          <li>
            <Link to="/ExplicacoesConfirmadasExplicando">
              Lista de Explicações
            </Link>
          </li>
        )}

        <li>
          <Link to="/Forum">Fórum</Link>
        </li>

        {isExplicando() && (
          <li>
            <Link to="/Contactos">Contactos</Link>
          </li>
        )}

        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
