import React, { useEffect, useState } from 'react';
import './PerfilRes.css';

const PerfilRes = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sampleReservations = [
    {
      id: 1,
      fullName: "GR",
      checkIn: "2025-06-07",
      checkOut: "2025-06-10",
      roomType: "Individual",
      guests: "2 personas",
      email: "gaby190302@hotmail.com",
      status: "confirmada",
      price: 540.00
    },
    {
      id: 2,
      fullName: "GR",
      checkIn: "2025-07-15",
      checkOut: "2025-07-20",
      roomType: "Doble",
      guests: "2 personas",
      email: "gaby190302@hotmail.com",
      status: "confirmada",
      price: 900.00
    }
  ];

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setTimeout(() => {
          setReservations(sampleReservations);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Error al cargar las reservaciones");
        setLoading(false);
        console.error(err);
      }
    };

    fetchReservations();
  }, []);

  const cancelReservation = (reservationId) => {
    if (window.confirm("¿Estás seguro que deseas cancelar esta reservación?")) {
      setReservations(prev =>
        prev.map(res =>
          res.id === reservationId ? { ...res, status: "cancelada" } : res
        )
      );
      alert("Reservación cancelada exitosamente");
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const calculateNights = (checkIn, checkOut) => {
    const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
        <button onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center my-5">
        <h4>No tienes reservaciones activas</h4>
        <p>Puedes hacer una nueva reserva en nuestro formulario</p>
      </div>
    );
  }

  return (
    <div className="reservation-list-container">
      <h2 className="titulo-form">Mis Reservaciones</h2>
      <p className="card-text mb-4">Aquí puedes ver y gestionar todas tus reservaciones activas.</p>

      <div className="reservations-grid">
        {reservations.map(reservation => (
          <div
            key={reservation.id}
            className={`reservation-card ${reservation.status === 'cancelada' ? 'cancelled' : ''}`}
          >
            <div className="reservation-header">
              <h5>Reservación #{reservation.id}</h5>
              <span className="estado">{reservation.status}</span>
            </div>

            <div className="reservation-details">
              <div className="detail-group">
                <span className="detail-label">Tipo de habitación:</span>
                <span className="detail-value">{reservation.roomType}</span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Fechas:</span>
                <span className="detail-value">
                  {formatDate(reservation.checkIn)} al {formatDate(reservation.checkOut)} ({calculateNights(reservation.checkIn, reservation.checkOut)} noches)
                </span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Huéspedes:</span>
                <span className="detail-value">{reservation.guests}</span>
              </div>

              <div className="detail-group">
                <span className="detail-label">Total:</span>
                <span className="detail-value">${reservation.price.toFixed(2)}</span>
              </div>
            </div>

            {reservation.status === 'confirmada' && (
              <div className="reservation-actions">
                <button className="btn-guardar" onClick={() => cancelReservation(reservation.id)}>
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
