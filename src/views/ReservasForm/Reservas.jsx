
import React, { useState } from 'react';
import './Reservas.css';
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";
import Carrusel from "../../components/Carrusel/Carrusel.jsx";
import { useNavigate } from 'react-router-dom';

const Reservas = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        checkIn: '',
        checkOut: '',
        roomType: 'Selecciona',
        guests: 'Selecciona'
    });

    const [errores, setErrores] = useState({});
    const [mostrarDisponibilidad, setMostrarDisponibilidad] = useState(false);
    const [availability] = useState({
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
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!formData.fullName.trim()) nuevosErrores.fullName = "Nombre requerido";
        if (!formData.email.trim()) {
            nuevosErrores.email = "Correo requerido";
        } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            nuevosErrores.email = "Correo inválido";
        }        
        if (!formData.checkIn) nuevosErrores.checkIn = "Fecha de check-in requerida";
        if (!formData.checkOut) nuevosErrores.checkOut = "Fecha de check-out requerida";
        if (!formData.roomType || formData.roomType === 'Selecciona') nuevosErrores.roomType = "Seleccione un tipo de habitación";
        if (!formData.guests || formData.guests === 'Selecciona') nuevosErrores.guests = "Seleccione el número de huéspedes";
        return nuevosErrores;
    };

    const buscarDisponibilidad = (e) => {
        e.preventDefault();
        const erroresValidados = validarFormulario();
        if (Object.keys(erroresValidados).length > 0) {
            setErrores(erroresValidados);
            setMostrarDisponibilidad(false);
            return;
        }
        setErrores({});
        setMostrarDisponibilidad(true);
    };
    const navigate = useNavigate();
    const confirmReservation = (e) => {
        e.preventDefault();
        const erroresValidados = validarFormulario();
        if (Object.keys(erroresValidados).length > 0) {
            setErrores(erroresValidados);
            return;
        }
        setErrores({});
        navigate("/Metodopago"); // esto cambia la vista sin recargar
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
                            {/* Campo: Nombre */}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="fullName" className="form-label">Nombre completo</label>
                                    <input type="text" className={`form-control ${errores.fullName ? 'is-invalid' : ''}`} name="fullName" value={formData.fullName} onChange={handleInputChange} />
                                    {errores.fullName && <div className="invalid-feedback">{errores.fullName}</div>}
                                </div>

                                {/* Campo: Check-in */}
                                <div className="col-md-6">
                                    <label htmlFor="checkIn" className="form-label">Fecha de check-in</label>
                                    <input type="date" className={`form-control ${errores.checkIn ? 'is-invalid' : ''}`} name="checkIn" value={formData.checkIn} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} />
                                    {errores.checkIn && <div className="invalid-feedback">{errores.checkIn}</div>}
                                    <small className="text-muted">Seleccionado: {formatDateForDisplay(formData.checkIn)}</small>
                                </div>
                            </div>

                            {/* Campo: Tipo de habitación + Email */}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="roomType" className="form-label">Tipo de habitación</label>
                                    <select className={`form-control ${errores.roomType ? 'is-invalid' : ''}`} name="roomType" value={formData.roomType} onChange={handleInputChange}>
                                        <option value="Selecciona">Selecciona una opción</option>
                                        <option value="Individual">Individual</option>
                                        <option value="Doble">Doble</option>
                                        <option value="Suite">Suite</option>
                                        <option value="Familiar">Familiar</option>
                                    </select>
                                    {errores.roomType && <div className="invalid-feedback">{errores.roomType}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                    <input type="email" className={`form-control ${errores.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleInputChange} />
                                    {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                                </div>
                            </div>

                            {/* Campo: Check-out + Huéspedes */}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="checkOut" className="form-label">Fecha de check-out</label>
                                    <input type="date" className={`form-control ${errores.checkOut ? 'is-invalid' : ''}`} name="checkOut" value={formData.checkOut} onChange={handleInputChange} min={formData.checkIn} />
                                    {errores.checkOut && <div className="invalid-feedback">{errores.checkOut}</div>}
                                    <small className="text-muted">Seleccionado: {formatDateForDisplay(formData.checkOut)}</small>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="guests" className="form-label">Número de huéspedes</label>
                                    <select className={`form-control ${errores.guests ? 'is-invalid' : ''}`} name="guests" value={formData.guests} onChange={handleInputChange}>
                                        <option value="Selecciona">Selecciona una opción</option>
                                        <option value="1 persona">1 persona</option>
                                        <option value="2 personas">2 personas</option>
                                        <option value="3 personas">3 personas</option>
                                        <option value="4 personas">4 personas</option>
                                    </select>
                                    {errores.guests && <div className="invalid-feedback">{errores.guests}</div>}
                                </div>
                            </div>

                            {/* Botón para buscar disponibilidad */}
                            <div className="boton-nuevo mt-3">
                                <button onClick={buscarDisponibilidad}>Buscar disponibilidad</button>
                            </div>


                            {/* Resultado de disponibilidad */}
                            {mostrarDisponibilidad && (
                                <div className="availability-section mb-4">
                                    <h5 className="mb-2">Disponibilidad</h5>
                                    <p>
                                        Tenemos <strong>{availability.available}</strong> habitaciones tipo <strong>{formData.roomType}</strong><br />
                                        Precio por noche: <strong>${availability.price.toFixed(2)}</strong>
                                    </p>
                                    <button className="btn btn-primary w-100" onClick={confirmReservation}>
                                        Realizar reserva
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Reservas;
