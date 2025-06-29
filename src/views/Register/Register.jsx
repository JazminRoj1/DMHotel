import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Nav from "../../components/Nav/Nav.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Register.css";
import { Link } from "react-router-dom";


const Register = () => {
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    dni: "",
    telefono: "",
    password: "",
    rol: "cliente",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

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

    // Validaciones básicas del frontend
    // Validaciones por campo
    const newErrors = {};

    if (!formData.nombres.trim()) newErrors.nombres = "Campo obligatorio.";
    if (!formData.apellidos.trim()) newErrors.apellidos = "Campo obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {newErrors.email = "Correo electrónico inválido.";}
    if (
      formData.password.length < 6 ||
      !/[A-Z]/.test(formData.password) || // al menos una mayúscula
      !/[a-z]/.test(formData.password) || // al menos una minúscula
      !/\d/.test(formData.password) ||    // al menos un número
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) // al menos un símbolo
    ) {
      newErrors.password = "Contraseña inválida. Debe incluir mayúscula, minúscula, número y símbolo.";
    }    
    
    if (!/^\d{8,15}$/.test(formData.dni)) {newErrors.dni = "Campo obligatorio.";}      
    if (!/^\d{9,15}$/.test(formData.telefono)) {newErrors.telefono = "Campo obligatorio";}
    
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setLoading(false);
      return;
    }

    setFieldErrors({}); // limpia errores si todo está bien

    // Enviar datos tal como están - el backend actualizado los maneja correctamente
    const result = await register(formData);

    if (result.success) {
      // Redirigir según el rol del usuario
      if (result.user.rol === "administrador") {
        navigate("/admin");
      } else {
        navigate("/"); // Página principal para clientes
      }
    } else {
      // Manejar errores específicos del backend
      if (result.message.includes("email o DNI ya están registrados")) {
        setError(
          "El email o DNI ya están registrados. Intenta con otros datos."
        );
      } else if (result.message.includes("Datos de entrada inválidos")) {
        setError("Por favor verifica que todos los campos estén correctos.");
      } else {
        setError(result.message || "Ocurrió un error durante el registro.");
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <Nav />
      <div className="form-container">
        <h2>Regístrate</h2>

        {error && <p className="error-message">{error}</p>}

        <form className="form__register" onSubmit={handleSubmit}>
          <div className="form-columns">
            <div className="form-group">
              <label>Nombre</label>
              <input
                name="nombres"
                type="text"
                value={formData.nombres}
                onChange={handleChange}
                placeholder="Ej: Juan Carlos"
                className={fieldErrors.nombres ? "error-input" : ""}
              />
              {fieldErrors.nombres && <p className="error-message">{fieldErrors.nombres}</p>}
            </div>

            <div className="form-group">
              <label>Apellidos</label>
              <input
                name="apellidos"
                type="text"
                value={formData.apellidos}
                onChange={handleChange}
                placeholder="Ej: Pérez García"
                className={fieldErrors.apellidos ? "error-input" : ""}
              />
              {fieldErrors.apellidos && <p className="error-message">{fieldErrors.apellidos}</p>}

            </div>

            <div className="form-group">
              <label>Documento</label>
              <input
                name="dni"
                type="text"
                value={formData.dni}
                onChange={(e) => {
                  // Solo números, máx 20 caracteres
                  const value = e.target.value.replace(/\D/g, "").slice(0, 20);
                  setFormData({ ...formData, dni: value });
                }}
                placeholder="Ej: 12345678 o A1234567B"
                maxLength="20"
                className={fieldErrors.dni ? "error-input" : ""}               
              />
              {fieldErrors.dni && <p className="error-message">{fieldErrors.dni}</p>}
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                name="telefono"
                type="text"
                value={formData.telefono}
                onChange={(e) => {
                  // Solo números, máx 20 caracteres
                  const value = e.target.value.replace(/\D/g, "").slice(0, 20);
                  setFormData({ ...formData, telefono: value });
                }}
                placeholder="Ej: +1234567890 o (123) 456-7890"
                maxLength="20"
                className={fieldErrors.telefono ? "error-input" : ""}                
              />
              {fieldErrors.telefono && <p className="error-message">{fieldErrors.telefono}</p>}
            </div>

            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className={fieldErrors.email ? "error-input" : ""}
              />
              {fieldErrors.email && <p className="error-message">{fieldErrors.email}</p>}

            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                minLength="6"
                className={fieldErrors.password ? "error-input" : ""}
              />
              {fieldErrors.password && <p className="error-message">{fieldErrors.password}</p>}
            </div>
          </div>

          <button className="button-submit" type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
          <p className="register-login-text">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>

        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
