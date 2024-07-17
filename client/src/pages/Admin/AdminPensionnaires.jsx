import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminPensionnaires() {
  // Fetch initial race
  const [animals, setAnimals] = useState([]);
  const [races, setRaces] = useState([]);

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
  });

  console.info(formData);

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
      <h1> Ajouter un pensionnaire </h1>
      <form onSubmit={handleSubmit}>
        <details open>
          <summary> Informations </summary>
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </label>
          <br />
          <label>
            Story:
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Coming Date:
            <input
              type="date"
              name="coming_date"
              value={formData.coming_date}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Status:
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Personality:
            <input
              type="text"
              name="personality"
              value={formData.personality}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Race:
            <select
              name="race_id"
              value={formData.race_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Race</option>
              {races.map((race) => (
                <option key={race.id} value={race.id}>
                  {race.name}
                </option>
              ))}
            </select>
          </label>
          <br />
        </details>
        <details>
          <summary> Santé </summary>
          <label>
            Sterilisation:
            <input
              type="checkbox"
              name="sterilisation"
              checked={formData.sterilisation}
              onChange={handleChange}
            />
          </label>
          <label>
            Vaccination:
            <input
              type="checkbox"
              name="vaccination"
              checked={formData.vaccination}
              onChange={handleChange}
            />
          </label>
          <label>
            Identification:
            <input
              type="checkbox"
              name="identification"
              checked={formData.identification}
              onChange={handleChange}
            />
          </label>
          <label>
            Decontamination:
            <input
              type="checkbox"
              name="decontamination"
              checked={formData.decontamination}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Background:
            <textarea
              name="background"
              value={formData.background}
              onChange={handleChange}
            />
          </label>
          <label>
            Observations:
            <input
              name="observations"
              type="text"
              value={formData.observations}
              onChange={handleChange}
            />
          </label>
        </details>
        <button type="submit">Add Animal</button>
      </form>

      <h1> Les pensionnaires actuels</h1>
      <ul className="admin-animals-list">
        {animals.map((animal) => (
          <Link to={`/admin/pensionnaires/edit/${animal.id}`} key={animal.id}>
            <li className="admin-animals-item">
              <img src={animal.image} alt={`${animal.name}`} />
              <div className="admin-animals-infos">
                <p>{animal.name}</p>
                <p> {animal.race ? animal.race.name : "Unknown"} </p>
              </div>
              <svg
                viewBox="0 0 24 24"
                height={20}
                width={20}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" />
              </svg>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default AdminPensionnaires;
