"use client";

import { useEffect, useState } from "react";
import "./PerfilRes.css";
import { reservationsAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const PerfilRes = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await reservationsAPI.getAll();

        if (response.data.success) {
          setReservations(response.data.data.reservations);
        } else {
          setError("Error al cargar las reservaciones");
        }
      } catch (err) {
        setError("Error al cargar las reservaciones");
        console.error("Error fetching reservations:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReservations();
    }
  }, [user]);

  const cancelReservation = async (reservationId) => {
    if (window.confirm("¿Estás seguro que deseas cancelar esta reservación?")) {
      try {
        const response = await reservationsAPI.cancel(reservationId);

        if (response.data.success) {
          setReservations((prev) =>
            prev.map((res) =>
              res.id === reservationId ? { ...res, estado: "cancelada" } : res
            )
          );
          alert("Reservación cancelada exitosamente");
        } else {
          alert("Error al cancelar la reservación");
        }
      } catch (error) {
        console.error("Error canceling reservation:", error);
        alert("Error al cancelar la reservación");
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const calculateNights = (checkIn, checkOut) => {
    const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmada":
        return "confirmada";
      case "cancelada":
        return "cancelada";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <p>Cargando tus reservaciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-5">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center my-5">
        <h4>No tienes reservaciones activas</h4>
        <p>Puedes hacer una nueva reserva en nuestro sistema</p>
      </div>
    );
  }

  return (
    <div className="reservation-list-container">
      <h2 className="titulo-form">Mis Reservaciones</h2>
      <p className="card-text mb-4">
        Aquí puedes ver y gestionar todas tus reservaciones.
      </p>

      <div className="reservations-grid">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className={`reservation-card ${getStatusColor(reservation.estado)}`}
          >
            <div className="reservation-header">
              <h5>Reservación #{reservation.id}</h5>
              <span className={`estado ${reservation.estado}`}>
                {reservation.estado.charAt(0).toUpperCase() +
                  reservation.estado.slice(1)}
              </span>
            </div>

            <div className="reservation-details">
              <div className="detail-group">
                <span className="detail-label">Huésped:</span>
                <span className="detail-value">
                  {reservation.nombre_huesped}
                </span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Habitación:</span>
                <span className="detail-value">
                  {reservation.room_tipo} - #{reservation.room_numero}
                </span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Fechas:</span>
                <span className="detail-value">
                  {formatDate(reservation.fecha_inicio)} al{" "}
                  {formatDate(reservation.fecha_fin)} (
                  {calculateNights(
                    reservation.fecha_inicio,
                    reservation.fecha_fin
                  )}{" "}
                  noches)
                </span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Email:</span>
                <span className="detail-value">
                  {reservation.email_huesped}
                </span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Teléfono:</span>
                <span className="detail-value">
                  {reservation.telefono_huesped}
                </span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Total:</span>
                <span className="detail-value">
                  ${Number(reservation.total).toFixed(2)}
                </span>
              </div>

              {reservation.notas && (
                <div className="detail-group">
                  <span className="detail-label">Notas:</span>
                  <span className="detail-value">{reservation.notas}</span>
                </div>
              )}
            </div>

            {reservation.estado === "confirmada" && (
              <div className="reservation-actions">
                <button
                  className="btn-guardar"
                  onClick={() => cancelReservation(reservation.id)}
                >
                  Cancelar Reservación
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfilRes;
