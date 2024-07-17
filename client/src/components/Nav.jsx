import { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
// eslint-disable-next-line import/no-extraneous-dependencies
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Nav() {
  const { setAuth } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="header">
      <div className="nav-visible">
        <ul>
          <img
            src="https://www.wanimo.com/veterinaire/wp-content/uploads/2015/07/images_articles_lapin_lapin-regarde@2x.jpg"
            alt="logo"
            className="logo"
          />
          <li className="nav-li">
            <Link to="/">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 9.185l7 6.514v6.301h-3v-5h-8v5h-3v-6.301l7-6.514zm0-2.732l-9 8.375v9.172h7v-5h4v5h7v-9.172l-9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
              </svg>
              Accueil
            </Link>
          </li>
          <li className="nav-li">
            <Link to="/adoption">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M8.983 10.232c.139.49-.186 1.014-.729 1.169-.542.154-1.094-.119-1.235-.61-.14-.491.187-1.014.729-1.168.543-.155 1.094.118 1.235.609zm12.017 10.781c0 1.655-1.317 2.987-3.281 2.987h-10.781c-3.07 0-3.656-3.875-1.266-4.75-.63-.792-.806-1.903-.427-3.303.298-1.107.024-1.292-.708-1.784-.588-.396-1.537-1.033-1.537-2.372 0-1.825 1.422-4.241 3.85-5.261 1.375-.578 1.815-1.397 2.422-2.53.271-.506.578-1.079.995-1.659 1.389-1.935 2.699-2.341 3.554-2.341.73 0 1.408.296 1.91.833.273.292.478.639.604 1.011.869.179 1.564.702 1.924 1.475.469 1.008.275 2.254-.507 3.253-.425.543-.999 1.05-1.606 1.586-.828.732-1.963 1.734-1.918 2.343.021.288.375.67.969 1.05 2.627 1.681 4.061 3.909 4.373 6.799.914.691 1.43 1.659 1.43 2.663zm-2.836-1.219c-.286-.166-.473-.47-.493-.808-.146-2.372-1.46-4.582-3.637-5.837-1.143-.659-1.676-1.553-1.746-2.495-.121-1.619 1.318-2.891 2.59-4.013.537-.475 1.046-.924 1.359-1.324.75-.96.121-1.679-.664-1.447-1.072.317-2.451 2.013-3.135 2.739.605-.793 1.709-2.456 2.015-3.448.294-.958-.437-1.57-1.493-.823-.866.613-1.484 1.695-1.982 2.626-.679 1.264-1.379 2.571-3.391 3.417-1.648.693-3.516 3.078-1.984 4.107.668.449 1.7 1.143 1.7 2.736 0 1.001-.958 2.541.683 4.572-2.314.485-2.048 2.204-1.071 2.204h2.144c-.499-1.581.271-3.521 2.192-3.521-.08-1.008.084-3.25 3.125-4.292-3.291 2.458-.838 6.119.396 6.729-1.236-.478-2.069-.712-2.631-.765-1.592-.148-1.548 1.849-.364 1.849h5.942c1.551 0 1.814-1.413.445-2.206z" />
              </svg>
              Adoption
            </Link>
          </li>
          <li className="nav-li">
            <Link to="/adopted">
              {" "}
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 23h-6v-6.065c.626-.155 1.04-.496 1.319-1.046 2.152.773 3.647-2.303 1.819-3.556.949-1.116.245-2.727-1.207-2.522-.698-2.361-4.151-2.379-4.85 0-1.405-.227-2.186 1.199-1.385 2.289-1.648 1.404-.105 4.036 1.872 3.467.217.703.78 1.184 1.432 1.357v6.076h-2v-4.877c-.304-.239-.551-.515-.546-.51-2.001-.266-3.454-2.114-3.454-4.069 0-.583.129-1.173.41-1.735-.322-1.653.654-3.337 2.356-3.874l.018-.006c.827-1.162 2.152-1.823 3.517-1.893l5.682-5.036 12.017 10.647-1.33 1.491-10.687-9.469-3.284 2.908c.308.164.595.36.855.59l2.419-2.149c1.126.998 2.255 1.995 3.384 2.993l2.258 1.994 3.385 2.995v10h-6v-5h-2v5zm-2-5.585c-.713.445-1.259.529-2 .585v3h2v-3.585zm1.415-1.406l4.585-.009v5h2v-7.117l-7.027-6.196-.813.72c1.124.795 1.697 2.21 1.351 3.614.646 1.147.669 2.693-.096 3.988m-5.962-3.688c1.495-1.022 3.241.769 2.302 2.224.002-1.472-.852-2.279-2.302-2.224m-2.118 1.19c-1.247-1.865 1.004-4.164 2.904-2.894-1.892-.032-2.946 1.043-2.904 2.894" />
              </svg>
              Adoptés
            </Link>
          </li>
          {/* <li className="nav-li">
          <Link to="/">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M17.867 3.493l4.133 3.444v5.127l-10 8.333-10-8.334v-5.126l4.133-3.444 5.867 3.911 5.867-3.911zm.133-2.493l-6 4-6-4-6 5v7l12 10 12-10v-7l-6-5z" />
            </svg>
            S'engager
          </Link>
        </li> */}
        </ul>
        <li className="nav-button">
          <button
            type="button"
            className="nav-button"
            onClick={toggleProfileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"
                fill="white"
              />
            </svg>
            Profil
          </button>
        </li>
      </div>
      {showProfileMenu && (
        <div className="nav-open">
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
                Administrateur
              </button>
            </Link>
          )}
          {sub && role !== 1 && (
            <Link to="/admin">
              <button type="button" className="btn-secondary">
                Profil
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Nav;
