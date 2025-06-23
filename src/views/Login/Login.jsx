import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";
import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Usar el contexto de autenticación

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validaciones básicas
    if (!formData.email || !formData.password) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Por favor ingresa un email válido.");
      setLoading(false);
      return;
    }

    // Intentar login con el backend
    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Redirigir según el rol del usuario
      if (result.user.rol === "administrador") {
        navigate("/admin");
      } else {
        navigate("/"); // Página principal para clientes
      }
    } else {
      // Manejar errores específicos
      if (result.message.includes("Credenciales inválidas")) {
        setError("Email o contraseña incorrectos. Verifica tus datos.");
      } else if (result.message.includes("Error de conexión")) {
        setError("No se pudo conectar al servidor. Intenta más tarde.");
      } else {
        setError(result.message || "Error al iniciar sesión.");
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <Nav />
      <h2>Iniciar Sesión</h2>
      <form className="form__login" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          required
        />

        <label>Contraseña</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Tu contraseña"
          required
        />

        {error && <small className="error">{error}</small>}

        <button
          className="form__login-button button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>

        <p className="login-register-text">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>

      <Footer />
    </div>
  );
};

export default Login;
