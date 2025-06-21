import React, { useState, useEffect } from "react";
import "./Gestioneven.css";

const GestionEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);
  const [nuevoEvento, setNuevoEvento] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    lugar: "",
    asistentes: 0,
    maxAsistentes: 0,
    puntos: 0,
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    setEventos([
      {
        titulo: "Cena de Gala",
        descripcion: "Cena especial con música en vivo y menú gourmet",
        fecha: "2024-02-14",
        hora: "19:00",
        lugar: "Salón Principal",
        asistentes: 2,
        maxAsistentes: 50,
        puntos: 10,
      },
      {
        titulo: "Clase de Yoga",
        descripcion: "Sesión de yoga matutina para huéspedes",
        fecha: "2024-02-15",
        hora: "07:00",
        lugar: "Jardín del Hotel",
        asistentes: 3,
        maxAsistentes: 20,
        puntos: 20,
      },
    ]);
  }, []);

  const handleEliminar = (index) => {
    if (window.confirm("¿Eliminar este evento?")) {
      const nuevos = eventos.filter((_, i) => i !== index);
      setEventos(nuevos);
    }
  };

  const abrirFormularioNuevo = () => {
    setModoEdicion(false);
    setIndiceEditando(null);
    setNuevoEvento({
      titulo: "",
      descripcion: "",
      fecha: "",
      hora: "",
      lugar: "",
      asistentes: 0,
      maxAsistentes: 0,
      puntos: 0,
    });
    setMostrarFormulario(true);
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!nuevoEvento.titulo.trim()) nuevosErrores.titulo = "El título es obligatorio.";
    if (!nuevoEvento.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
    if (!nuevoEvento.fecha) nuevosErrores.fecha = "La fecha es obligatoria.";
    if (!nuevoEvento.hora) nuevosErrores.hora = "La hora es obligatoria.";
    if (!nuevoEvento.lugar.trim()) nuevosErrores.lugar = "El lugar es obligatorio.";
    if (!nuevoEvento.maxAsistentes || nuevoEvento.maxAsistentes <= 0)
      nuevosErrores.maxAsistentes = "Debes ingresar un número mayor a 0.";
    if (!nuevoEvento.puntos) nuevosErrores.puntos = "Los puntos son obligatorios.";
  
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  

  const abrirFormularioEditar = (index) => {
    setModoEdicion(true);
    setIndiceEditando(index);
    setNuevoEvento(eventos[index]);
    setMostrarFormulario(true);
  };

  const handleGuardarEvento = () => {
    if (!validarFormulario()) return;
  
    if (modoEdicion && indiceEditando !== null) {
      const actualizados = [...eventos];
      actualizados[indiceEditando] = nuevoEvento;
      setEventos(actualizados);
    } else {
      setEventos([...eventos, nuevoEvento]);
    }
  
    setNuevoEvento({
      titulo: "",
      descripcion: "",
      fecha: "",
      hora: "",
      lugar: "",
      asistentes: 0,
      maxAsistentes: 0,
      puntos: 0,
    });
    setModoEdicion(false);
    setIndiceEditando(null);
    setMostrarFormulario(false);
    setErrores({});
  };
  

  return (
    <div className="contenedor-eventos">
      <h2>Gestión de Eventos</h2>

      <div className="boton-nuevo">
        <button onClick={abrirFormularioNuevo}>+ Nuevo Evento</button>
      </div>

      <div className="tarjetas-eventos">
        {eventos.map((evento, i) => (
          <div key={i} className="tarjeta-evento">
            <h4>{evento.titulo}</h4>
            <p>{evento.descripcion}</p>
            <p><strong>Fecha:</strong> {evento.fecha}</p>
            <p><strong>Hora:</strong> {evento.hora}</p>
            <p><strong>Lugar:</strong> {evento.lugar}</p>
            <p className="asistentes">
              <strong>Asistentes:</strong> {evento.asistentes} / {evento.maxAsistentes}
            </p>
            <p><strong>Puntos:</strong> {evento.puntos}</p>

            <div className="botones-evento">
              <button className="btn-editar" onClick={() => abrirFormularioEditar(i)}>Editar</button>
              <button className="btn-eliminar" onClick={() => handleEliminar(i)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {mostrarFormulario && (
        <div className="modal-form">
          <div className="formulario-crear">
            <h3>{modoEdicion ? "Editar Evento" : "Nuevo Evento"}</h3>
            <input
              type="text"
              placeholder="Título"
              value={nuevoEvento.titulo}
              onChange={(e) => setNuevoEvento({ ...nuevoEvento, titulo: e.target.value })}
              className={errores.titulo ? "input-error" : ""}
            />
            {errores.titulo && <span className="error">{errores.titulo}</span>}

            <textarea
              placeholder="Descripción"
              value={nuevoEvento.descripcion}
              onChange={(e) => setNuevoEvento({ ...nuevoEvento, descripcion: e.target.value })}
              className={errores.descripcion ? "input-error" : ""}
            />
            {errores.descripcion && <span className="error">{errores.descripcion}</span>}

            <input
              type="date"
              value={nuevoEvento.fecha}
              onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })}
              className={errores.fecha ? "input-error" : ""}
            />
            {errores.fecha && <span className="error">{errores.fecha}</span>}

            <input
              type="time"
              value={nuevoEvento.hora}
              onChange={(e) => setNuevoEvento({ ...nuevoEvento, hora: e.target.value })}
              className={errores.hora ? "input-error" : ""}
            />
            {errores.hora && <span className="error">{errores.hora}</span>}

            <input
              type="text"
              placeholder="Lugar"
              value={nuevoEvento.lugar}
              onChange={(e) => setNuevoEvento({ ...nuevoEvento, lugar: e.target.value })}
              className={errores.lugar ? "input-error" : ""}
            />
            {errores.lugar && <span className="error">{errores.lugar}</span>}

            <div className="input-con-fondo" style={{ position: "relative" }}>
              {!nuevoEvento.maxAsistentes && (
                <span className="texto-fondo-ejemplo">Máx. asistentes</span>
              )}
              
              <input
                type="number"
                placeholder=""
                value={nuevoEvento.maxAsistentes === 0 ? "" : nuevoEvento.maxAsistentes}
                onChange={(e) =>
                  setNuevoEvento({
                    ...nuevoEvento,
                    maxAsistentes: e.target.value === "" ? 0 : parseInt(e.target.value),
                  })
                }
                className={errores.maxAsistentes ? "input-error" : ""}
              />
            </div>

            {errores.maxAsistentes && <span className="error">{errores.maxAsistentes}</span>}

            <div className="input-con-fondo" style={{ position: "relative" }}>
              {!nuevoEvento.puntos && (
                <span className="texto-fondo-ejemplo">Puntos</span>
              )}

              <input
                type="number"
                placeholder=""
                value={nuevoEvento.puntos === 0 ? "" : nuevoEvento.puntos}
                onChange={(e) =>
                  setNuevoEvento({
                    ...nuevoEvento,
                    puntos: e.target.value === "" ? 0 : parseInt(e.target.value),
                  })
                }
                className={errores.puntos ? "input-error" : ""}
              />
            </div>
            {errores.puntos && <span className="error">{errores.puntos}</span>}


            <div className="form-buttons">
              <button onClick={handleGuardarEvento}>
                {modoEdicion ? "Actualizar" : "Guardar"}
              </button>
              <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionEventos;
