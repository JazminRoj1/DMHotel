import React, { useState } from "react";
import './Perfilla.css';
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import PerfilUser from "../../views/PerfilUser/PerfilUser";
import PerfilRes from "../../views/PerfilRes/PerfilRes";
import PerfilServ from "../../views/PerfilServ/PerfilServ";
import PerfilEdit from "../../views/PerfilEdit/PerfilEdit";
import { useUsuario } from "../../components/Context/UsuarioContext.jsx";

const PerfilLayout = () => {
  const { usuario } = useUsuario(); // data
  const primerNombre = usuario?.nombres?.split(" ")[0] || "";

  const [vista, setVista] = useState('perfil');
  
  const renderContenido = () => {
    switch (vista) {
      case 'perfil': return <PerfilUser setVista={setVista} />;
      case 'reservas': return <PerfilRes />;
      case 'servicios': return <PerfilServ />;
      case 'informacion': return <PerfilEdit />;
      
      default: return <div>Selecciona una opción</div>;
    }
  };

  return (
    <>
      <Nav />
      {/* <h2>Bienvenida, {primerNombre}</h2> */}
      <div className="perfil-container">
        <div className="menu-lateral">
        <button
          className={vista === 'perfil' ? 'active' : ''}
          onClick={() => setVista('perfil')}
        >
          Mi Perfil
        </button>
        
        <button
          className={vista === 'informacion' ? 'active' : ''}
          onClick={() => setVista('informacion')}
        >
          Información de Contacto
        </button>

        <button
          className={vista === 'reservas' ? 'active' : ''}
          onClick={() => setVista('reservas')}
        >
          Mis Reservas
        </button>

        <button
          className={vista === 'servicios' ? 'active' : ''}
          onClick={() => setVista('servicios')}
        >
          Servicios
        </button>

        </div>
        <div className="contenido-derecha">
          {renderContenido()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PerfilLayout;
