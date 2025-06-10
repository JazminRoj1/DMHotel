import { Link } from "react-router-dom";

const Nav = () => {
	return (
		<nav className="nav">
			<div className="nav__img">
				<img src="src/img/logo-sin-fondo.png" alt="" />
			</div>
			<i id="menu" class='bx bx-menu'></i>
			<div id="nav__desktop">
				<Link to={"/"} >
					<a href="">Inicio</a>
				</Link>
				<Link to={"/servicios"} >
					<a href="">Servicios</a>
				</Link>
				<Link to={"/habitaciones"} >
					<a href="">Habitaciones</a>
				</Link>
				<Link to={"/contacto"} >
					<a href="">Contacto</a>
				</Link>
				<Link to={"/login"} >
					<a href="">Iniciar Sesión</a>
				</Link>
				<Link to={"/register"} >
					<a href="">Registrarse</a>
				</Link>
			</div>
		</nav >
	);
};

export default Nav;