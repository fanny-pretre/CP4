import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminPensionnaires() {
  // Fetch initial race
  const [animals, setAnimals] = useState([]);
  const [races, setRaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAnimals = animals.filter((animal) =>
    `${animal.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchAnimalsAndRaces = async () => {
      try {
        const [animalsResponse, racesResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/animals`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/races`),
        ]);

        const racesMap = new Map();
        racesResponse.data.forEach((race) => {
          racesMap.set(race.id, race);
        });

        const animalsWithRaces = animalsResponse.data.map((animal) => ({
          ...animal,
          race: racesMap.get(animal.race_id),
        }));

        setAnimals(animalsWithRaces);
        setRaces(racesResponse.data);
      } catch (error) {
        console.error("Error fetching animals and races:", error);
      }
    };

    fetchAnimalsAndRaces();
  }, []);

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    age: "",
    gender: "",
    story: "",
    coming_date: "",
    status: "",
    personality: "",
    adoption_date: "",
    race_id: "",
    health_id: "",
    cohabitation_id: "",

    // Information de santé
    sterilisation: false,
    vaccination: false,
    identification: false,
    decontamination: false,
    background: "",
    observations: "",

    // Information sur la cohabitation
    human: "",
    cat: "",
    dog: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/animals`,
        formData
      );
      console.info("Animal added successfully:", response.data);
      // Optionally reset form fields or show a success message
      setFormData({
        image: "",
        name: "",
        age: "",
        gender: "",
        story: "",
        coming_date: "",
        status: "",
        personality: "",
        adoption_date: "",
        race_id: "",
        sterilisation: false,
        vaccination: false,
        identification: false,
        decontamination: false,
        background: "",
        observations: "",
        human: "",
        cat: "",
        dog: "",
      });
    } catch (error) {
      console.error("Error adding animal:", error);
      // Optionally handle errors (e.g., show error message to user)
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
    <>
      <div className="previous">
        <Link to="/admin">
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
      <h1> Ajouter un pensionnaire </h1>
      <form onSubmit={handleSubmit}>
        <details>
          <summary> Informations </summary>
          <div className="form-details">
            <div className="form-group">
              <label htmlFor="ImageURL">URL de l'image</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Nom de l'animal</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-50-50 ">
              <div className="form-group">
                <label htmlFor="age">Âge</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Genre </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Choisissez le genre</option>
                  <option value="M">Mâle</option>
                  <option value="F">Femelle</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="story"> Histoire </label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="arrival-date">Date d'arrivée </label>
              <input
                type="date"
                name="coming_date"
                value={formData.coming_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Statut </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez un statut</option>
                <option value="adopté">Adopté</option>
                <option value="à l'adoption">À l'adoption</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="personality">Personnalité </label>
              <input
                type="text"
                name="personality"
                value={formData.personality}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="race">Race </label>
              <select
                name="race_id"
                value={formData.race_id}
                onChange={handleChange}
                required
              >
                <option value="">Choisissez une race</option>
                {races.map((race) => (
                  <option key={race.id} value={race.id}>
                    {race.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </details>
        <details>
          <summary> Santé </summary>
          <div className="form-details">
            <div className="form-group-50-50">
              <div className="form-group-checkbox">
                <label htmlFor="sterilization">Sterilisation </label>
                <input
                  type="checkbox"
                  name="sterilisation"
                  checked={formData.sterilisation}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group-checkbox">
                <label htmlFor="vaccination">Vaccination </label>
                <input
                  type="checkbox"
                  name="vaccination"
                  checked={formData.vaccination}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group-50-50">
              <div className="form-group-checkbox">
                <label htmlFor="identification">Identification </label>
                <input
                  type="checkbox"
                  name="identification"
                  checked={formData.identification}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group-checkbox">
                <label htmlFor="decontamination">Decontamination </label>
                <input
                  type="checkbox"
                  name="decontamination"
                  checked={formData.decontamination}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="background">Passif </label>
              <textarea
                name="background"
                value={formData.background}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="observations">Observations </label>
              <input
                name="observations"
                type="text"
                value={formData.observations}
                onChange={handleChange}
              />
            </div>
          </div>
        </details>
        <details>
          <summary> Cohabitation </summary>
          <div className="form-details">
            <div className="form-group">
              <label htmlFor="humans">Humains </label>
              <input
                type="text"
                name="human"
                checked={formData.human}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cats">Chats </label>
              <input
                type="text"
                name="cat"
                checked={formData.cat}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dogs">Chiens </label>
              <input
                type="text"
                name="dog"
                checked={formData.dog}
                onChange={handleChange}
              />
            </div>
          </div>
        </details>
        <button type="submit">Ajouter ce pensionnaire</button>
      </form>

      <h1> Liste des pensionnaires </h1>
      <input
        type="text"
        placeholder="Rechercher des pensionnaires"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <ul className="admin-list">
        {filteredAnimals.map((animal) => (
          <Link to={`/admin/pensionnaires/edit/${animal.id}`} key={animal.id}>
            <li className="admin-item">
              <img src={animal.image} alt={`${animal.name}`} />
              <div className="admin-animals-infos">
                <h3>{animal.name}</h3>
                <p> {animal.race ? animal.race.name : "Unknown"} </p>
              </div>
              <button type="button"> Editer</button>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default AdminPensionnaires;
