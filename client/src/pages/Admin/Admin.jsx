import { Link } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
// eslint-disable-next-line import/no-extraneous-dependencies
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/AuthContext";

function Admin() {
  const authData = Cookies.get("authData");
  let firstname = null;

  const { setAuth } = useAuth();

  if (authData) {
    const authDecoded = jwtDecode(authData);
    firstname = authDecoded.firstname;
  }

  const clearCookies = () => {
    Cookies.remove("authData");
    setAuth(null);
  };

  return (
    <section className="admin-Content">
      <div className="admin-Header">
        <h1>Bonjour {firstname} !</h1>
      </div>

      <nav className="admin-nav">
        <ul className="admin-list">
          <Link to="/admin/pensionnaires">
            <li className="admin-list-items">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M8.983 10.232c.139.49-.186 1.014-.729 1.169-.542.154-1.094-.119-1.235-.61-.14-.491.187-1.014.729-1.168.543-.155 1.094.118 1.235.609zm12.017 10.781c0 1.655-1.317 2.987-3.281 2.987h-10.781c-3.07 0-3.656-3.875-1.266-4.75-.63-.792-.806-1.903-.427-3.303.298-1.107.024-1.292-.708-1.784-.588-.396-1.537-1.033-1.537-2.372 0-1.825 1.422-4.241 3.85-5.261 1.375-.578 1.815-1.397 2.422-2.53.271-.506.578-1.079.995-1.659 1.389-1.935 2.699-2.341 3.554-2.341.73 0 1.408.296 1.91.833.273.292.478.639.604 1.011.869.179 1.564.702 1.924 1.475.469 1.008.275 2.254-.507 3.253-.425.543-.999 1.05-1.606 1.586-.828.732-1.963 1.734-1.918 2.343.021.288.375.67.969 1.05 2.627 1.681 4.061 3.909 4.373 6.799.914.691 1.43 1.659 1.43 2.663zm-2.836-1.219c-.286-.166-.473-.47-.493-.808-.146-2.372-1.46-4.582-3.637-5.837-1.143-.659-1.676-1.553-1.746-2.495-.121-1.619 1.318-2.891 2.59-4.013.537-.475 1.046-.924 1.359-1.324.75-.96.121-1.679-.664-1.447-1.072.317-2.451 2.013-3.135 2.739.605-.793 1.709-2.456 2.015-3.448.294-.958-.437-1.57-1.493-.823-.866.613-1.484 1.695-1.982 2.626-.679 1.264-1.379 2.571-3.391 3.417-1.648.693-3.516 3.078-1.984 4.107.668.449 1.7 1.143 1.7 2.736 0 1.001-.958 2.541.683 4.572-2.314.485-2.048 2.204-1.071 2.204h2.144c-.499-1.581.271-3.521 2.192-3.521-.08-1.008.084-3.25 3.125-4.292-3.291 2.458-.838 6.119.396 6.729-1.236-.478-2.069-.712-2.631-.765-1.592-.148-1.548 1.849-.364 1.849h5.942c1.551 0 1.814-1.413.445-2.206z" />
              </svg>
              <h3>Mes pensionnaires</h3>
              <p>Retrouvez ici la liste de tous vos pensionnaires</p>
            </li>
          </Link>
          <Link to="/admin/utilisateurs">
            <li className="admin-list-items">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10.119 16.064c2.293-.53 4.427-.994 3.394-2.946-3.147-5.941-.835-9.118 2.488-9.118 3.388 0 5.643 3.299 2.488 9.119-1.065 1.964 1.149 2.427 3.393 2.946 1.985.458 2.118 1.428 2.118 3.107l-.003.828h-1.329c0-2.089.083-2.367-1.226-2.669-1.901-.438-3.695-.852-4.351-2.304-.239-.53-.395-1.402.226-2.543 1.372-2.532 1.719-4.726.949-6.017-.902-1.517-3.617-1.509-4.512-.022-.768 1.273-.426 3.479.936 6.05.607 1.146.447 2.016.206 2.543-.66 1.445-2.472 1.863-4.39 2.305-1.252.29-1.172.588-1.172 2.657h-1.331c0-2.196-.176-3.406 2.116-3.936zm-10.117 3.936h1.329c0-1.918-.186-1.385 1.824-1.973 1.014-.295 1.91-.723 2.316-1.612.212-.463.355-1.22-.162-2.197-.952-1.798-1.219-3.374-.712-4.215.547-.909 2.27-.908 2.819.015.935 1.567-.793 3.982-1.02 4.982h1.396c.44-1 1.206-2.208 1.206-3.9 0-2.01-1.312-3.1-2.998-3.1-2.493 0-4.227 2.383-1.866 6.839.774 1.464-.826 1.812-2.545 2.209-1.49.345-1.589 1.072-1.589 2.334l.002.618z" />
              </svg>
              <h3>Mes utilisateurs</h3>
              <p>
                Retrouvez ici toutes les informations concernant vos
                utilisateurs
              </p>
            </li>
          </Link>
          <Link to="/admin/contacts">
            <li className="admin-list-items">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 24h-12c-1.104 0-2-.896-2-2v-20c0-1.104.896-2 2-2h12c1.104 0 2 .896 2 2v20c0 1.104-.896 2-2 2zm1-5.083h-14v3.083c0 .552.449 1 1 1h12c.552 0 1-.448 1-1v-3.083zm-7 3c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm7-17h-14v13h14v-13zm-1-3.917h-12c-.551 0-1 .449-1 1v1.917h14v-1.917c0-.551-.448-1-1-1zm-4.5 1.917h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3c.276 0 .5.224.5.5s-.224.5-.5.5z" />
              </svg>
              <h3>Mes demandes de contact</h3>
              <p>Retrouvez ici toutes vos demandes de contact</p>
            </li>
          </Link>
          <Link to="/" onClick={clearCookies}>
            <button type="button">Déconnexion</button>
          </Link>
        </ul>
      </nav>
    </section>
  );
}

export default Admin;
