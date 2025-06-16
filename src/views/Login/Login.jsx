import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";
import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsuario } from "../../components/Context/UsuarioContext.jsx"; // Importa el contexto del usuario

// 🔧 Usuario temporal de prueba (borrar cuando se use backend real)
const usuarioDePrueba = {
  email: "jazmin@dmhoteles.com",
  password: "123456",
  nombres: "Jazmín"
};

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
    if (email === usuarioDePrueba.email && password === usuarioDePrueba.password) {
      console.warn("🟡 Acceso simulado con usuario de prueba.");
      alert("Inicio de sesión simulado.");
      login(usuarioDePrueba);
      navigate("/");
      return;
    }

    // 🔒 MODO REAL: conexión con backend
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inicio de sesión exitoso.");
        login(data); // ← almacena usuario recibido del backend
        navigate("/");
      } else {
        setError(data.mensaje || "Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setError("No se pudo conectar con el servidor.");
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
