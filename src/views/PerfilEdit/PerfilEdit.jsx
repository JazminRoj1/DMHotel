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
  const [campoError, setCampoError] = useState({});
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

    const nuevosErrores = {};

    if (!formData.nombres.trim()) {
      nuevosErrores.nombres = "Este campo es obligatorio";
    }
    if (!formData.apellidos.trim()) {
      nuevosErrores.apellidos = "Este campo es obligatorio";
    }
    if (!formData.dni.trim()) {
      nuevosErrores.dni = "Este campo es obligatorio";
    } else if (formData.dni.length < 8) {
      nuevosErrores.dni = "Este campo es obligatorio";
    }
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = "Este campo es obligatorio";
    } else if (formData.telefono.length < 9) {
      nuevosErrores.telefono = "Este campo es obligatorio";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setCampoError(nuevosErrores);
      setLoading(false);
      return;
    }

    setCampoError({});


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
      <div className="campo-form">
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={formData.nombres}
          onChange={handleChange}
          disabled={loading}
          className={campoError.nombres ? "input-error" : ""}
        />
        <small className={`error-text ${campoError.nombres ? "visible" : ""}`}>
      {campoError.nombres || " "}
    </small>
      </div>
      <div className="campo-form">
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          disabled={loading}
          className={campoError.apellidos ? "input-error" : ""}
        />
        <small className={`error-text ${campoError.apellidos ? "visible" : ""}`}>
      {campoError.apellidos || " "}
    </small>
      </div>
      <div className="campo-form">
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
          maxLength="15"
          disabled={loading}
          className={campoError.dni ? "input-error" : ""}
        />
         <small className={`error-text ${campoError.dni ? "visible" : ""}`}>
      {campoError.dni || " "}
    </small>
      </div>
      <div className="campo-form">
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          maxLength="15"
          disabled={loading}
          className={campoError.telefono ? "input-error" : ""}
        />
        <small className={`error-text ${campoError.telefono ? "visible" : ""}`}>
      {campoError.telefono || " "}
    </small>
        </div>
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
