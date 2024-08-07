import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
// eslint-disable-next-line import/no-extraneous-dependencies
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/AuthContext";

function Profil() {
  const [user, setUser] = useState(null);
  const { setAuth } = useAuth();

  const authData = Cookies.get("authData");
  let sub = null;

  if (authData) {
    const authDecoded = jwtDecode(authData);
    sub = authDecoded.sub;
  }

  const clearCookies = () => {
    Cookies.remove("authData");
    setAuth(null);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${sub}`,
          {
            headers: {
              Authorization: `Bearer ${authData}`, // Inclure le JWT dans l'en-tête Authorization
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (sub) {
      fetchUserData();
    }
  }, [sub, authData]);

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="profile-flex">
      <h1> Bonjour {user.firstname} ! </h1>
      <div className="animal-header">
        <h2>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M13 16h-2v-6h2v6zm-1-10.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zm0-2.75c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z"
              fill="#8c034e"
            />
          </svg>{" "}
          Mes informations
        </h2>
      </div>
      <p>
        <strong> Prénom :</strong> {user.firstname}
      </p>
      <p>
        <strong> Nom :</strong> {user.lastname}
      </p>
      <p>
        <strong> Email : </strong> {user.email}
      </p>
      <p>
        <strong>Téléphone :</strong> {user.telephone}
      </p>
      <p>
        <strong>Adresse :</strong> {user.address}
      </p>
      <p>
        <strong>Code postal :</strong> {user.zip_code}
      </p>
      <p>
        <strong>Ville :</strong> {user.city}
      </p>
      <Link to="/" onClick={clearCookies}>
        <button type="button">Déconnexion</button>
      </Link>
    </div>
  );
}

export default Profil;
