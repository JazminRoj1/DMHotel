import { useState, useEffect } from "react";
import "./Reservas.css";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";
import Carrusel from "../../components/Carrusel/Carrusel.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { roomsAPI, reservationsAPI } from "../../services/api";

const Reservas = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telefono: "",
    checkIn: "",
    checkOut: "",
    roomType: "Selecciona",
    guests: "Selecciona",
    notas: "",
  });

  const [errores, setErrores] = useState({});
  const [mostrarDisponibilidad, setMostrarDisponibilidad] = useState(false);
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingReserva, setLoadingReserva] = useState(false);

  // Cargar datos del usuario si está autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.nombre || "",
        email: user.email || "",
        telefono: user.telefono || "",
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar errores cuando el usuario empiece a escribir
    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calcularNoches = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const fechaInicio = new Date(checkIn);
    const fechaFin = new Date(checkOut);
    const diffTime = Math.abs(fechaFin - fechaInicio);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.fullName.trim()) nuevosErrores.fullName = "Nombre requerido";
    if (!formData.email.trim()) {
      nuevosErrores.email = "Correo requerido";
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      nuevosErrores.email = "Correo inválido";
    }
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = "Teléfono requerido";
    } else if (formData.telefono.length < 10) {
      nuevosErrores.telefono = "Teléfono debe tener al menos 10 caracteres";
    }
    if (!formData.checkIn)
      nuevosErrores.checkIn = "Fecha de check-in requerida";
    if (!formData.checkOut)
      nuevosErrores.checkOut = "Fecha de check-out requerida";
    if (!formData.roomType || formData.roomType === "Selecciona")
      nuevosErrores.roomType = "Seleccione un tipo de habitación";
    if (!formData.guests || formData.guests === "Selecciona")
      nuevosErrores.guests = "Seleccione el número de huéspedes";

    // Validar fechas
    if (formData.checkIn && formData.checkOut) {
      const fechaInicio = new Date(formData.checkIn);
      const fechaFin = new Date(formData.checkOut);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      if (fechaInicio < hoy) {
        nuevosErrores.checkIn =
          "La fecha de check-in no puede ser anterior a hoy";
      }
      if (fechaFin <= fechaInicio) {
        nuevosErrores.checkOut =
          "La fecha de check-out debe ser posterior al check-in";
      }
    }

    return nuevosErrores;
  };

  const buscarDisponibilidad = async (e) => {
    e.preventDefault();
    const erroresValidados = validarFormulario();
    if (Object.keys(erroresValidados).length > 0) {
      setErrores(erroresValidados);
      setMostrarDisponibilidad(false);
      return;
    }

    setErrores({});
    setLoading(true);
    setMostrarDisponibilidad(false);

    try {
      // Buscar habitaciones disponibles
      const response = await roomsAPI.getAll();
      if (response.data.success) {
        const todasLasHabitaciones = response.data.data.rooms;

        // Filtrar por tipo de habitación
        const habitacionesTipo = todasLasHabitaciones.filter(
          (room) => room.tipo === formData.roomType.toLowerCase()
        );

        // Verificar disponibilidad para cada habitación
        const habitacionesConDisponibilidad = await Promise.all(
          habitacionesTipo.map(async (room) => {
            try {
              const availabilityResponse = await roomsAPI.checkAvailability(
                room.id,
                formData.checkIn,
                formData.checkOut
              );
              return {
                ...room,
                disponible: availabilityResponse.data.data.disponible,
              };
            } catch (error) {
              console.error(
                `Error checking availability for room ${room.id}:`,
                error
              );
              return {
                ...room,
                disponible: false,
              };
            }
          })
        );

        const habitacionesDisponibles = habitacionesConDisponibilidad.filter(
          (room) => room.disponible
        );
        setHabitacionesDisponibles(habitacionesDisponibles);
        setMostrarDisponibilidad(true);
      }
    } catch (error) {
      console.error("Error buscando disponibilidad:", error);
      setErrores({
        general: "Error al buscar disponibilidad. Intente nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const seleccionarHabitacion = (habitacion) => {
    setHabitacionSeleccionada(habitacion);
  };

  const confirmarReserva = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Debe iniciar sesión para realizar una reserva");
      navigate("/login");
      return;
    }

    if (!habitacionSeleccionada) {
      alert("Debe seleccionar una habitación");
      return;
    }

    const erroresValidados = validarFormulario();
    if (Object.keys(erroresValidados).length > 0) {
      setErrores(erroresValidados);
      return;
    }

    setLoadingReserva(true);

    try {
      const reservaData = {
        room_id: habitacionSeleccionada.id,
        nombre_huesped: formData.fullName,
        email_huesped: formData.email,
        telefono_huesped: formData.telefono,
        fecha_inicio: formData.checkIn,
        fecha_fin: formData.checkOut,
        notas: formData.notas,
      };

      const response = await reservationsAPI.create(reservaData);

      if (response.data.success) {
        alert("¡Reserva creada exitosamente!");
        // Redirigir al perfil del usuario para ver sus reservas
        if (user.rol === "administrador") {
          navigate("/admin/reservations");
        } else {
          navigate("/perfilLa");
        }
      } else {
        setErrores({
          general: response.data.message || "Error al crear la reserva",
        });
      }
    } catch (error) {
      console.error("Error creando reserva:", error);
      if (error.response?.data?.message) {
        setErrores({ general: error.response.data.message });
      } else {
        setErrores({
          general: "Error al crear la reserva. Intente nuevamente.",
        });
      }
    } finally {
      setLoadingReserva(false);
    }
  };

  return (
    <>
      <Nav />
      <Carrusel />
      <div className="reservation-form-container">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title mb-4">Reserve su estancia</h2>
            <p className="card-text mb-4">
              Complete el formulario a continuación para reservar su habitación.
            </p>

            {errores.general && (
              <div className="alert alert-danger">{errores.general}</div>
            )}

            <form>
              {/* Campo: Nombre */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="fullName" className="form-label">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errores.fullName ? "is-invalid" : ""
                    }`}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={isAuthenticated} // Deshabilitar si está autenticado
                  />
                  {errores.fullName && (
                    <div className="invalid-feedback">{errores.fullName}</div>
                  )}
                </div>

                {/* Campo: Check-in */}
                <div className="col-md-6">
                  <label htmlFor="checkIn" className="form-label">
                    Fecha de check-in
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errores.checkIn ? "is-invalid" : ""
                    }`}
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errores.checkIn && (
                    <div className="invalid-feedback">{errores.checkIn}</div>
                  )}
                  <small className="text-muted">
                    Seleccionado: {formatDateForDisplay(formData.checkIn)}
                  </small>
                </div>
              </div>

              {/* Campo: Tipo de habitación + Email */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="roomType" className="form-label">
                    Tipo de habitación
                  </label>
                  <select
                    className={`form-control ${
                      errores.roomType ? "is-invalid" : ""
                    }`}
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleInputChange}
                  >
                    <option value="Selecciona">Selecciona una opción</option>
                    <option value="estándar">Estándar</option>
                    <option value="doble">Doble</option>
                    <option value="triple">Triple</option>
                    <option value="matrimonial">Matrimonial</option>
                    <option value="suite">Suite</option>
                  </select>
                  {errores.roomType && (
                    <div className="invalid-feedback">{errores.roomType}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errores.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isAuthenticated} // Deshabilitar si está autenticado
                  />
                  {errores.email && (
                    <div className="invalid-feedback">{errores.email}</div>
                  )}
                </div>
              </div>

              {/* Campo: Check-out + Teléfono */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="checkOut" className="form-label">
                    Fecha de check-out
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errores.checkOut ? "is-invalid" : ""
                    }`}
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    min={formData.checkIn}
                  />
                  {errores.checkOut && (
                    <div className="invalid-feedback">{errores.checkOut}</div>
                  )}
                  <small className="text-muted">
                    Seleccionado: {formatDateForDisplay(formData.checkOut)}
                  </small>
                </div>

                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errores.telefono ? "is-invalid" : ""
                    }`}
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="+1234567890"
                    disabled={isAuthenticated} // Deshabilitar si está autenticado
                  />
                  {errores.telefono && (
                    <div className="invalid-feedback">{errores.telefono}</div>
                  )}
                </div>
              </div>

              {/* Campo: Huéspedes + Notas */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="guests" className="form-label">
                    Número de huéspedes
                  </label>
                  <select
                    className={`form-control ${
                      errores.guests ? "is-invalid" : ""
                    }`}
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                  >
                    <option value="Selecciona">Selecciona una opción</option>
                    <option value="1 persona">1 persona</option>
                    <option value="2 personas">2 personas</option>
                    <option value="3 personas">3 personas</option>
                    <option value="4 personas">4 personas</option>
                  </select>
                  {errores.guests && (
                    <div className="invalid-feedback">{errores.guests}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="notas" className="form-label">
                    Notas especiales (opcional)
                  </label>
                  <textarea
                    className="form-control"
                    name="notas"
                    value={formData.notas}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Solicitudes especiales, preferencias, etc."
                  />
                </div>
              </div>

              {/* Botón para buscar disponibilidad */}
              <div className="boton-nuevo mt-3">
                <button
                  type="button"
                  onClick={buscarDisponibilidad}
                  disabled={loading}
                >
                  {loading ? "Buscando..." : "Buscar disponibilidad"}
                </button>
              </div>

              {/* Resultado de disponibilidad */}
              {mostrarDisponibilidad && (
                <div className="availability-section mb-4">
                  <h5 className="mb-3">Habitaciones Disponibles</h5>

                  {habitacionesDisponibles.length === 0 ? (
                    <div className="alert alert-warning">
                      <p>
                        No hay habitaciones disponibles del tipo "
                        {formData.roomType}" para las fechas seleccionadas.
                      </p>
                      <p>Intente con otras fechas o tipo de habitación.</p>
                    </div>
                  ) : (
                    <>
                      <p className="mb-3">
                        Encontramos{" "}
                        <strong>{habitacionesDisponibles.length}</strong>{" "}
                        habitaciones disponibles para{" "}
                        <strong>
                          {calcularNoches(formData.checkIn, formData.checkOut)}{" "}
                          noches
                        </strong>
                      </p>

                      <div className="habitaciones-grid">
                        {habitacionesDisponibles.map((habitacion) => (
                          <div
                            key={habitacion.id}
                            className={`habitacion-card ${
                              habitacionSeleccionada?.id === habitacion.id
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => seleccionarHabitacion(habitacion)}
                          >
                            <div className="habitacion-info">
                              <h6>Habitación #{habitacion.numero}</h6>
                              <p>
                                <strong>Tipo:</strong>{" "}
                                {habitacion.tipo.charAt(0).toUpperCase() +
                                  habitacion.tipo.slice(1)}
                              </p>
                              <p>
                                <strong>Capacidad:</strong>{" "}
                                {habitacion.capacidad} personas
                              </p>
                              <p>
                                <strong>Precio por noche:</strong> $
                                {Number(habitacion.precio).toFixed(2)}
                              </p>
                              <p>
                                <strong>Total:</strong> $
                                {(
                                  Number(habitacion.precio) *
                                  calcularNoches(
                                    formData.checkIn,
                                    formData.checkOut
                                  )
                                ).toFixed(2)}
                              </p>
                            </div>
                            {habitacionSeleccionada?.id === habitacion.id && (
                              <div className="selected-badge">
                                ✓ Seleccionada
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {habitacionSeleccionada && (
                        <div className="mt-4">
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={confirmarReserva}
                            disabled={loadingReserva}
                          >
                            {loadingReserva
                              ? "Procesando reserva..."
                              : "Confirmar Reserva"}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Mensaje para usuarios no autenticados */}
              {!isAuthenticated && (
                <div className="alert alert-info mt-3">
                  <p>
                    <strong>¿Ya tienes cuenta?</strong>{" "}
                    <a href="/login">Inicia sesión</a> para una experiencia más
                    rápida.
                  </p>
                  <p>
                    <strong>¿Nuevo usuario?</strong>{" "}
                    <a href="/register">Regístrate</a> para gestionar tus
                    reservas.
                  </p>
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
