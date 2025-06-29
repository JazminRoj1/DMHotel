"use client";

import "./PerfilUser.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { reservationsAPI, eventsAPI } from "../../services/api";

const PerfilUser = ({ setVista }) => {
  const { user } = useAuth(); // Usar AuthContext en lugar de useUsuario
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalReservas: 0,
    eventosAsistidos: 0,
    reservaReciente: null,
  });
  const [loading, setLoading] = useState(true);

  // Obtener primer nombre del usuario
  const primerNombre = user?.nombre?.split(" ")[0] || "Usuario";

  // Simular sistema de puntos basado en actividad
  const calcularPuntos = (totalReservas, eventosAsistidos) => {
    return totalReservas * 50 + eventosAsistidos * 25;
  };

  // Calcular membresía según los puntos
  const calcularMembresia = (puntos) => {
    if (puntos >= 500) return "Elite";
    if (puntos >= 100) return "Premium";
    return "Estándar";
  };

  // Cargar estadísticas del usuario
  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        // Cargar reservas del usuario
        const reservasResponse = await reservationsAPI.getAll();
        const reservas = reservasResponse.data.data.reservations || [];

        // Cargar eventos (para calcular asistencias)
        const eventosResponse = await eventsAPI.getAll();
        const eventos = eventosResponse.data.data.events || [];
        const eventosAsistidos = eventos.filter(
          (evento) => evento.user_registered
        ).length;

        // Encontrar reserva más reciente
        const reservaReciente = reservas.length > 0 ? reservas[0] : null;

        setStats({
          totalReservas: reservas.length,
          eventosAsistidos,
          reservaReciente,
        });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      cargarEstadisticas();
    }
  }, [user]);

  const puntos = calcularPuntos(stats.totalReservas, stats.eventosAsistidos);
  const membresia = calcularMembresia(puntos);

  if (loading) {
    return (
      <div className="perfil-usuario">
        <p>Cargando información del perfil...</p>
      </div>
    );
  }

  return (
    <div className="perfil-usuario">
      <h2 className="titulo-perfil">Perfil de Usuario</h2>

      <div className="card-perfil">
        <div className="perfil-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Foto de perfil"
            className="foto-usuario"
          />
          <div className="datos-usuario">
            <h3 className="nombre-usuario">{primerNombre}</h3>
            <p className="email-usuario">{user?.email || "Sin correo"}</p>
          </div>
        </div>

        <div className="bloque-info">
          <h4 className="titulo-bloque">Estado de Lealtad</h4>
          <p>
            <strong>Membresía:</strong> {membresia}
          </p>
          <p>
            <strong>Puntos acumulados:</strong> {puntos}
          </p>
          <p>
            <small>Gana puntos con reservas (50 pts) y eventos (25 pts)</small>
          </p>
        </div>

        <div className="bloque-info">
          <h4 className="titulo-bloque">Historial de Reservas</h4>
          {stats.reservaReciente ? (
            <div className="reserva-reciente">
              <button
                className="btn-ver-detalles"
                onClick={() => setVista("reservas")}
              >
                Ver detalles
              </button>
              <p>
                <strong>Habitación:</strong>{" "}
                {stats.reservaReciente.room_tipo || "Habitación"}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(
                  stats.reservaReciente.fecha_inicio
                ).toLocaleDateString("es-ES")}
              </p>
              <p>
                <strong>Estado:</strong> {stats.reservaReciente.estado}
              </p>
            </div>
          ) : (
            <p className="sin-reservas">No hay reservas anteriores.</p>
          )}
        </div>

        <div className="bloque-info">
          <h4 className="titulo-bloque">Estadísticas</h4>
          <p>
            <strong>Total de reservas:</strong> {stats.totalReservas}
          </p>
          <p>
            <strong>Eventos asistidos:</strong> {stats.eventosAsistidos}
          </p>
        </div>

        <div className="botones-perfil">
          <button
            className="btn-editar"
            onClick={() => setVista("informacion")}
          >
            Editar Perfil
          </button>

          <button
            className="btn-nueva-habitacion"
            onClick={() => navigate("/Reservas")}
          >
            + Nueva Reserva
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerfilUser;
