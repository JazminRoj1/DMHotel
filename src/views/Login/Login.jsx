import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";
const Login = () => {
	return (
		<div>
			<Nav />
			<header className="header__login">
				<h2>Sing In</h2>
			</header>

			<form className="form__login">
				<label>Email Address</label>
				<input type="email" />

				<label for="">Password</label>
				<input type="password" />

				<input className="form__login-button button" type="submit" value="Submit" />
			</form>
			<Footer />
		</div>
	);
};

export default Login;