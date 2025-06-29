import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";
import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
const Login = () => {
  const [errores, setErrores] = useState({});
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
  
    const nuevosErrores = {};
    if (!formData.email.trim()) nuevosErrores.email = true;
    if (!formData.password.trim()) nuevosErrores.password = true;
  
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }
  
    if (!formData.email.includes("@")) {
      setErrores({ email: true });
      setError("Por favor ingresa un email válido.");
      setLoading(false);
      return;
    }
  
    const result = await login(formData.email, formData.password);
  
    if (result.success) {
      navigate(result.user.rol === "administrador" ? "/admin" : "/");
    } else {
      setError(result.message || "Error al iniciar sesión.");
    }
  
    setErrores({});
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
          type="text"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className={errores.email ? "campo-error" : ""}
        />

        <label>Contraseña</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Tu contraseña"
          className={errores.password ? "campo-error" : ""}
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
