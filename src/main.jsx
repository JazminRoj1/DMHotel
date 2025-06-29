import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { DMHotels } from "./DMHotels";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Servicios from "./views/Servicios/Servicios";
import Contacto from "./views/Contacto/Contacto";
import Habitaciones from "./views/Habitaciones/Habitaciones";
import Reservas from "./views/ReservasForm/Reservas";
import PerfilLa from "./components/PerfilLayout/Perfilla.jsx"; // Importa el componente de perfil
import PerfilEdit from "./views/PerfilEdit/PerfilEdit.jsx"; // Importa el componente de edición de perfil
import PerfilRes from "./views/PerfilRes/PerfilRes.jsx"; // Importa el componente de perfil de reservas
import AdminLayout from "./components/AdminLayout/AdminLayout.jsx";
import Gestioneven from "./views/Gestioneven/Gestioneven.jsx";
import Gestionres from "./views/Gestionres/Gestionres.jsx";
import Gestionhab from "./views/Gestionhab/Gestionhab.jsx";
import Dashboard from "./views/Dashboard/Dashboard.jsx";
import MetodoPago from "./views/Metodopago/Metodopago.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Promociones from "./views/Promociones/Promociones.jsx";

const router = createBrowserRouter([
  { path: "/", element: <DMHotels /> },
  { path: "/servicios", element: <Servicios /> },
  { path: "/contacto", element: <Contacto /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/habitaciones", element: <Habitaciones /> },
  { path: "/Reservas", element: <Reservas /> },
  { path: "/PerfilLa", element: <PerfilLa /> },
  { path: "/PerfilEdit", element: <PerfilEdit /> },
  { path: "/PerfilRes", element: <PerfilRes /> },
  { path: "/admin", element: <AdminLayout /> },
  { path: "/Gestioneven", element: <Gestioneven /> },
  { path: "/Gestionres", element: <Gestionres /> },
  { path: "/Gestionhab", element: <Gestionhab /> },
  { path: "/Dashboard", element: <Dashboard /> },
  { path: "/MetodoPago", element: <MetodoPago /> },
  { path: "/Promociones", element: <Promociones /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
