import React, { useState, useEffect } from "react";
import "./Gestionres.css";

const GestionReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    setReservas([
      {
        id: 1,
        cliente: "Administrador",
        habitacion: "Habitación 101 (individual)",
        huesped: "María García",
        email: "maria@email.com",
        telefono: "+1234567891",
        inicio: "2024-01-20",
        fin: "2024-01-22",
        total: 160,
        estado: "confirmada"
      },
      {
        id: 2,
        cliente: "adrian",
        habitacion: "Habitación 102 (individual)",
        huesped: "adrian",
        email: "nica20@gmail.com",
        telefono: "12341235123",
        inicio: "2025-06-18",
        fin: "2025-06-20",
        total: 160,
        estado: "cancelada"
      },
      {
        id: 3,
        cliente: "martin",
        habitacion: "Habitación 103 (dual)",
        huesped: "martin",
        email: "empty@gmail.com",
        telefono: "123456788",
        inicio: "2025-06-20",
        fin: "2025-06-23",
        total: 60,
        estado: "confirmada"
      },
    ]);
  }, []);

  const cambiarEstado = (index) => {
    const nuevas = [...reservas];
    nuevas[index].estado = nuevas[index].estado === "confirmada" ? "cancelada" : "confirmada";
    setReservas(nuevas);
  };

  const totalConfirmadas = reservas.filter(r => r.estado === "confirmada").length;
  const totalCanceladas = reservas.filter(r => r.estado === "cancelada").length;
  const ingresosTotales = reservas.filter(r => r.estado === "confirmada").reduce((acc, r) => acc + r.total, 0);

  return (
    <div className="contenedor-reservas">
      <h2>Gestión de Reservas </h2>
      <div className="estadisticas-reservas">
        <div className="bloque-estadistica">
          <span className="label">Total:</span> {reservas.length}
        </div>
        <div className="bloque-estadistica">
          <span className="label">Confirmadas:</span> {reservas.filter(r => r.estado === "confirmada").length}
        </div>
        <div className="bloque-estadistica">
          <span className="label">Canceladas:</span> {reservas.filter(r => r.estado === "cancelada").length}
        </div>
        <div className="bloque-estadistica">
          <span className="label">Ingresos Total:</span> ${reservas
            .filter(r => r.estado === "confirmada")
            .reduce((acc, r) => acc + parseFloat(r.total), 0)
            .toFixed(2)}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
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
            <tr key={i}>
              <td>{r.id}</td>
              <td>{r.cliente}</td>
              <td>{r.habitacion}</td>
              <td>{r.huesped}</td>
              <td>{r.email}</td>
              <td>{r.telefono}</td>
              <td>{r.inicio}</td>
              <td>{r.fin}</td>
              <td>${parseFloat(r.total).toFixed(2)}</td>
              <td>
                <span className={`estado ${r.estado}`}>{r.estado}</span>
              </td>
              <td>
                <button className="btn-eliminar" onClick={() => cambiarEstado(i)}>
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionReservas;
