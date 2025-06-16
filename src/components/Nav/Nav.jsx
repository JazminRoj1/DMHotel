import { Link, useNavigate } from "react-router-dom";
import { useUsuario } from "../../components/Context/UsuarioContext.jsx"; // 🔗 Importa el contexto del usuario
import "./Nav.css";
import { useState } from "react";

const Nav = () => {
	const { usuario, logout } = useUsuario(); // Accede al estado global
	const navigate = useNavigate();           // Permite redireccionar después del logout
	const [mostrarMenu, setMostrarMenu] = useState(false); // Estado para el globo de usuario

	// Cierra sesión y redirige
	const handleLogout = () => {
		logout();
		navigate("/");
	};
	const primerNombre = usuario?.nombres?.split(" ")[0] || "Usuario";

	return (
		<nav className="nav">
			{/* Logo del sitio */}
			<div className="nav__img">
				<img src="src/img/logo-sin-fondo.png" alt="Logo" />
			</div>

			{/* Icono del menú para móviles (pendiente) */}
			<i id="menu" className="bx bx-menu"></i>

			{/* Navegación principal */}
			<div id="nav__desktop">
				<Link to="/">Inicio</Link>
				<Link to="/servicios">Servicios</Link>
				<Link to="/habitaciones">Habitaciones</Link>
				<Link to="/contacto">Contacto</Link>

				{/* Si hay usuario logueado, muestra el globito */}
				{usuario ? (
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
						<span>Hola, {usuario?.nombres?.split(" ")[0] || "Usuario"}</span>
						</div>

						{mostrarMenu && (
						<div className="nav__menu-flotante">
							<Link to="/Perfilla" className="nav__menu-opcion">Mi cuenta</Link>
							<button onClick={handleLogout} className="nav__menu-opcion">Cerrar sesión</button>
						</div>
						)}
					</div>
					) : (
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
