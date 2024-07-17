import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
      <h1>Edit Animal</h1>
      <form onSubmit={handleSubmit}>
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
          <select name="gender" value={formData.gender} onChange={handleChange}>
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
        <button type="submit">Update Animal</button>
        <button type="button" onClick={handleDelete}>
          Delete Animal
        </button>
      </form>
    </div>
  );
}

export default AdminPensionnairesEdit;
