import React, { useState, useEffect } from 'react';
import './ReservasList.css';
import Nav from "../../components/Nav/Nav"
import Footer from "../../components/Footer/Footer.jsx"
import Carrusel from "../../components/Carrusel/Carrusel.jsx"

const ReservasList = () => {
    // Estado para almacenar las reservaciones
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Datos de ejemplo (en una app real vendrían de una API)
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
            price: 540.00 // 3 noches x $180
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
            price: 900.00 // 5 noches x $180
        }
    ];

    // Simular carga de datos (como si vinieran de una API)
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                // En una app real, aquí harías una llamada a tu API
                // const response = await fetch('/api/reservations');
                // const data = await response.json();

                // Usamos los datos de ejemplo por ahora
                setTimeout(() => {
                    setReservations(sampleReservations);
                    setLoading(false);
                }, 800); // Simulamos un pequeño retraso de red
            } catch (err) {
                setError("Error al cargar las reservaciones");
                setLoading(false);
                console.error(err);
            }
        };

        fetchReservations();
    }, []);

    // Función para cancelar una reservación
    const cancelReservation = (reservationId) => {
        if (window.confirm("¿Estás seguro que deseas cancelar esta reservación?")) {
            // En una app real, aquí harías una llamada a tu API para cancelar
            setReservations(prev =>
                prev.map(res =>
                    res.id === reservationId ? { ...res, status: "cancelada" } : res
                )
            );

            console.log(`Reservación ${reservationId} cancelada`);
            alert("Reservación cancelada exitosamente");
        }
    };

    // Función para formatear fechas
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Función para calcular noches de estancia
    const calculateNights = (checkIn, checkOut) => {
        const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando tus reservaciones...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger my-5">
                <p>{error}</p>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => window.location.reload()}
                >
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
        <>
            <Nav />
            <Carrusel />
            <div className="reservation-list-container">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Mis Reservaciones</h2>
                        <p className="card-text mb-4">Aquí puedes ver y gestionar todas tus reservaciones activas.</p>

                        <div className="reservations-grid">
                            {reservations.map(reservation => (
                                <div
                                    key={reservation.id}
                                    className={`reservation-card ${reservation.status === 'cancelada' ? 'cancelled' : ''}`}
                                >
                                    <div className="reservation-header">
                                        <h5>Reservación #{reservation.id}</h5>
                                        <span className={`badge ${reservation.status === 'confirmada' ? 'bg-success' : 'bg-secondary'}`}>
                                            {reservation.status}
                                        </span>
                                    </div>

                                    <div className="reservation-details">
                                        <div className="detail-group">
                                            <span className="detail-label">Tipo de habitación:</span>
                                            <span className="detail-value">{reservation.roomType}</span>
                                        </div>

                                        <div className="detail-group">
                                            <span className="detail-label">Fechas:</span>
                                            <span className="detail-value">
                                                {formatDate(reservation.checkIn)} al {formatDate(reservation.checkOut)}
                                                ({calculateNights(reservation.checkIn, reservation.checkOut)} noches)
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
                                            <button
                                                className="btn btn-outline-danger btn-sm"
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
                </div>
            </div>
            <Footer />
        </>

    );
};

export default ReservasList;