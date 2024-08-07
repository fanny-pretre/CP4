import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function AdminPensionnairesEdit() {
  const { id } = useParams(); // Get the animal ID from the URL
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    age: "",
    gender: "",
    story: "",
    status: "",
    personality: "",
    race_id: "",
  });
  const [races, setRaces] = useState([]);

  useEffect(() => {
    const fetchAnimalAndRaces = async () => {
      try {
        const [animalResponse, racesResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/animals/${id}`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/races`),
        ]);

        setAnimal(animalResponse.data);
        setFormData({
          ...animalResponse.data,
        });
        setRaces(racesResponse.data);
      } catch (error) {
        console.error("Error fetching animal and races:", error);
      }
    };

    fetchAnimalAndRaces();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/animals/${id}`,
        formData
      );
      console.info("Animal updated successfully");
      navigate("/admin/pensionnaires");
    } catch (error) {
      console.error("Error updating animal:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/animals/${id}`);
      console.info("Animal deleted successfully");
      navigate("/admin/pensionnaires");
    } catch (error) {
      console.error("Error deleting animal:", error);
    }
  };

  if (!animal) return <p>Loading...</p>;

  return (
    <div>
      <div className="previous">
        <Link to="/admin/pensionnaires">
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
      <h1>Editer {formData.name}</h1>
      <form onSubmit={handleSubmit}>
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
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
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
          <label htmlFor="status">Statut </label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
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
            <option value="">Select Race</option>
            {races.map((race) => (
              <option key={race.id} value={race.id}>
                {race.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Mettre à jour {formData.name}</button>
        <button type="button" onClick={handleDelete} className="btn-secondary">
          Supprimer {formData.name}
        </button>
      </form>
    </div>
  );
}

export default AdminPensionnairesEdit;
