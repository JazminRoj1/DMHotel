"use client";

import { useState, useEffect } from "react";
import { reservationsAPI } from "../../services/api";
import "./Gestionres.css";

const GestionReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      setLoading(true);
      const response = await reservationsAPI.getAll();
      if (response.data.success) {
        setReservas(response.data.data.reservations);
      } else {
        setError("Error al cargar reservas");
      }
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (index) => {
    const reserva = reservas[index];

    if (reserva.estado === "cancelada") {
      alert("Esta reserva ya está cancelada");
      return;
    }

    if (!window.confirm("¿Cancelar esta reserva?")) return;

    try {
      const response = await reservationsAPI.cancel(reserva.id);
      if (response.data.success) {
        alert("Reserva cancelada exitosamente");
        await fetchReservas(); // Recargar la lista
      }
    } catch (error) {
      console.error("Error canceling reservation:", error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Error al cancelar reserva");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES");
  };

  const calcularEstadisticas = () => {
    const confirmadas = reservas.filter(
      (r) => r.estado === "confirmada"
    ).length;
    const canceladas = reservas.filter((r) => r.estado === "cancelada").length;
    const ingresos = reservas
      .filter((r) => r.estado === "confirmada")
      .reduce((acc, r) => acc + Number.parseFloat(r.total), 0);

    return { confirmadas, canceladas, ingresos };
  };

  if (loading) return <div>Cargando reservas...</div>;
  if (error) return <div>Error: {error}</div>;

  const { confirmadas, canceladas, ingresos } = calcularEstadisticas();

  return (
    <div className="contenedor-reservas">
      <h2>Gestión de Reservas</h2>

      <div className="estadisticas-reservas">
        <div className="bloque-estadistica">
          <span className="label">Total:</span> {reservas.length}
        </div>
        <div className="bloque-estadistica">
          <span className="label">Confirmadas:</span> {confirmadas}
        </div>
        <div className="bloque-estadistica">
          <span className="label">Canceladas:</span> {canceladas}
        </div>
        <div className="bloque-estadistica">
          <span className="label">Ingresos Total:</span> ${ingresos.toFixed(2)}
        </div>
      </div>

      {reservas.length === 0 ? (
        <p>No hay reservas registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Habitación</th>
              <th>Huésped</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r, i) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.user_nombre}</td>
                <td>
                  Habitación {r.room_numero} ({r.room_tipo})
                </td>
                <td>{r.nombre_huesped}</td>
                <td>{r.email_huesped}</td>
                <td>{r.telefono_huesped}</td>
                <td>{formatDate(r.fecha_inicio)}</td>
                <td>{formatDate(r.fecha_fin)}</td>
                <td>${Number.parseFloat(r.total).toFixed(2)}</td>
                <td>
                  <span className={`estado ${r.estado}`}>{r.estado}</span>
                </td>
                <td>
                  {r.estado === "confirmada" ? (
                    <button
                      className="btn-eliminar"
                      onClick={() => cambiarEstado(i)}
                    >
                      Cancelar
                    </button>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GestionReservas;
