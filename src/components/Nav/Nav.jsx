import { Link } from "react-router-dom";

const Nav = () => {
	return (
		<nav className="nav">
			<div className="nav__img">
				<img src="src/img/logo-sin-fondo.png" alt="" />
			</div>
			<i id="menu" class='bx bx-menu'></i>
			<div id="nav__desktop">
				<Link to="/">Inicio</Link>
				<Link to="/Hotel">Hoteles</Link>
				<Link to="/">Servicios</Link>
				<Link to="/habitaciones">Habitaciones</Link>
				<Link to="/login">Iniciar Sesion</Link>
				<Link to="/register" >Registrarse</Link>
			</div>
		</nav >
	);
}; 

export default Nav;