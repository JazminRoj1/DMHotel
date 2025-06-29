"use client";

import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Perfilla.css";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import PerfilUser from "../../views/PerfilUser/PerfilUser";
import PerfilRes from "../../views/PerfilRes/PerfilRes";
import PerfilEven from "../../views/PerfilEven/PerfilEven";
import PerfilEdit from "../../views/PerfilEdit/PerfilEdit";
import { useAuth } from "../../context/AuthContext"; // Usar nuestro AuthContext

const PerfilLayout = () => {
  const { user, isAuthenticated, loading } = useAuth(); // Usar AuthContext consistente
  const [vista, setVista] = useState("perfil");

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Cargando...</p>
      </div>
    );
  }

  // Redirigir si no está autenticado
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Obtener primer nombre del usuario
  // const primerNombre = user?.nombre?.split(" ")[0] || "Usuario";

  const renderContenido = () => {
    switch (vista) {
      case "perfil":
        return <PerfilUser setVista={setVista} usuario={user} />;
      case "reservas":
        return <PerfilRes usuario={user} />;
      case "eventos":
        return <PerfilEven usuario={user} />;
      case "informacion":
        return <PerfilEdit usuario={user} setVista={setVista} />;
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  return (
    <>
      <Nav />
      <div className="perfil-container">
        <div className="menu-lateral">
          <button
            className={vista === "perfil" ? "active" : ""}
            onClick={() => setVista("perfil")}
          >
            Mi Perfil
          </button>

          <button
            className={vista === "informacion" ? "active" : ""}
            onClick={() => setVista("informacion")}
          >
            Información de Contacto
          </button>

          <button
            className={vista === "reservas" ? "active" : ""}
            onClick={() => setVista("reservas")}
          >
            Mis Reservas
          </button>

          <button
            className={vista === "eventos" ? "active" : ""}
            onClick={() => setVista("eventos")}
          >
            Eventos
          </button>
        </div>
        <div className="contenido-derecha">{renderContenido()}</div>
      </div>
      <Footer />
    </>
  );
};

export default PerfilLayout;
