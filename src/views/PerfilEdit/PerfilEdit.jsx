"use client";

import { useState, useEffect } from "react";
import "./PerfilEdit.css";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/api";

const PerfilEdit = ({ setVista }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    telefono: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    if (user) {
      // Separar nombre completo en nombres y apellidos
      const nombreParts = user.nombre.split(" ");
      const nombres = nombreParts[0] || "";
      const apellidos = nombreParts.slice(1).join(" ") || "";

      setFormData({
        nombres,
        apellidos,
        dni: user.dni || "",
        telefono: user.telefono || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar mensajes al cambiar datos
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validaciones básicas
    if (!formData.nombres.trim() || !formData.apellidos.trim()) {
      setError("Nombres y apellidos son obligatorios");
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

    try {
      const response = await authAPI.updateProfile(formData);

      if (response.data.success) {
        // Actualizar el usuario en el contexto
        updateUser(response.data.data.user);
        setSuccess("Perfil actualizado correctamente");

        // Opcional: regresar a la vista de perfil después de 2 segundos
        setTimeout(() => {
          if (setVista) {
            setVista("perfil");
          }
        }, 2000);
      } else {
        setError(response.data.message || "Error al actualizar perfil");
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors
          .map((err) => err.message)
          .join(", ");
        setError(`Errores de validación: ${errorMessages}`);
      } else {
        setError("Error al actualizar perfil. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="perfil-edit-container">
        <p>Cargando información del usuario...</p>
      </div>
    );
  }

  return (
    <div className="perfil-edit-container">
      <h2 className="titulo-form">Información de Contacto</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="formulario-grid">
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={formData.nombres}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
          minLength="7"
          maxLength="20"
          required
          disabled={loading}
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          minLength="10"
          maxLength="20"
          required
          disabled={loading}
        />

        <div className="form-info">
          <p>
            <strong>Email actual:</strong> {user.email}
          </p>
          <small>El email no se puede modificar desde aquí</small>
        </div>

        <div className="boton-derecha">
          <button type="submit" className="btn-guardar" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>

          {setVista && (
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => setVista("perfil")}
              disabled={loading}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PerfilEdit;
