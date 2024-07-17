import { Link } from "react-router-dom";

import Adoption from "../assets/images/adoption.jpg";
import Benevole from "../assets/images/benevole.jpeg";
import Terrier from "../assets/images/terrier.jpg";

function Home() {
  return (
    <div className="home-container">
      <section className="home-section">
        <h2> Découvrez le terrier !</h2>
        <img src={Terrier} alt="terrier" className="home-images" />
        <p>
          {" "}
          Le Terrier est une association dédiée à la protection et au bien-être
          des lapins abandonnés et maltraités. Notre mission est de recueillir,
          soigner et trouver des foyers aimants pour ces petits animaux souvent
          méconnus. Nous croyons fermement que chaque lapin mérite une chance de
          vivre heureux et en sécurité.
          <br />
          <strong>
            Grâce à l'engagement de nos bénévoles et au soutien de notre
            communauté, nous offrons une seconde chance à de nombreux lapins
            chaque année.
          </strong>
        </p>
      </section>
      <section className="home-section">
        <h2> N'achetez pas, adoptez !</h2>
        <img src={Adoption} alt="adoption" className="home-images" />
        <p>
          Pourquoi acheter un lapin alors que tant d'entre eux attendent
          désespérément un foyer aimant ? L'adoption sauve des vies et offre à
          ces animaux une nouvelle opportunité de bonheur. En adoptant un lapin
          du Terrier, vous libérez une place pour un autre lapin dans le besoin
          et contribuez à la lutte contre le commerce des animaux. Nos lapins
          sont soigneusement examinés, vaccinés et socialisés, prêts à apporter
          de la joie à votre foyer.
          <br />
          <strong>
            Adoptez, ne faites pas d'achats impulsifs : ensemble, nous pouvons
            faire la différence.
          </strong>
        </p>
        <Link to="/adoption">
          <button type="button"> Nos lapins à adopter</button>
        </Link>
      </section>
      <section className="home-section">
        <h2> Devenez bénévole ! </h2>
        <img src={Benevole} alt="adoption" className="home-images" />
        <p>
          {" "}
          Rejoignez notre équipe de bénévoles passionnés et faites partie de la
          famille du Terrier ! En tant que bénévole, vous pouvez contribuer de
          nombreuses façons : soins des lapins, entretien des installations,
          aide à l'organisation d'événements, sensibilisation du public, et bien
          plus encore. Chaque geste compte et chaque heure que vous offrez
          améliore la vie de nos lapins. Venez partager votre amour des animaux
          et faites une réelle différence dans leur vie.
          <br />
          <strong>
            Contactez-nous dès aujourd'hui pour en savoir plus sur les
            opportunités de bénévolat et comment vous pouvez aider.
          </strong>
        </p>

        <Link to="/adoption">
          <button type="button"> S'engager</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
