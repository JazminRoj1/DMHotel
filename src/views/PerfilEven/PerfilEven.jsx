import React, { useEffect, useState } from 'react';
import './PerfilEven.css';

const PerfilEven = () => {
  const [eventos, setEventos] = useState([]);
  const [asistencias, setAsistencias] = useState({});
  const [loading, setLoading] = useState(true);

  const sampleEventos = [
    {
      id: 1,
      nombre: "Cena temática japonesa",
      descripcion: "Un cena inolvidable que no puedes perderte!",
      fecha: "2025-07-08",
      lugar: "Comedor central",
      capacidad: 10,
      inscritos: 6,
      puntos:10
    },
    {
      id: 2,
      nombre: "Noche de karaoke",
      descripcion: "Pon a prueba tus habilidades de canto con nosotros.",
      fecha: "2025-07-15",
      lugar: "Sala de eventos",
      capacidad: 15,
      inscritos: 12,
      puntos: 20
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setEventos(sampleEventos);
      // Crea el estado inicial de asistencias en falso
      const estadoInicial = {};
      sampleEventos.forEach(ev => estadoInicial[ev.id] = false);
      setAsistencias(estadoInicial);
      setLoading(false);
    }, 500);
  }, []);

  const toggleAsistencia = (eventoId) => {
    setEventos(prev =>
      prev.map(evento => {
        if (evento.id === eventoId) {
          const yaInscrito = asistencias[eventoId];
          const nuevosInscritos = yaInscrito ? evento.inscritos - 1 : evento.inscritos + 1;
          return { ...evento, inscritos: nuevosInscritos };
        }
        return evento;
      })
    );

    setAsistencias(prev => ({
      ...prev,
      [eventoId]: !prev[eventoId]
    }));
  };

  if (loading) {
    return <p className="text-center">Cargando eventos...</p>;
  }

  return (
    <div className="evento-list-container">
      <h2 className="titulo-form">Eventos Disponibles</h2>
      <p className="card-text mb-4">Aquí puedes ver e inscribirte a nuestros próximos eventos.</p>

      <div className="eventos-grid">
        {eventos.map(evento => (
          <div key={evento.id} className="evento-card">
            <div className="evento-header">
              <h5>Evento: {evento.nombre}</h5>
            </div>

            <div className="evento-details">
              <div className="detail-group">
                <span className="detail-label">Descripción:</span>
                <span className="detail-value">{evento.descripcion}</span>
              </div>
              <div className="detail-group">
                <span className="detail-label">Fecha:</span>
                <span className="detail-value">{evento.fecha}</span>
              </div>
              <div className="detail-group">
                <span className="detail-label">Lugar:</span>
                <span className="detail-value">{evento.lugar}</span>
              </div>
              <div className="detail-group">
                <span className="detail-label">Asistencia:</span>
                <span className="detail-value">{evento.inscritos} / {evento.capacidad}</span>
              </div>
              <div className="detail-group">
                <span className="detail-label">Puntos:</span>
                <span className="detail-value">{evento.puntos}</span>
              </div>
            </div>

            <div className="evento-actions">
              {evento.inscritos < evento.capacidad || asistencias[evento.id] ? (
                <button
                  className="btn-asistir"
                  onClick={() => toggleAsistencia(evento.id)}
                >
                  {asistencias[evento.id] ? 'Cancelar asistencia' : 'Asistir'}
                </button>
              ) : (
                <button className="btn-asistir" disabled>
                  Cupo lleno
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfilEven;
