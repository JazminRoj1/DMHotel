import React, { useState } from "react";
import Dashboard from "../../views/Dashboard/Dashboard.jsx";
import Gestionhab from "../../views/Gestionhab/Gestionhab.jsx";
import Gestionres from "../../views/Gestionres/Gestionres.jsx";
import Gestioneven from "../../views/Gestioneven/Gestioneven.jsx";
import { useUsuario } from "../Context/UsuarioContext";
import "./AdminLayout.css";
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const { usuario, logout } = useUsuario(); // ← TODO JUNTO aquí
  const navigate = useNavigate();

  const primerNombre = usuario?.nombres?.split(" ")[0] || "";
  const [vista, setVista] = useState('dashboard');

  const renderContenido = () => {
    switch (vista) {
      case 'dashboard': return <Dashboard />;
      case 'gestionhab': return <Gestionhab />;
      case 'gestionres': return <Gestionres />;
      case 'gestioneven': return <Gestioneven />;
      default: return <div>Selecciona una sección</div>;
    }
  };

  const handleCerrarSesion = () => {
    logout();             // ← usa el método del contexto
    navigate('/login');   // ← redirige correctamente
  };

  return (
    <>
      <div className="admin-container">
        <div className="menu-lateral">
          <button className={vista === 'dashboard' ? 'active' : ''} onClick={() => setVista('dashboard')}>
            Dashboard Administrativo
          </button>
          <button className={vista === 'gestionhab' ? 'active' : ''} onClick={() => setVista('gestionhab')}>
            Gestión de Habitaciones
          </button>
          <button className={vista === 'gestionres' ? 'active' : ''} onClick={() => setVista('gestionres')}>
            Gestión de Reservas
          </button>
          <button className={vista === 'gestioneven' ? 'active' : ''} onClick={() => setVista('gestioneven')}>
            Gestión de Eventos
          </button>
          <button className="btn-cerrar-sesion" onClick={handleCerrarSesion}>
            Cerrar sesión
          </button>
        </div>
        <div className="contenido-derecha">
          {renderContenido()}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
