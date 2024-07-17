import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import "./styles/index.scss";

import Home from "./pages/Home";
import Adopted from "./pages/Adopted";
import Adoption from "./pages/Adoption";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
        path: "/adoption",
        element: <Adoption />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
