import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function Home() {
  const authData = Cookies.get("authData");
  let firstname = null;
  let lastname = null;

  if (authData) {
    const authDecoded = jwtDecode(authData);
    firstname = authDecoded.firstname;
    lastname = authDecoded.lastname;
  }

  return (
    <h1>
      {" "}
      Hello {firstname} {lastname}
    </h1>
  );
}

export default Home;
