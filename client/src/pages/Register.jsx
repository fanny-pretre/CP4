import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Inscription() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const navigate = useNavigate();

  // Surveille le champ de mot de passe pour indiquer ce qu'il manque
  const validatePassword = (value) => {
    if (!/(?=.*[a-z])/.test(value)) {
      return "Il vous manque une lettre minuscule. 🙃";
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return "Il vous manque une lettre majuscule. 🙃";
    }
    if (!/(?=.*\d)/.test(value)) {
      return "Il vous manque un chiffre. 🙃";
    }
    if (!/(?=.*[\W_])/.test(value)) {
      return "Il vous manque un caractère spécial. 🙃";
    }
    if (!/.{8,}/.test(value)) {
      return "Il vous manque des caractères pour atteindre 8 caractères. 🙃";
    }
    return true;
  };

  // Surveille le champ de mot de passe pour le mot de passe à confirmer
  const password = watch("password");

  const onSubmit = async (data) => {
    console.info(data);
    try {
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auths/register`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            address: data.address,
            zip_code: data.zip_code,
            city: data.city,
            telephone: data.telephone, // Assurez-vous que le champ 'telephone' correspond à la base de données
            role_id: 2,
          }),
        }
      );
      // Redirection vers la page de connexion si la création réussit
      if (response.status === 201) {
        navigate("/login");
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  return (
    <section>
      <h1>Inscription </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable react/jsx-props-no-spreading */}

        <div className="form-group-50-50">
          <div className="form-group">
            <label htmlFor="firstname">Prénom</label>{" "}
            <input
              type="text"
              id="firstname"
              {...register("firstname", {
                required: true,
              })}
              // Validation au moment de la perte du focus
              onBlur={() => trigger("firstname")}
            />
            {errors.firstname && (
              <p role="alert">
                {errors.firstname.type === "required" &&
                  "Le prénom obligatoire"}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              id="lastname"
              {...register("lastname", {
                required: true,
              })}
              // Validation au moment de la perte du focus
              onBlur={() => trigger("lastname")}
            />
            {errors.lastname && (
              <p role="alert">
                {errors.lastname.type === "required" &&
                  "Le nom de famille est obligatoire"}
              </p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
            // Validation au moment de la perte du focus
            onBlur={() => trigger("email")}
          />

          {errors.email && (
            <p role="alert">
              {errors.email.type === "required" && "L'email est obligatoire"}

              {errors.email.type === "pattern" &&
                "Êtes-vous sûr d'avoir écrit correctement votre email ?"}
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>{" "}
          <input
            type="password"
            id="password"
            {...register("password", {
              required: true,
              validate: validatePassword,
            })}
            onBlur={() => trigger("password")}
          />
          {errors.password && (
            <p role="alert">
              {errors.password.type === "required" &&
                "Le mot de passe est obligatoire"}
              {errors.password.type === "validate" && errors.password.message}
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "La confirmation du mot de passe est obligatoire",
              validate: (value) =>
                value === password || "Les mots de passe ne correspondent pas",
            })}
            onBlur={() => trigger("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p role="alert">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Adresse</label>{" "}
          <input
            type="text"
            id="address"
            {...register("address", {
              required: true,
            })}
            // Validation au moment de la perte du focus
            onBlur={() => trigger("address")}
          />
          {errors.address && (
            <p role="alert">
              {errors.address.type === "required" &&
                "L'adresse est obligatoire"}
            </p>
          )}
        </div>

        <div className="form-group-50-50">
          <div className="form-group">
            <label htmlFor="zip_code">Code Postal</label>{" "}
            <input
              type="text"
              id="zip_code"
              {...register("zip_code", {
                required: true,
              })}
              // Validation au moment de la perte du focus
              onBlur={() => trigger("zip_code")}
            />
            {errors.zip_code && (
              <p role="alert">
                {errors.zip_code.type === "required" &&
                  "Le code postal est obligatoire"}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="city">Ville</label>{" "}
            <input
              type="text"
              id="city"
              {...register("city", {
                required: true,
              })}
              // Validation au moment de la perte du focus
              onBlur={() => trigger("city")}
            />
            {errors.city && (
              <p role="alert">
                {errors.city.type === "required" && "La ville est obligatoire"}
              </p>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="telephone">Téléphone</label>
          <input
            type="telephone"
            id="telephone"
            {...register("telephone", {
              required: true,
            })}
            // Validation au moment de la perte du focus
            onBlur={() => trigger("telephone")}
          />

          {errors.telephone && (
            <p role="alert">
              {errors.telephone.type === "required" &&
                "Le téléphone est obligatoire"}
            </p>
          )}
        </div>
        <button type="submit">Créer mon compte</button>
      </form>

      <Link to="/login"> J'ai déjà un compte </Link>
    </section>
  );
}

export default Inscription;
