import React from "react";
import "./Dashboard.css";

const DashboardAdmin = () => {
  // Valores simulados
  const totalHabitaciones = 10;
  const habitacionesDisponibles = 8;
  const reservasActivas = 0;
  const eventosProximos = 0;
  const ingresosMes = 760;
  const ocupacionPromedio = Math.round(((totalHabitaciones - habitacionesDisponibles) / totalHabitaciones) * 100);

  return (
    <div className="dashboard-container">
      <h2>Dashboard Administrativo</h2>

      <div className="dashboard-grid">
        <div className="card">
          <span>Total Habitaciones</span>
          <p className="valor azul">{totalHabitaciones}</p>
        </div>

        <div className="card">
          <span>Habitaciones Disponibles</span>
          <p className="valor verde">{habitacionesDisponibles}</p>
        </div>

        <div className="card">
          <span>Reservas Activas</span>
          <p className="valor naranja">{reservasActivas}</p>
        </div>

        <div className="card">
          <span>Eventos Próximos</span>
          <p className="valor celeste">{eventosProximos}</p>
        </div>

        <div className="card">
          <span>Ingresos del Mes</span>
          <p className="valor verde">${ingresosMes}</p>
        </div>

        <div className="card">
          <span>Ocupación Promedio</span>
          <p className="valor morado">{ocupacionPromedio}%</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
