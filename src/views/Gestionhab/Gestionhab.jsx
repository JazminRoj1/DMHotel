"use client";

import { useState, useEffect } from "react";
import { roomsAPI } from "../../services/api";
import "./Gestionhab.css";

const Gestionhab = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(null);
  const [form, setForm] = useState({
    numero: "",
    tipo: "",
    precio: "",
    capacidad: "",
    estado: "disponible",
  });
  const [errores, setErrores] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchHabitaciones();
  }, []);

  const fetchHabitaciones = async () => {
    try {
      setLoading(true);
      const response = await roomsAPI.getAll();
      if (response.data.success) {
        setHabitaciones(response.data.data.rooms);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      alert("Error al cargar habitaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Limpiar errores al cambiar
    if (errores[e.target.name]) {
      setErrores({ ...errores, [e.target.name]: "" });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!/^[0-9]{3,4}$/.test(form.numero)) {
      nuevosErrores.numero = "El número debe tener 3-4 dígitos";
    }
    if (!form.tipo) nuevosErrores.tipo = "Selecciona un tipo de habitación";
    if (!form.precio || Number.parseFloat(form.precio) <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a 0";
    }
    if (!form.capacidad) nuevosErrores.capacidad = "Selecciona una capacidad";

    // Verificar número duplicado
    const duplicada = habitaciones.some(
      (h, i) => h.numero === form.numero && i !== modoEdicion
    );
    if (duplicada) {
      nuevosErrores.numero = "Ya existe una habitación con ese número";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setSubmitting(true);

    try {
      const roomData = {
        numero: form.numero,
        tipo: form.tipo,
        precio: Number.parseFloat(form.precio),
        capacidad: Number.parseInt(form.capacidad),
        estado: form.estado,
      };

      if (modoEdicion !== null) {
        // Actualizar habitación existente
        const roomId = habitaciones[modoEdicion].id;
        const response = await roomsAPI.update(roomId, roomData);
        if (response.data.success) {
          alert("Habitación actualizada exitosamente");
          await fetchHabitaciones();
          resetForm();
        }
      } else {
        // Crear nueva habitación
        const response = await roomsAPI.create(roomData);
        if (response.data.success) {
          alert("Habitación creada exitosamente");
          await fetchHabitaciones();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error saving room:", error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Error al guardar habitación");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditar = (index) => {
    const hab = habitaciones[index];
    setForm({
      numero: hab.numero,
      tipo: hab.tipo,
      precio: hab.precio.toString(),
      capacidad: hab.capacidad.toString(),
      estado: hab.estado,
    });
    setModoEdicion(index);
  };

  const handleEliminar = async (index) => {
    if (!window.confirm("¿Eliminar esta habitación?")) return;

    try {
      const roomId = habitaciones[index].id;
      const response = await roomsAPI.delete(roomId);
      if (response.data.success) {
        alert("Habitación eliminada exitosamente");
        await fetchHabitaciones();
        if (modoEdicion === index) resetForm();
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Error al eliminar habitación");
      }
    }
  };

  const resetForm = () => {
    setForm({
      numero: "",
      tipo: "",
      precio: "",
      capacidad: "",
      estado: "disponible",
    });
    setModoEdicion(null);
    setErrores({});
  };

  if (loading) return <div>Cargando habitaciones...</div>;

  return (
    <div className="contenedor-gestion">
      <h2>Gestión de Habitaciones</h2>

      <form className="form-nueva" onSubmit={handleSubmit} noValidate>
        <div className="campo-form">
          <input
            type="text"
            name="numero"
            placeholder="Número"
            maxLength={4}
            value={form.numero}
            onChange={handleChange}
            className={errores.numero ? "input-error" : ""}
          />
          {errores.numero && <span className="error">{errores.numero}</span>}
        </div>

        <div className="campo-form">
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className={errores.tipo ? "input-error" : ""}
          >
            <option value="">Tipo de Habitación</option>
            <option value="estándar">Estándar</option>
            <option value="doble">Doble</option>
            <option value="triple">Triple</option>
            <option value="matrimonial">Matrimonial</option>
            <option value="suite">Suite</option>
          </select>
          {errores.tipo && <span className="error">{errores.tipo}</span>}
        </div>

        <div className="campo-form">
          <input
            type="number"
            name="precio"
            step="0.01"
            placeholder="Precio"
            value={form.precio}
            onChange={handleChange}
            className={errores.precio ? "input-error" : ""}
          />
          {errores.precio && <span className="error">{errores.precio}</span>}
        </div>

        <div className="campo-form">
          <select
            name="capacidad"
            value={form.capacidad}
            onChange={handleChange}
            className={errores.capacidad ? "input-error" : ""}
          >
            <option value="">Capacidad</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          {errores.capacidad && (
            <span className="error">{errores.capacidad}</span>
          )}
        </div>

        <div className="campo-form">
          <select name="estado" value={form.estado} onChange={handleChange}>
            <option value="disponible">Disponible</option>
            <option value="ocupada">Ocupada</option>
            <option value="mantenimiento">Mantenimiento</option>
          </select>
        </div>

        <div className="botones-form">
          <button type="submit" disabled={submitting}>
            {submitting
              ? "Guardando..."
              : modoEdicion !== null
              ? "Actualizar"
              : "+ Nueva Habitación"}
          </button>
          {modoEdicion !== null && (
            <button type="button" onClick={resetForm} className="btn-cancelar">
              Cancelar
            </button>
          )}
        </div>
      </form>

      {habitaciones.length === 0 ? (
        <p>No hay habitaciones registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Número</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Capacidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map((hab, i) => (
              <tr key={hab.id}>
                <td>{hab.numero}</td>
                <td>{hab.tipo.charAt(0).toUpperCase() + hab.tipo.slice(1)}</td>
                <td>${Number.parseFloat(hab.precio).toFixed(2)}</td>
                <td>{hab.capacidad}</td>
                <td>
                  <span className={`estado ${hab.estado}`}>{hab.estado}</span>
                </td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => handleEditar(i)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(i)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Gestionhab;
