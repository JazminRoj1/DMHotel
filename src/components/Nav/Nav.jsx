import { Link } from "react-router-dom";

const Nav = () => {
	return (
		<nav className="nav">
			<div className="nav__img">
				<img src="src/img/logo-sin-fondo.png" alt="" />
			</div>
			<i id="menu" class='bx bx-menu'></i>
			<div id="nav__desktop">
<<<<<<< HEAD
				<Link to="/">Inicio</Link>
				<Link to="/Hotel">Hoteles</Link>
				<Link to="/">Servicios</Link>
				<Link to="/habitaciones">Habitaciones</Link>
				<Link to="/login">Iniciar Sesion</Link>
				<Link to="/register" >Registrarse</Link>
=======
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
>>>>>>> c25522f013c441d4f4ef610e7b3af59d39cbc516
			</div>
		</nav >
	);
};

export default Nav;