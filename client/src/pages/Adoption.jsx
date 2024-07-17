import axios from "axios";
import { useEffect, useState } from "react";

function Adoption() {
  const [adoptableAnimals, setAdoptableAnimals] = useState([]);

  useEffect(() => {
    const fetchAdoptableAnimals = async () => {
      try {
        const [animalsResponse, racesResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/animals/adoption`),
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

        setAdoptableAnimals(animalsWithRaces);
      } catch (error) {
        console.error("Error fetching adoptable animals and races:", error);
      }
    };

    fetchAdoptableAnimals();
  }, []);

  return (
    <>
      <h1>À l'adoption</h1>
      <ul className="adoptable-animals-list">
        {adoptableAnimals.map((animal) => (
          <li key={animal.id} className="adoptable-animal-item">
            <img src={animal.image} alt={`${animal.name}`} />
            <div className="adoptable-animal-info">
              <p>{animal.name}</p>
              <p>{animal.race ? animal.race.name : "Unknown Race"}</p>
              <p>Âge: {animal.age}</p>
              <p>Genre: {animal.gender === "M" ? "Male" : "Female"}</p>
              <p>Histoire: {animal.story}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Adoption;
