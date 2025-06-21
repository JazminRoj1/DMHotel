import React, { useState, useEffect } from "react";
import "./Gestionhab.css";

const Gestionhab = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(null);
  const [form, setForm] = useState({
    numero: "",
    tipo: "",
    precio: "",
    capacidad: "",
    estado: "disponible",
  });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setHabitaciones([
      { numero: "1010", tipo: "estandar", precio: 80, capacidad: 1, estado: "disponible", puntos: 10 },
      { numero: "2020", tipo: "doble", precio: 120, capacidad: 2, estado: "ocupada", puntos: 20 },
    ]);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const nuevosErrores = {};
  if (!/^[0-9]{4}$/.test(form.numero)) {
    nuevosErrores.numero = "El número debe tener exactamente 4 dígitos.";
  }
  if (!form.tipo) nuevosErrores.tipo = "Selecciona un tipo de habitación.";
  if (!form.precio) nuevosErrores.precio = "El precio es obligatorio.";
  if (!form.capacidad) nuevosErrores.capacidad = "Selecciona una capacidad.";

  if (Object.keys(nuevosErrores).length > 0) {
    setErrores(nuevosErrores);
    return;
  }

  let puntos = 0;
  switch (form.tipo.toLowerCase()) {
    case "estandar": puntos = 10; break;
    case "doble": puntos = 20; break;
    case "triple": puntos = 30; break;
    case "matrimonial": puntos = 40; break;
    case "suite": puntos = 50; break;
    default: puntos = 0;
  }

  const nueva = {
    numero: form.numero,
    tipo: form.tipo,
    precio: parseFloat(form.precio).toFixed(2),
    capacidad: parseInt(form.capacidad),
    estado: form.estado,
    puntos: puntos
  };

  const duplicada = habitaciones.some((h, i) => h.numero === nueva.numero && i !== modoEdicion);
  if (duplicada) {
    alert("Ya existe una habitación con ese número.");
    return;
  }

  if (modoEdicion !== null) {
    const actualizadas = habitaciones.map((hab, i) => (i === modoEdicion ? nueva : hab));
    setHabitaciones(actualizadas);
  } else {
    setHabitaciones([...habitaciones, nueva]);
  }

  setErrores({}); // ✅ Limpia errores visibles después de un submit válido
  resetForm();    // ✅ Borra los datos del formulario
};


  const handleEditar = (index) => {
    const hab = habitaciones[index];
    setForm({
      numero: hab.numero,
      tipo: hab.tipo.toLowerCase(),
      precio: hab.precio,
      capacidad: hab.capacidad.toString(),
      estado: hab.estado,
    });
    setModoEdicion(index);
  };

  const handleEliminar = (index) => {
    if (window.confirm("¿Eliminar esta habitación?")) {
      const nuevas = habitaciones.filter((_, i) => i !== index);
      setHabitaciones(nuevas);
      if (modoEdicion === index) resetForm();
    }
  };

  const resetForm = () => {
    setForm({ numero: "", tipo: "", precio: "", capacidad: "", estado: "disponible" });
    setModoEdicion(null);
  };

  return (
    <div className="contenedor-gestion">
      <h2>Gestión de Habitaciones</h2>
      <form className="form-nueva" onSubmit={handleSubmit} noValidate>
        <div className="campo-form">
          <input
            type="text"
            name="numero"
            placeholder="Número"
            maxLength={4}
            value={form.numero}
            onChange={handleChange}
            className={errores.numero ? "input-error" : ""}
          />
          {errores.numero && <span className="error">{errores.numero}</span>}
        </div>

        <div className="campo-form">
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className={errores.tipo ? "input-error" : ""}
          >
            <option value="">Tipo de Habitación</option>
            <option value="estandar">Estándar</option>
            <option value="doble">Doble</option>
            <option value="triple">Triple</option>
            <option value="matrimonial">Matrimonial</option>
            <option value="suite">Suite</option>
          </select>
          {errores.tipo && <span className="error">{errores.tipo}</span>}
        </div>

        <div className="campo-form">
          <input
            type="number"
            name="precio"
            step="0.01"
            placeholder="Precio"
            value={form.precio}
            oonChange={(e) => {
              let value = e.target.value;
              if (!/^\d{0,4}(\.\d{0,2})?$/.test(value)) return;
              setForm({ ...form, precio: value });
            }}            
            className={errores.precio ? "input-error" : ""}
          />
          {errores.precio && <span className="error">{errores.precio}</span>}
        </div>

        <div className="campo-form">
          <select
            name="capacidad"
            value={form.capacidad}
            onChange={handleChange}
            className={errores.capacidad ? "input-error" : ""}
          >
            <option value="">Capacidad</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          {errores.capacidad && <span className="error">{errores.capacidad}</span>}
        </div>

        <div className="campo-form">
          <select name="estado" value={form.estado} onChange={handleChange}>
            <option value="disponible">Disponible</option>
            <option value="ocupada">Ocupada</option>
          </select>
        </div>

        <div className="botones-form">
          <button type="submit">{modoEdicion !== null ? "Actualizar" : "+ Nueva Habitación"}</button>
          {modoEdicion !== null && (
            <button type="button" onClick={resetForm} className="btn-cancelar">Cancelar</button>
          )}
        </div>
      </form>


      {habitaciones.length === 0 ? (
        <p>No hay habitaciones registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Número</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Capacidad</th>
              <th>Estado</th>
              <th>Puntos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map((hab, i) => (
              <tr key={i}>
                <td>{hab.numero}</td>
                <td>{hab.tipo.charAt(0).toUpperCase() + hab.tipo.slice(1).toLowerCase()}</td>
                <td>${parseFloat(hab.precio).toFixed(2)}</td>
                <td>{hab.capacidad}</td>
                <td><span className={`estado ${hab.estado}`}>{hab.estado}</span></td>
                <td>{hab.puntos}</td>
                <td>
                  <button className="btn-editar" onClick={() => handleEditar(i)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => handleEliminar(i)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Gestionhab;
