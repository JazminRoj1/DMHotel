import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";

const Register = () => {
	return (
		<div>
			<Nav />
			<header className="header__login">
				<h2>Create New Account</h2>
			</header>

			<form className="form__register">
				<div className="form__register-contenedor">
					<div>
						<label htmlFor="">Nombres</label>
						<input type="text" />

						<label htmlFor="">Email</label>
						<input type="email" />

						<label htmlFor="">DNI</label>
						<input type="text" />
					</div>

					<div>
						<label htmlFor="">Apellidos</label>
						<input type="text" />

						<label htmlFor="">Password</label>
						<input type="password" />

						<label htmlFor="">Teléfono</label>
						<input type="text" />
					</div>
				</div>

				<input className="button" type="submit" value="Create" />
			</form>
			
			<Footer />
		</div>
	);
};

export default Register;
