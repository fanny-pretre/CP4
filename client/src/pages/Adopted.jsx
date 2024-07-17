import axios from "axios";
import { useEffect, useState } from "react";

function Adopted() {
  const [adoptedAnimals, setAdoptedAnimals] = useState([]);

  useEffect(() => {
    const fetchAdoptedAnimals = async () => {
      try {
        const [animalsResponse, racesResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/animals/adopted`),
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

        setAdoptedAnimals(animalsWithRaces);
      } catch (error) {
        console.error("Error fetching adopted animals and races:", error);
      }
    };

    fetchAdoptedAnimals();
  }, []);

  return (
    <>
      <h1>Ils sont passés par ici</h1>
      <ul className="adopted-animals-list">
        {adoptedAnimals.map((animal) => (
          <li key={animal.id} className="adopted-animal-item">
            <img src={animal.image} alt={`${animal.name}`} />
            <div className="adopted-animal-info">
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

export default Adopted;
