import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="header">
      <div className="header-top-bar">
        <div className="cta-buttons-wrapper">
          <Link to="/register">
            <button type="button">Inscription </button>
          </Link>
          <Link to="/login">
            {" "}
            <button type="button" className="btn-secondary">
              Connexion{" "}
            </button>
          </Link>
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
