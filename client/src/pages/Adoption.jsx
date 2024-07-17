import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <h1>Adoptez-les tous ! </h1>
      <ul className="animals-list">
        {adoptableAnimals.map((animal) => (
          <li key={animal.id} className="animal-item">
            <div className="animal-picture">
              <img src={animal.image} alt={`${animal.name}`} />
            </div>
            <div className="animal-info">
              <h2>{animal.name}</h2>
              <div className="animal-flex">
                <div>
                  <p>{animal.race ? animal.race.name : "Unknown Race"}</p>
                  <p>{animal.age} ans</p>
                </div>
                <div className="animal-svg">
                  {animal.gender === "M" ? (
                    <svg
                      fill="#000000"
                      height="200px"
                      width="200px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 345.6 345.6"
                    >
                      <path d="M336.843,8.927c-5.959-5.976-14.148-9.174-22.594-8.787L211.774,4.758c-16.551,0.746-29.365,14.769-28.619,31.32 c0.746,16.552,14.789,29.342,31.32,28.619l24.955-1.125l-32.602,32.602c-21.324-13.469-46.053-20.681-71.893-20.681 c-36.061,0-69.963,14.042-95.459,39.541c-52.637,52.635-52.637,138.281,0,190.917c25.496,25.499,59.398,39.54,95.459,39.54 c36.061,0,69.961-14.041,95.459-39.54c45.348-45.348,51.623-115.193,18.834-167.326l32.701-32.701l-1.195,24.942 c-0.793,16.55,11.979,30.608,28.529,31.402c0.49,0.023,0.975,0.035,1.461,0.035c15.906,0,29.17-12.505,29.941-28.564l4.898-102.193 C345.97,23.115,342.804,14.904,336.843,8.927z M187.97,263.526c-14.166,14.165-33,21.966-53.033,21.966 c-20.035,0-38.869-7.801-53.033-21.966c-29.242-29.243-29.242-76.823,0-106.066c14.164-14.165,33-21.966,53.033-21.966 s38.869,7.801,53.033,21.966C217.212,186.701,217.212,234.282,187.97,263.526z" />{" "}
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z"
                        fill="#0F0F0F"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div className="animal-button-section">
                <Link to={`/adoption/${animal.id}`}>
                  {" "}
                  <button type="button">
                    {" "}
                    En savoir plus sur {animal.name}
                  </button>{" "}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Adoption;
