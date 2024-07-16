import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <main className="container">
      <div className="nav">
        <Nav />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
