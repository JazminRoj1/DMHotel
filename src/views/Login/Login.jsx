import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";
import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsuario } from "../../components/Context/UsuarioContext.jsx"; // Importa el contexto del usuario

// 🔧 Usuario temporal de prueba (borrar cuando se use backend real)
const usuariosDePrueba = [
  {
    email: "jazmin@dmhoteles.com",
    password: "123456",
    nombres: "Jazmín",
    rol: "user"
  },
  {
    email: "admin@dmhoteles.com",
    password: "1234",
    nombres: "Admin Prueba",
    rol: "admin"
  }
];
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login,usuario } = useUsuario(); // This change allows you to use the login function from the context

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // 🔧 MODO TEMPORAL: acceso simulado sin backend (eliminar esta parte luego)
    const usuarioEncontrado = usuariosDePrueba.find(
      (user) => user.email === email && user.password === password
    );

    if (usuarioEncontrado) {
      login(usuarioEncontrado);
      if (usuarioEncontrado.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // o cualquier ruta de usuario normal
      }
    } else {
      setError("Credenciales incorrectas.");
    }

  };

  return (
    <div>
      <Nav />
      <h2>Iniciar Sesión</h2>
      <form className="form__login" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <small className="error">{error}</small>}

        <input
          className="form__login-button button"
          type="submit"
          value="Iniciar Sesión"
        />

        <p className="login-register-text">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>

      <Footer />
    </div>
  );
};

export default Login;
