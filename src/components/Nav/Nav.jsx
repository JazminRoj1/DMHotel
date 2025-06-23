"use client";

import "./Nav.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Nav = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth(); // Usar AuthContext consistente
  const navigate = useNavigate();
  const [mostrarMenu, setMostrarMenu] = useState(false);

  // Cierra sesión y redirige
  const handleLogout = () => {
    logout();
    navigate("/");
    setMostrarMenu(false); // Cerrar menú al hacer logout
  };

  // Obtener primer nombre del usuario
  const primerNombre = user?.nombre?.split(" ")[0] || "Usuario";

  // Función para determinar las rutas según el rol
  const getDashboardRoute = () => {
    if (isAdmin) return "/admin";
    return "/client";
  };

  return (
    <nav className="nav">
      {/* Logo del sitio */}
      <div className="nav__img">
        <Link to="/">
          <img src="/src/img/logo-sin-fondo.png" alt="Logo DM Hoteles" />
        </Link>
      </div>

      {/* Icono del menú para móviles (pendiente implementación) */}
      <i id="menu" className="bx bx-menu"></i>

      {/* Navegación principal */}
      <div id="nav__desktop">
        <Link to="/">Inicio</Link>
        <Link to="/servicios">Servicios</Link>
        <Link to="/habitaciones">Habitaciones</Link>
        <Link to="/contacto">Contacto</Link>

        {/* Si hay usuario logueado, muestra el menú de usuario */}
        {isAuthenticated ? (
          <div
            className="nav__usuario-hover-wrapper"
            onMouseEnter={() => setMostrarMenu(true)}
            onMouseLeave={() => setMostrarMenu(false)}
          >
            <div className="nav__login-icon-link">
              <img
                src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
                alt="Mi cuenta"
                className="login-icon-image"
              />
              <span>Hola, {primerNombre}</span>
              {isAdmin && <span className="admin-badge">Admin</span>}
            </div>

            {mostrarMenu && (
              <div className="nav__menu-flotante">
                {/* Opciones según el rol */}
                <Link to={getDashboardRoute()} className="nav__menu-opcion">
                  {isAdmin ? "Panel Admin" : "Mi Dashboard"}
                </Link>

                <Link to="/PerfilLa" className="nav__menu-opcion">
                  Mi Perfil
                </Link>

                {/* Opciones específicas para clientes */}

                <hr className="nav__menu-separador" />

                <button
                  onClick={handleLogout}
                  className="nav__menu-opcion nav__logout-btn"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Si no hay usuario, mostrar botón de login */
          <Link to="/login" className="nav__login-icon-link">
            <img
              src="https://cdn2.iconfinder.com/data/icons/player-rounded-set/154/user-login-player-function-name-avatar-256.png"
              alt="Iniciar Sesión"
              className="login-icon-image"
            />
            <span>Iniciar Sesión</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
