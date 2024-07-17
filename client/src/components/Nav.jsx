// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
// eslint-disable-next-line import/no-extraneous-dependencies
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Nav() {
  const { setAuth } = useAuth();

  const authData = Cookies.get("authData");
  let role = null;
  let sub = null;

  if (authData) {
    const authDecoded = jwtDecode(authData);
    role = authDecoded.role;
    sub = authDecoded.sub;
  }

  const clearCookies = () => {
    Cookies.remove("authData");
    setAuth(null);
  };

  return (
    <div className="header">
      <div className="header-top-bar">
        <div className="cta-buttons-wrapper">
          {!sub ? (
            <>
              <Link to="/register">
                <button type="button">Inscription</button>
              </Link>
              <Link to="/login">
                <button type="button" className="btn-secondary">
                  Connexion
                </button>
              </Link>
            </>
          ) : (
            <Link to="/" onClick={clearCookies}>
              <button type="button" className="btn-secondary">
                Déconnexion
              </button>
            </Link>
          )}

          {sub && role !== 2 && (
            <Link to="/admin">
              <button type="button" className="btn-secondary">
                Admin
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="header-nav-bar">
        <ul className="list-unstyled main-top-navi">
          <li className="mobile-nav-link">
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/adoption">A l'adoption</Link>
          </li>
          <li>
            <Link to="/adopted">Ils sont passés par ici</Link>
          </li>
          <li>
            <Link to="/">S'engager</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
