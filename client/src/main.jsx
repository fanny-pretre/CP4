import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import "./styles/index.scss";

import Home from "./pages/Home";
import Adopted from "./pages/Adopted";
import Adoption from "./pages/Adoption";
import AnimalId from "./pages/AnimalId";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin/Admin";
import AdminPensionnaires from "./pages/Admin/AdminPensionnaires";
import AdminPensionnairesEdit from "./pages/Admin/AdminPensionnairesEdit";
import AdminUtilisateurs from "./pages/Admin/AdminUtilisateurs";
import AdminContacts from "./pages/Admin/AdminContacts";
import Profil from "./pages/Profil/Profil";

import App from "./App";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/adopted",
        element: <Adopted />,
      },
      {
        path: "/adopted/:id",
        element: <AnimalId />,
      },
      {
        path: "/adoption",
        element: <Adoption />,
      },
      {
        path: "/adoption/:id",
        element: <AnimalId />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/pensionnaires",
        element: <AdminPensionnaires />,
      },
      {
        path: "/admin/pensionnaires/edit/:id",
        element: <AdminPensionnairesEdit />,
      },
      {
        path: "/admin/utilisateurs",
        element: <AdminUtilisateurs />,
      },
      {
        path: "/admin/contacts",
        element: <AdminContacts />,
      },
      {
        path: "/profil",
        element: <Profil />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
