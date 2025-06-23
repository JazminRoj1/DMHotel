"use client";

import { useState, useEffect } from "react";
import { reportsAPI } from "../../services/api";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    activeReservations: 0,
    upcomingEvents: 0,
    monthlyRevenue: 0,
    occupancyRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtroTiempo, setFiltroTiempo] = useState("mes");
  const [datosIngresos, setDatosIngresos] = useState([]);
  const [datosOcupacion, setDatosOcupacion] = useState([]);
  const [datosEventos, setDatosEventos] = useState([]);
  const [habitacionesPorTipo, setHabitacionesPorTipo] = useState([]);

  const ROOM_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"];

  useEffect(() => {
    fetchDashboardData();
    fetchIngresosPorPeriodo();
    fetchDatosOcupacion();
    fetchDatosEventos();
    fetchHabitacionesPorTipo();
  }, [filtroTiempo]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getDashboard();
      if (response.data.success) {
        setStats(response.data.data);
      } else {
        setError("Error al cargar estadísticas");
      }
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const fetchIngresosPorPeriodo = async () => {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      const ingresosPorMes = [];
      for (let i = 5; i >= 0; i--) {
        let mes = currentMonth - i;
        let año = currentYear;

        if (mes <= 0) {
          mes += 12;
          año -= 1;
        }

        try {
          const response = await reportsAPI.getIncome(año, mes);
          if (response.data.success) {
            const nombreMes = new Date(año, mes - 1).toLocaleDateString(
              "es-ES",
              { month: "short" }
            );
            ingresosPorMes.push({
              mes: nombreMes,
              ingresos: response.data.data.totalIngresos,
              reservas: response.data.data.totalReservas,
            });
          }
        } catch (error) {
          console.error(`Error fetching income for ${año}-${mes}:`, error);
          const nombreMes = new Date(año, mes - 1).toLocaleDateString("es-ES", {
            month: "short",
          });
          ingresosPorMes.push({
            mes: nombreMes,
            ingresos: 0,
            reservas: 0,
          });
        }
      }
      setDatosIngresos(ingresosPorMes);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };

  const fetchDatosOcupacion = async () => {
    try {
      // Obtener datos de ocupación de los últimos 7 días
      const ocupacionPorDia = [];
      const hoy = new Date();

      for (let i = 6; i >= 0; i--) {
        const fecha = new Date(hoy);
        fecha.setDate(fecha.getDate() - i);
        const fechaStr = fecha.toISOString().split("T")[0];

        try {
          const response = await reportsAPI.getOccupancy(fechaStr, fechaStr);
          if (response.data.success) {
            const dia = fecha.toLocaleDateString("es-ES", { weekday: "short" });
            ocupacionPorDia.push({
              dia,
              ocupacion: response.data.data.tasaOcupacion,
              ocupadas: response.data.data.habitacionesOcupadas,
              disponibles: response.data.data.habitacionesDisponibles,
            });
          }
        } catch (error) {
          const dia = fecha.toLocaleDateString("es-ES", { weekday: "short" });
          ocupacionPorDia.push({
            dia,
            ocupacion: 0,
            ocupadas: 0,
            disponibles: stats.totalRooms,
          });
        }
      }
      setDatosOcupacion(ocupacionPorDia);
    } catch (error) {
      console.error("Error fetching occupancy data:", error);
    }
  };

  const fetchDatosEventos = async () => {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      const response = await reportsAPI.getEvents(currentYear, currentMonth);
      if (response.data.success) {
        const eventos = response.data.data.detalleEventos.map((evento) => ({
          nombre:
            evento.titulo.length > 15
              ? evento.titulo.substring(0, 15) + "..."
              : evento.titulo,
          asistentes: Number.parseInt(evento.asistentes_count),
          cupo: evento.cupo_maximo,
          porcentaje: Math.round(
            (evento.asistentes_count / evento.cupo_maximo) * 100
          ),
        }));
        setDatosEventos(eventos);
      }
    } catch (error) {
      console.error("Error fetching events data:", error);
    }
  };

  const fetchHabitacionesPorTipo = async () => {
    try {
      // Simular datos de habitaciones por tipo basado en las estadísticas
      const tiposHabitacion = [
        {
          tipo: "Estándar",
          cantidad: Math.round(stats.totalRooms * 0.3),
          color: ROOM_COLORS[0],
        },
        {
          tipo: "Doble",
          cantidad: Math.round(stats.totalRooms * 0.25),
          color: ROOM_COLORS[1],
        },
        {
          tipo: "Triple",
          cantidad: Math.round(stats.totalRooms * 0.2),
          color: ROOM_COLORS[2],
        },
        {
          tipo: "Matrimonial",
          cantidad: Math.round(stats.totalRooms * 0.15),
          color: ROOM_COLORS[3],
        },
        {
          tipo: "Suite",
          cantidad: Math.round(stats.totalRooms * 0.1),
          color: ROOM_COLORS[4],
        },
      ];
      setHabitacionesPorTipo(tiposHabitacion);
    } catch (error) {
      console.error("Error processing room types:", error);
    }
  };

  // Datos para el gráfico de estado de habitaciones
  const datosEstadoHabitaciones = [
    { name: "Disponibles", value: stats.availableRooms, color: "#00C49F" },
    {
      name: "Ocupadas",
      value: stats.totalRooms - stats.availableRooms,
      color: "#FF8042",
    },
  ];

  // Datos para métricas rápidas
  const ingresoPromedioPorReserva =
    datosIngresos.length > 0
      ? datosIngresos.reduce((acc, curr) => acc + curr.ingresos, 0) /
          datosIngresos.reduce((acc, curr) => acc + curr.reservas, 0) || 0
      : 0;

  const totalIngresosUltimos6Meses = datosIngresos.reduce(
    (acc, curr) => acc + curr.ingresos,
    0
  );

  if (loading)
    return <div className="loading-dashboard">Cargando dashboard...</div>;
  if (error) return <div className="error-dashboard">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard Administrativo</h2>
        <div className="filtros-tiempo">
          <button
            className={filtroTiempo === "semana" ? "active" : ""}
            onClick={() => setFiltroTiempo("semana")}
          >
            Semana
          </button>
          <button
            className={filtroTiempo === "mes" ? "active" : ""}
            onClick={() => setFiltroTiempo("mes")}
          >
            Mes
          </button>
          <button
            className={filtroTiempo === "año" ? "active" : ""}
            onClick={() => setFiltroTiempo("año")}
          >
            Año
          </button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="dashboard-grid">
        <div className="card azul">
          <span>Total Habitaciones</span>
          <p className="valor">{stats.totalRooms}</p>
          <small>Inventario total</small>
        </div>

        <div className="card verde">
          <span>Habitaciones Disponibles</span>
          <p className="valor">{stats.availableRooms}</p>
          <small>
            {((stats.availableRooms / stats.totalRooms) * 100).toFixed(1)}%
            disponible
          </small>
        </div>

        <div className="card naranja">
          <span>Reservas Activas</span>
          <p className="valor">{stats.activeReservations}</p>
          <small>En curso ahora</small>
        </div>

        <div className="card celeste">
          <span>Eventos Próximos</span>
          <p className="valor">{stats.upcomingEvents}</p>
          <small>Próximos 30 días</small>
        </div>

        <div className="card verde">
          <span>Ingresos del Mes</span>
          <p className="valor">${stats.monthlyRevenue.toFixed(2)}</p>
          <small>Mes actual</small>
        </div>

        <div className="card morado">
          <span>Ocupación Promedio</span>
          <p className="valor">{stats.occupancyRate}%</p>
          <small>Tasa actual</small>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="graficos-grid">
        {/* Gráfico de ingresos por mes */}
        <div className="grafico-card">
          <h3>Ingresos por Mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={datosIngresos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, "Ingresos"]} />
              <Area
                type="monotone"
                dataKey="ingresos"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de ocupación por día */}
        <div className="grafico-card">
          <h3>Ocupación por Día (Última Semana)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosOcupacion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, "Ocupación"]} />
              <Bar dataKey="ocupacion" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico circular de estado de habitaciones */}
        <div className="grafico-card">
          <h3>Estado de Habitaciones</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={datosEstadoHabitaciones}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {datosEstadoHabitaciones.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de habitaciones por tipo */}
        <div className="grafico-card">
          <h3>Habitaciones por Tipo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={habitacionesPorTipo}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="cantidad"
                label={({ tipo, cantidad }) => `${tipo}: ${cantidad}`}
              >
                {habitacionesPorTipo.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de eventos y asistencia */}
        {datosEventos.length > 0 && (
          <div className="grafico-card">
            <h3>Eventos del Mes - Asistencia</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosEventos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="asistentes" fill="#8884d8" name="Asistentes" />
                <Bar dataKey="cupo" fill="#82ca9d" name="Cupo Total" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Tendencia de reservas */}
        <div className="grafico-card">
          <h3>Tendencia de Reservas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datosIngresos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="reservas"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Métricas adicionales */}
      <div className="metricas-adicionales">
        <div className="metrica-card">
          <h4>Ingreso Promedio por Reserva</h4>
          <p className="valor-grande">
            ${ingresoPromedioPorReserva.toFixed(2)}
          </p>
        </div>

        <div className="metrica-card">
          <h4>Total Ingresos (6 meses)</h4>
          <p className="valor-grande">
            ${totalIngresosUltimos6Meses.toFixed(2)}
          </p>
        </div>

        <div className="metrica-card">
          <h4>Habitaciones Ocupadas</h4>
          <p className="valor-grande">
            {stats.totalRooms - stats.availableRooms}
          </p>
        </div>

        <div className="metrica-card">
          <h4>Eficiencia de Eventos</h4>
          <p className="valor-grande">
            {datosEventos.length > 0
              ? `${Math.round(
                  datosEventos.reduce((acc, curr) => acc + curr.porcentaje, 0) /
                    datosEventos.length
                )}%`
              : "0%"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
