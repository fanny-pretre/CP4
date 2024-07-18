import axios from "axios";
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
// eslint-disable-next-line import/no-extraneous-dependencies
import { jwtDecode } from "jwt-decode";
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
      alert("Contact request submitted successfully!");
    } catch (error) {
      console.error("Error submitting contact request:", error);
      alert("Failed to submit contact request.");
    }
  };

  if (loading) return <p>Chargement...</p>; // Display loading message

  if (!animal) return <p>Pas d'animal trouvé</p>; // Handle case where no animal is found

  return (
    <div className="animal-details">
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
        <div className="details">
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
            {animal.coming_date}
          </p>
          <p>
            {" "}
            <strong> Personnalité : </strong> {animal.personality}
          </p>
          <p>
            <strong> Date d'adoption : </strong>{" "}
            {animal.adoption_date ? animal.adoption_date : "Non adopté"}
          </p>
          <p>
            {" "}
            <strong>Race : </strong> {animal.race_name}
          </p>
        </div>
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
            {" "}
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.623 18.244l-2.285.728c-.63.194-.936-.751-.303-.954l2.284-.727c.635-.198.931.753.304.953zm-.291-1.718l-3.47-1c-.641-.183-.352-1.15.277-.961l3.471 1c.642.185.351 1.147-.278.961zm13.331 2.446l-2.285-.728c-.63-.201-.329-1.15.303-.953l2.284.727c.633.203.326 1.151-.302.954zm1.476-3.446l-3.471 1c-.632.185-.915-.777-.277-.961l3.471-1c.635-.185.913.779.277.961zm-4.639-3.526c-.551 0-1-.448-1-1s.449-1 1-1c.552 0 1 .448 1 1s-.448 1-1 1zm2-1c0-1.105-.896-2-2-2-1.103 0-2 .895-2 2 0 1.104.897 2 2 2 1.104 0 2-.896 2-2zm-11 1c-.551 0-1-.448-1-1s.449-1 1-1c.552 0 1 .448 1 1s-.448 1-1 1zm2-1c0-1.105-.896-2-2-2s-2 .895-2 2c0 1.104.896 2 2 2s2-.896 2-2zm5.956 7.35c-.547 1.215-2.47 1.831-3.456.543-.987 1.289-2.91.671-3.456-.543-.271-.6.64-1.014.912-.41.336.746 2.034 1.301 2.044-.797v-.504c-.615-.218-1.061-.798-1.061-1.313 0-.646.699-.936 1.561-.936.863 0 1.562.29 1.562.936 0 .515-.446 1.095-1.062 1.313v.504c.009 2.12 1.713 1.533 2.044.797.271-.602 1.184-.192.912.41zm-3.456 4.65c-7.093 0-11-3.351-11-9.435 0-3.774 1.563-8.027 4.419-12.072 1.746 1.658 2.505 2.723 3.958 4.91 2.418-.609 3.786-.361 5.251-.004 1.431-2.167 2.219-3.304 3.944-4.914 2.825 4.032 4.428 8.385 4.428 12.08 0 6.084-3.906 9.435-11 9.435zm6.728-23c-2.082 1.814-3.081 3.044-4.546 5.261-1.289-.316-3.281-.274-4.363 0-1.402-2.11-2.405-3.344-4.546-5.261-3.069 4.042-5.273 8.939-5.273 13.565 0 5.759 3.397 10.435 12 10.435 8.604 0 12-4.676 12-10.435 0-4.578-2.207-9.502-5.272-13.565z"
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
