"use client";

import { useState, useEffect } from "react";
import { eventsAPI } from "../../services/api";
import "./Gestioneven.css";

const GestionEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    lugar: "",
    cupo_maximo: "",
  });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getAll();
      if (response.data.success) {
        setEventos(response.data.data.events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Error al cargar eventos");
    } finally {
      setLoading(false);
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!nuevoEvento.titulo.trim()) {
      nuevosErrores.titulo = "El título es obligatorio";
    }
    if (!nuevoEvento.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria";
    }
    if (!nuevoEvento.fecha) {
      nuevosErrores.fecha = "La fecha es obligatoria";
    }
    if (!nuevoEvento.hora) {
      nuevosErrores.hora = "La hora es obligatoria";
    }
    if (!nuevoEvento.lugar.trim()) {
      nuevosErrores.lugar = "El lugar es obligatorio";
    }
    if (
      !nuevoEvento.cupo_maximo ||
      Number.parseInt(nuevoEvento.cupo_maximo) <= 0
    ) {
      nuevosErrores.cupo_maximo = "Debes ingresar un cupo mayor a 0";
    }

    // Validar que la fecha no sea en el pasado
    if (nuevoEvento.fecha) {
      const fechaEvento = new Date(nuevoEvento.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      if (fechaEvento < hoy) {
        nuevosErrores.fecha = "La fecha no puede ser en el pasado";
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardarEvento = async () => {
    if (!validarFormulario()) return;

    setSubmitting(true);

    try {
      const eventoData = {
        titulo: nuevoEvento.titulo.trim(),
        descripcion: nuevoEvento.descripcion.trim(),
        fecha: nuevoEvento.fecha,
        hora: nuevoEvento.hora,
        lugar: nuevoEvento.lugar.trim(),
        cupo_maximo: Number.parseInt(nuevoEvento.cupo_maximo),
      };

      if (modoEdicion && eventoEditando) {
        // Actualizar evento existente
        const response = await eventsAPI.update(eventoEditando.id, eventoData);
        if (response.data.success) {
          alert("Evento actualizado exitosamente");
          await fetchEventos();
          resetForm();
        }
      } else {
        // Crear nuevo evento
        const response = await eventsAPI.create(eventoData);
        if (response.data.success) {
          alert("Evento creado exitosamente");
          await fetchEventos();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error saving event:", error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Error al guardar evento");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEliminar = async (evento) => {
    if (!window.confirm(`¿Eliminar el evento "${evento.titulo}"?`)) return;

    try {
      const response = await eventsAPI.delete(evento.id);
      if (response.data.success) {
        alert("Evento eliminado exitosamente");
        await fetchEventos();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Error al eliminar evento");
      }
    }
  };

  const abrirFormularioNuevo = () => {
    setModoEdicion(false);
    setEventoEditando(null);
    setNuevoEvento({
      titulo: "",
      descripcion: "",
      fecha: "",
      hora: "",
      lugar: "",
      cupo_maximo: "",
    });
    setErrores({});
    setMostrarFormulario(true);
  };

  const abrirFormularioEditar = (evento) => {
    setModoEdicion(true);
    setEventoEditando(evento);
    setNuevoEvento({
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      hora: evento.hora,
      lugar: evento.lugar,
      cupo_maximo: evento.cupo_maximo.toString(),
    });
    setErrores({});
    setMostrarFormulario(true);
  };

  const resetForm = () => {
    setNuevoEvento({
      titulo: "",
      descripcion: "",
      fecha: "",
      hora: "",
      lugar: "",
      cupo_maximo: "",
    });
    setModoEdicion(false);
    setEventoEditando(null);
    setMostrarFormulario(false);
    setErrores({});
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES");
  };

  const formatTime = (timeString) => {
    return timeString.slice(0, 5); // HH:MM
  };

  if (loading) return <div>Cargando eventos...</div>;

  return (
    <div className="contenedor-eventos">
      <h2>Gestión de Eventos</h2>

      <div className="boton-nuevo">
        <button onClick={abrirFormularioNuevo}>+ Nuevo Evento</button>
      </div>

      {eventos.length === 0 ? (
        <p>No hay eventos registrados.</p>
      ) : (
        <div className="tarjetas-eventos">
          {eventos.map((evento) => (
            <div key={evento.id} className="tarjeta-evento">
              <h4>{evento.titulo}</h4>
              <p>{evento.descripcion}</p>
              <p>
                <strong>Fecha:</strong> {formatDate(evento.fecha)}
              </p>
              <p>
                <strong>Hora:</strong> {formatTime(evento.hora)}
              </p>
              <p>
                <strong>Lugar:</strong> {evento.lugar}
              </p>
              <p className="asistentes">
                <strong>Asistentes:</strong> {evento.asistentes_count || 0} /{" "}
                {evento.cupo_maximo}
              </p>

              <div className="botones-evento">
                <button
                  className="btn-editar"
                  onClick={() => abrirFormularioEditar(evento)}
                >
                  Editar
                </button>
                <button
                  className="btn-eliminar"
                  onClick={() => handleEliminar(evento)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {mostrarFormulario && (
        <div className="modal-form">
          <div className="formulario-crear">
            <h3>{modoEdicion ? "Editar Evento" : "Nuevo Evento"}</h3>

            <input
              type="text"
              placeholder="Título"
              value={nuevoEvento.titulo}
              onChange={(e) =>
                setNuevoEvento({ ...nuevoEvento, titulo: e.target.value })
              }
              className={errores.titulo ? "input-error" : ""}
            />
            {errores.titulo && <span className="error">{errores.titulo}</span>}

            <textarea
              placeholder="Descripción"
              value={nuevoEvento.descripcion}
              onChange={(e) =>
                setNuevoEvento({ ...nuevoEvento, descripcion: e.target.value })
              }
              className={errores.descripcion ? "input-error" : ""}
            />
            {errores.descripcion && (
              <span className="error">{errores.descripcion}</span>
            )}

            <input
              type="date"
              value={nuevoEvento.fecha}
              onChange={(e) =>
                setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })
              }
              className={errores.fecha ? "input-error" : ""}
              min={new Date().toISOString().split("T")[0]} // No permitir fechas pasadas
            />
            {errores.fecha && <span className="error">{errores.fecha}</span>}

            <input
              type="time"
              value={nuevoEvento.hora}
              onChange={(e) =>
                setNuevoEvento({ ...nuevoEvento, hora: e.target.value })
              }
              className={errores.hora ? "input-error" : ""}
            />
            {errores.hora && <span className="error">{errores.hora}</span>}

            <input
              type="text"
              placeholder="Lugar"
              value={nuevoEvento.lugar}
              onChange={(e) =>
                setNuevoEvento({ ...nuevoEvento, lugar: e.target.value })
              }
              className={errores.lugar ? "input-error" : ""}
            />
            {errores.lugar && <span className="error">{errores.lugar}</span>}

            <input
              type="number"
              placeholder="Cupo máximo"
              value={nuevoEvento.cupo_maximo}
              onChange={(e) =>
                setNuevoEvento({ ...nuevoEvento, cupo_maximo: e.target.value })
              }
              className={errores.cupo_maximo ? "input-error" : ""}
              min="1"
            />
            {errores.cupo_maximo && (
              <span className="error">{errores.cupo_maximo}</span>
            )}

            <div className="form-buttons">
              <button onClick={handleGuardarEvento} disabled={submitting}>
                {submitting
                  ? "Guardando..."
                  : modoEdicion
                  ? "Actualizar"
                  : "Guardar"}
              </button>
              <button onClick={resetForm} disabled={submitting}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionEventos;
