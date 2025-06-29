"use client";

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Dashboard from "../../views/Dashboard/Dashboard";
import Gestionhab from "../../views/Gestionhab/Gestionhab";
import Gestionres from "../../views/Gestionres/Gestionres";
import Gestioneven from "../../views/Gestioneven/Gestioneven";
import "./AdminLayout.css";

const AdminLayout = () => {
  const { user, logout, isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [vista, setVista] = useState("dashboard");

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Redirigir si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirigir si no es administrador
  if (!isAdmin) {
    return <Navigate to="/client" replace />;
  }

  const primerNombre = user?.nombre?.split(" ")[0] || "Admin";

  const renderContenido = () => {
    switch (vista) {
      case "dashboard":
        return <Dashboard />;
      case "gestionhab":
        return <Gestionhab />;
      case "gestionres":
        return <Gestionres />;
      case "gestioneven":
        return <Gestioneven />;
      default:
        return <div>Selecciona una sección</div>;
    }
  };

  const handleCerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <div className="menu-lateral">
        <div>Hola, {primerNombre}</div>
        <button
          className={vista === "dashboard" ? "active" : ""}
          onClick={() => setVista("dashboard")}
        >
          Dashboard Administrativo
        </button>
        <button
          className={vista === "gestionhab" ? "active" : ""}
          onClick={() => setVista("gestionhab")}
        >
          Gestión de Habitaciones
        </button>
        <button
          className={vista === "gestionres" ? "active" : ""}
          onClick={() => setVista("gestionres")}
        >
          Gestión de Reservas
        </button>
        <button
          className={vista === "gestioneven" ? "active" : ""}
          onClick={() => setVista("gestioneven")}
        >
          Gestión de Eventos
        </button>
        <button className="btn-cerrar-sesion" onClick={handleCerrarSesion}>
          Cerrar sesión
        </button>
      </div>
      <div className="contenido-derecha">{renderContenido()}</div>
    </div>
  );
};

export default AdminLayout;
