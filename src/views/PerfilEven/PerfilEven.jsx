"use client";

import { useEffect, useState } from "react";
import "./PerfilEven.css";
import { eventsAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const PerfilEven = () => {
  const { user } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        const response = await eventsAPI.getAll();

        if (response.data.success) {
          setEventos(response.data.data.events);
        } else {
          setError("Error al cargar los eventos");
        }
      } catch (err) {
        setError("Error al cargar los eventos");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEventos();
    }
  }, [user]);

  const toggleAsistencia = async (eventoId) => {
    try {
      const evento = eventos.find((e) => e.id === eventoId);

      if (evento.user_registered) {
        // Cancelar registro
        const response = await eventsAPI.unregister(eventoId);
        if (response.data.success) {
          setEventos((prev) =>
            prev.map((evento) => {
              if (evento.id === eventoId) {
                return {
                  ...evento,
                  user_registered: false,
                  asistentes_count:
                    Number.parseInt(evento.asistentes_count) - 1,
                };
              }
              return evento;
            })
          );
          alert("Te has desregistrado del evento exitosamente");
        }
      } else {
        // Registrarse
        const response = await eventsAPI.register(eventoId);
        if (response.data.success) {
          setEventos((prev) =>
            prev.map((evento) => {
              if (evento.id === eventoId) {
                return {
                  ...evento,
                  user_registered: true,
                  asistentes_count:
                    Number.parseInt(evento.asistentes_count) + 1,
                };
              }
              return evento;
            })
          );
          alert("Te has registrado al evento exitosamente");
        }
      }
    } catch (error) {
      console.error("Error toggling event registration:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Error al procesar la solicitud");
      }
    }
  };

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      weekday: "long",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const formatTime = (timeString) => {
    return timeString.slice(0, 5); // HH:MM format
  };

  const isEventFull = (evento) => {
    return (
      Number.parseInt(evento.asistentes_count) >=
      Number.parseInt(evento.cupo_maximo)
    );
  };

  const isEventPast = (fecha) => {
    return new Date(fecha) < new Date();
  };

  if (loading) {
    return <p className="text-center">Cargando eventos...</p>;
  }

  if (error) {
    return (
      <div className="alert alert-danger my-5">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  if (eventos.length === 0) {
    return (
      <div className="text-center my-5">
        <h4>No hay eventos disponibles</h4>
        <p>Pronto tendremos nuevos eventos para ti</p>
      </div>
    );
  }

  return (
    <div className="evento-list-container">
      <h2 className="titulo-form">Eventos Disponibles</h2>
      <p className="card-text mb-4">
        Aquí puedes ver e inscribirte a nuestros próximos eventos.
      </p>

      <div className="eventos-grid">
        {eventos.map((evento) => (
          <div key={evento.id} className="evento-card">
            <div className="evento-header">
              <h5>{evento.titulo}</h5>
              {evento.user_registered && (
                <span className="registered-badge">Registrado</span>
              )}
            </div>

            <div className="evento-details">
              <div className="detail-group">
                <span className="detail-label">Descripción:</span>
                <span className="detail-value">{evento.descripcion}</span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Fecha:</span>
                <span className="detail-value">{formatDate(evento.fecha)}</span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Hora:</span>
                <span className="detail-value">{formatTime(evento.hora)}</span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Lugar:</span>
                <span className="detail-value">{evento.lugar}</span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Asistencia:</span>
                <span className="detail-value">
                  {evento.asistentes_count} / {evento.cupo_maximo}
                </span>
              </div>
            </div>

            <div className="evento-actions">
              {isEventPast(evento.fecha) ? (
                <button className="btn-asistir" disabled>
                  Evento finalizado
                </button>
              ) : isEventFull(evento) && !evento.user_registered ? (
                <button className="btn-asistir" disabled>
                  Cupo lleno
                </button>
              ) : (
                <button
                  className={`btn-asistir ${
                    evento.user_registered ? "registered" : ""
                  }`}
                  onClick={() => toggleAsistencia(evento.id)}
                >
                  {evento.user_registered
                    ? "Cancelar asistencia"
                    : "Registrarse"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfilEven;
