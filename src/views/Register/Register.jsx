"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Nav from "../../components/Nav/Nav.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Register.css";

const Register = () => {
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
    if (!formData.nombres.trim() || !formData.apellidos.trim()) {
      setError("Nombres y apellidos son obligatorios");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    if (formData.dni.length < 7) {
      setError("El DNI debe tener al menos 7 caracteres");
      setLoading(false);
      return;
    }

    if (formData.telefono.length < 10) {
      setError("El teléfono debe tener al menos 10 caracteres");
      setLoading(false);
      return;
    }

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
                required
              />
            </div>

            <div className="form-group">
              <label>Apellidos</label>
              <input
                name="apellidos"
                type="text"
                value={formData.apellidos}
                onChange={handleChange}
                placeholder="Ej: Pérez García"
                required
              />
            </div>

            <div className="form-group">
              <label>DNI</label>
              <input
                name="dni"
                type="text"
                value={formData.dni}
                onChange={handleChange}
                placeholder="Ej: 12345678 o A1234567B"
                minLength="7"
                maxLength="20"
                required
              />
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                name="telefono"
                type="text"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: +1234567890 o (123) 456-7890"
                minLength="10"
                maxLength="20"
                required
              />
            </div>

            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
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
                required
              />
            </div>
          </div>

          <button className="button-submit" type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
