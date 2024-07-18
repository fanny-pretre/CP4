import axios from "axios";
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
// eslint-disable-next-line import/no-extraneous-dependencies
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function AnimalId() {
  const { id } = useParams(); // Get the animal ID from the URL

  const authData = Cookies.get("authData");
  let sub = null;

  if (authData) {
    const authDecoded = jwtDecode(authData);
    sub = authDecoded.sub;
  }

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchAllInfos = async () => {
      try {
        const animalResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/animals/${id}/infos`
        );

        setAnimal(animalResponse.data);
      } catch (error) {
        console.error("Error fetching animal and races:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAllInfos();
  }, [id]);

  const handleContactRequest = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contacts`, {
        animal_id: id,
        user_id: sub,
      });
      toast(" 🐇 Demande d'information envoyée !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error submitting contact request:", error);
      toast.error(" 🐇 Erreur lors de la demande d'information !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (loading) return <p>Chargement...</p>; // Display loading message

  if (!animal) return <p>Pas d'animal trouvé</p>; // Handle case where no animal is found

  return (
    <div className="animal-details">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <div className="previous">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z" />
          </svg>
        </Link>
      </div>
      <h1>Découvrez {animal.name} !</h1>
      <div className="animal-info">
        <img src={animal.image} alt={animal.name} />
        <div className="animal-label">
          {" "}
          <p>{animal.status.toUpperCase()}</p>
        </div>
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
            </svg>
            Informations de l'animal
          </h2>
        </div>
        <p>
          <strong> Nom :</strong> {animal.name}
        </p>
        <p>
          {" "}
          <strong>Âge : </strong> {animal.age} ans
        </p>
        <p>
          <strong> Genre : </strong> {animal.gender}
        </p>
        <p>
          {" "}
          <strong> Histoire : </strong> {animal.story}
        </p>
        <p>
          {" "}
          <strong> Date d'arrivée : </strong>
          {new Date(animal.coming_date).toLocaleDateString()}
        </p>
        <p>
          {" "}
          <strong> Personnalité : </strong> {animal.personality}
        </p>
        <p>
          <strong> Date d'adoption : </strong>{" "}
          {animal.adoption_date
            ? new Date(animal.adoption_date).toLocaleDateString()
            : "Non adopté"}
        </p>
        <p>
          {" "}
          <strong>Race : </strong> {animal.race_name}
        </p>
      </div>
      <div className="health-info">
        <div className="animal-header">
          <h2>
            {" "}
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 6c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2h-20c-1.104 0-2-.896-2-2v-12c0-1.104.896-2 2-2h5v-2c0-1.104.896-2 2-2h6c1.104 0 2 .896 2 2v2h5zm0 2.5c0-.276-.224-.5-.5-.5h-19c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h19c.276 0 .5-.224.5-.5v-11zm-9 4.5h3v2h-3v3h-2v-3h-3v-2h3v-3h2v3zm1.5-9h-5c-.276 0-.5.224-.5.5v1.5h6v-1.5c0-.276-.224-.5-.5-.5"
                fill="#8c034e"
              />
            </svg>
            Fiche Santé
          </h2>
        </div>
        <details>
          <div className="form-details">
            <p>
              <strong>Stérilisation : </strong>
              {animal.sterilisation ? "Oui" : "Non"}
            </p>
            <p>
              <strong>Vaccination : </strong>{" "}
              {animal.vaccination ? "Oui" : "Non"}
            </p>
            <p>
              <strong>Identification : </strong>
              {animal.identification ? "Oui" : "Non"}
            </p>
            <p>
              <strong>Décontamination :</strong>{" "}
              {animal.decontamination ? "Oui" : "Non"}
            </p>
            <p>
              <strong>Antécédents médicaux : </strong> {animal.background}
            </p>
            <p>
              <strong>Observations :</strong> {animal.observations}
            </p>
          </div>
        </details>
      </div>
      <div className="cohabitation-info">
        <div className="animal-header">
          <h2>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.954 11c3.33 0 7.057 6.123 7.632 8.716.575 2.594-.996 4.729-3.484 4.112-1.092-.271-3.252-1.307-4.102-1.291-.925.016-2.379.836-3.587 1.252-2.657.916-4.717-1.283-4.01-4.073.774-3.051 4.48-8.716 7.551-8.716zm10.793-4.39c1.188.539 1.629 2.82.894 5.27-.704 2.341-2.33 3.806-4.556 2.796-1.931-.877-2.158-3.178-.894-5.27 1.274-2.107 3.367-3.336 4.556-2.796zm-21.968.706c-1.044.729-1.06 2.996.082 5.215 1.092 2.12 2.913 3.236 4.868 1.87 1.696-1.185 1.504-3.433-.082-5.215-1.596-1.793-3.824-2.599-4.868-1.87zm15.643-7.292c1.323.251 2.321 2.428 2.182 5.062-.134 2.517-1.405 4.382-3.882 3.912-2.149-.407-2.938-2.657-2.181-5.061.761-2.421 2.559-4.164 3.881-3.913zm-10.295.058c-1.268.451-1.92 2.756-1.377 5.337.519 2.467 2.062 4.114 4.437 3.269 2.06-.732 2.494-3.077 1.377-5.336-1.125-2.276-3.169-3.721-4.437-3.27z"
                fill="#8c034e"
              />
            </svg>
            Informations de cohabitation
          </h2>
        </div>
        <details>
          <div className="form-details">
            <p>
              <strong>Humain : </strong> {animal.human}
            </p>
            <p>
              <strong>Chat : </strong> {animal.cat}
            </p>
            <p>
              <strong>Chien : </strong> {animal.dog}
            </p>
          </div>
        </details>
      </div>
      {authData ? (
        <button type="button" onClick={handleContactRequest}>
          Demande d'informations
        </button>
      ) : (
        <div className="contact-request">
          <button
            type="button"
            className="btn-grey"
            onClick={handleContactRequest}
            disabled
          >
            Demande d'informations
          </button>
          <p>
            <Link to="/login">Connectez-vous</Link>pour effectuer une demande
            d'informations
          </p>
        </div>
      )}
    </div>
  );
}

export default AnimalId;
