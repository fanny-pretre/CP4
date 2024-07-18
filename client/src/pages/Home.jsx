import { Link } from "react-router-dom";

import Adoption from "../assets/images/adoption.jpg";
import Benevole from "../assets/images/benevole.jpeg";
import Terrier from "../assets/images/terrier.jpg";
import Header from "../assets/images/Header.png";

function Home() {
  return (
    <div className="home-container">
      <section className="home-section">
        <img src={Header} alt="terrier" className="home-header" />
        <h2>
          {" "}
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.954 11c3.33 0 7.057 6.123 7.632 8.716.575 2.594-.996 4.729-3.484 4.112-1.092-.271-3.252-1.307-4.102-1.291-.925.016-2.379.836-3.587 1.252-2.657.916-4.717-1.283-4.01-4.073.774-3.051 4.48-8.716 7.551-8.716zm10.793-4.39c1.188.539 1.629 2.82.894 5.27-.704 2.341-2.33 3.806-4.556 2.796-1.931-.877-2.158-3.178-.894-5.27 1.274-2.107 3.367-3.336 4.556-2.796zm-21.968.706c-1.044.729-1.06 2.996.082 5.215 1.092 2.12 2.913 3.236 4.868 1.87 1.696-1.185 1.504-3.433-.082-5.215-1.596-1.793-3.824-2.599-4.868-1.87zm15.643-7.292c1.323.251 2.321 2.428 2.182 5.062-.134 2.517-1.405 4.382-3.882 3.912-2.149-.407-2.938-2.657-2.181-5.061.761-2.421 2.559-4.164 3.881-3.913zm-10.295.058c-1.268.451-1.92 2.756-1.377 5.337.519 2.467 2.062 4.114 4.437 3.269 2.06-.732 2.494-3.077 1.377-5.336-1.125-2.276-3.169-3.721-4.437-3.27z"
              fill="#8c034e"
            />
          </svg>
          Découvrez le terrier !
        </h2>
        <img src={Terrier} alt="terrier" className="home-images" />
        <p>
          {" "}
          Le Terrier est une association dédiée à la protection et au bien-être
          des lapins abandonnés et maltraités. Notre mission est de recueillir,
          soigner et trouver des foyers aimants pour ces petits animaux souvent
          méconnus. Nous croyons fermement que chaque lapin mérite une chance de
          vivre heureux et en sécurité. <br />
          <div className="strong">
            Grâce à l'engagement de nos bénévoles et au soutien de notre
            communauté, nous offrons une seconde chance à de nombreux lapins
            chaque année. 🐇
          </div>
        </p>
      </section>
      <section className="home-section">
        <h2>
          {" "}
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.954 11c3.33 0 7.057 6.123 7.632 8.716.575 2.594-.996 4.729-3.484 4.112-1.092-.271-3.252-1.307-4.102-1.291-.925.016-2.379.836-3.587 1.252-2.657.916-4.717-1.283-4.01-4.073.774-3.051 4.48-8.716 7.551-8.716zm10.793-4.39c1.188.539 1.629 2.82.894 5.27-.704 2.341-2.33 3.806-4.556 2.796-1.931-.877-2.158-3.178-.894-5.27 1.274-2.107 3.367-3.336 4.556-2.796zm-21.968.706c-1.044.729-1.06 2.996.082 5.215 1.092 2.12 2.913 3.236 4.868 1.87 1.696-1.185 1.504-3.433-.082-5.215-1.596-1.793-3.824-2.599-4.868-1.87zm15.643-7.292c1.323.251 2.321 2.428 2.182 5.062-.134 2.517-1.405 4.382-3.882 3.912-2.149-.407-2.938-2.657-2.181-5.061.761-2.421 2.559-4.164 3.881-3.913zm-10.295.058c-1.268.451-1.92 2.756-1.377 5.337.519 2.467 2.062 4.114 4.437 3.269 2.06-.732 2.494-3.077 1.377-5.336-1.125-2.276-3.169-3.721-4.437-3.27z"
              fill="#8c034e"
            />
          </svg>
          N'achetez pas, adoptez !
        </h2>
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
          <div className="strong">
            Adoptez, ne faites pas d'achats impulsifs : ensemble, nous pouvons
            faire la différence. 🚀
          </div>
        </p>
        <Link to="/adoption">
          <button type="button"> Nos lapins à adopter</button>
        </Link>
      </section>
      <section className="home-section">
        <h2>
          {" "}
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.954 11c3.33 0 7.057 6.123 7.632 8.716.575 2.594-.996 4.729-3.484 4.112-1.092-.271-3.252-1.307-4.102-1.291-.925.016-2.379.836-3.587 1.252-2.657.916-4.717-1.283-4.01-4.073.774-3.051 4.48-8.716 7.551-8.716zm10.793-4.39c1.188.539 1.629 2.82.894 5.27-.704 2.341-2.33 3.806-4.556 2.796-1.931-.877-2.158-3.178-.894-5.27 1.274-2.107 3.367-3.336 4.556-2.796zm-21.968.706c-1.044.729-1.06 2.996.082 5.215 1.092 2.12 2.913 3.236 4.868 1.87 1.696-1.185 1.504-3.433-.082-5.215-1.596-1.793-3.824-2.599-4.868-1.87zm15.643-7.292c1.323.251 2.321 2.428 2.182 5.062-.134 2.517-1.405 4.382-3.882 3.912-2.149-.407-2.938-2.657-2.181-5.061.761-2.421 2.559-4.164 3.881-3.913zm-10.295.058c-1.268.451-1.92 2.756-1.377 5.337.519 2.467 2.062 4.114 4.437 3.269 2.06-.732 2.494-3.077 1.377-5.336-1.125-2.276-3.169-3.721-4.437-3.27z"
              fill="#8c034e"
            />
          </svg>
          Devenez bénévole !{" "}
        </h2>
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
          <div className="strong">
            Contactez-nous dès aujourd'hui pour en savoir plus sur les
            opportunités de bénévolat et comment vous pouvez aider. 💖
          </div>
        </p>

        <Link to="/engagement">
          <button type="button"> S'engager</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
