import React, { useState } from 'react';
import './Reservas.css';
import Nav from "../../components/Nav/Nav"
import Footer from "../../components/Footer/Footer.jsx"
import Carrusel from "../../components/Carrusel/Carrusel.jsx"

const Reservas = () => {
    const [formData, setFormData] = useState({
        fullName: 'Ejemplo',
        checkIn: '2025-06-07', // Formato YYYY-MM-DD para input type="date"
        roomType: 'Individual',
        email: 'ejemplo@gmail.com',
        checkOut: '2025-06-10', // Formato YYYY-MM-DD para input type="date"
        guests: '2 personas'
    });

    const [availability, setAvailability] = useState({
        available: 5,
        price: 180.00
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const confirmReservation = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para confirmar la reserva
        console.log('Reserva confirmada!', {
            ...formData,
            checkInDisplay: formatDateForDisplay(formData.checkIn),
            checkOutDisplay: formatDateForDisplay(formData.checkOut)
        });
    };

    return (
        <>
            <Nav />
            <Carrusel />
            <div className="reservation-form-container">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Reserve su estancia</h2>
                        <p className="card-text mb-4">Complete el formulario a continuación para reservar su habitación.</p>

                        <form>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="fullName" className="form-label">Nombre completo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="checkIn" className="form-label">Fecha de check-in</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="checkIn"
                                        name="checkIn"
                                        value={formData.checkIn}
                                        onChange={handleInputChange}
                                        min={new Date().toISOString().split('T')[0]} // Fecha mínima = hoy
                                    />
                                    <small className="text-muted">
                                        Seleccionado: {formatDateForDisplay(formData.checkIn)}
                                    </small>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="roomType" className="form-label">Tipo de habitación</label>
                                    <select
                                        className="form-select"
                                        id="roomType"
                                        name="roomType"
                                        value={formData.roomType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Individual">Individual</option>
                                        <option value="Doble">Doble</option>
                                        <option value="Suite">Suite</option>
                                        <option value="Familiar">Familiar</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="checkOut" className="form-label">Fecha de check-out</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="checkOut"
                                        name="checkOut"
                                        value={formData.checkOut}
                                        onChange={handleInputChange}
                                        min={formData.checkIn} // Fecha mínima = check-in
                                    />
                                    <small className="text-muted">
                                        Seleccionado: {formatDateForDisplay(formData.checkOut)}
                                    </small>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="guests" className="form-label">Número de huéspedes</label>
                                    <select
                                        className="form-select"
                                        id="guests"
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleInputChange}
                                    >
                                        <option value="1 persona">1 persona</option>
                                        <option value="2 personas">2 personas</option>
                                        <option value="3 personas">3 personas</option>
                                        <option value="4 personas">4 personas</option>
                                    </select>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="availability-section mb-4">
                                <h3 className="h5 mb-3">Disponibilidad</h3>
                                <p className="mb-3">
                                    Tenemos <strong>{availability.available} habitaciones</strong> disponibles del tipo <strong>{formData.roomType}</strong> para las fechas seleccionadas.<br />
                                    Precio por noche: ${availability.price.toFixed(2)}
                                </p>

                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-primary flex-grow-1"
                                        onClick={confirmReservation}
                                    >
                                        Confirmar reserva
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Reservas;