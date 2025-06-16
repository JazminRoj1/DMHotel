import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer.jsx";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    dni: "",
    telefono: "",
    password: ""
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    const nuevosErrores = { ...errores };

    switch (name) {
      case "nombres":
      case "apellidos":
        nuevosErrores[name] = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,}$/.test(value)
          ? ""
          : "Debe tener solo letras y al menos 2 caracteres.";
        break;
      case "email":
        nuevosErrores.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Correo electrónico inválido.";
        break;
      case "dni":
        nuevosErrores.dni = /^[0-9]{8}$/.test(value)
          ? ""
          : "DNI inválido (exactamente 8 números).";
        break;
      case "telefono":
        nuevosErrores.telefono = /^[0-9]{9,}$/.test(value)
          ? ""
          : "Teléfono inválido (solo números, mínimo 9 dígitos).";
        break;
      case "password":
        nuevosErrores.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value)
          ? ""
          : "Contraseña débil (min 6, mayúscula, minúscula y número).";
        break;
      default:
        break;
    }

    setErrores(nuevosErrores);
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
  
	// 🔍 Validar TODOS los campos de forma directa
	const nuevosErrores = {};
  
	if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,}$/.test(form.nombres)) {
	  nuevosErrores.nombres = "Debe tener solo letras y al menos 2 caracteres.";
	}
	if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,}$/.test(form.apellidos)) {
	  nuevosErrores.apellidos = "Debe tener solo letras y al menos 2 caracteres.";
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
	  nuevosErrores.email = "Correo electrónico inválido.";
	}
	if (!/^[0-9]{8}$/.test(form.dni)) {
	  nuevosErrores.dni = "DNI inválido (exactamente 8 números).";
	}
	if (!/^[0-9]{9,}$/.test(form.telefono)) {
	  nuevosErrores.telefono = "Teléfono inválido (solo números, mínimo 9 dígitos).";
	}
	if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(form.password)) {
	  nuevosErrores.password = "Contraseña débil (min 6, mayúscula, minúscula y número).";
	}
  
	const hayErrores = Object.values(nuevosErrores).some(msg => msg);
	const camposVacios = Object.values(form).some(val => val.trim() === "");
  
	setErrores(nuevosErrores); // Mostrar errores visuales
  
	if (hayErrores || camposVacios) {
	  // No se envía nada
	  return;
	}
  
	try {
		const response = await fetch("http://localhost:3000/api/usuarios", {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(form),
		});
	  
		const data = await response.json();
	  
		if (response.ok) {
		  alert("Usuario registrado correctamente.");
		  navigate("/login");
		} else {
		  if (data.mensaje && data.mensaje.includes("correo")) {
			setErrores(prev => ({ ...prev, email: data.mensaje }));
		  } else {
			alert(data.mensaje || "Error al registrar usuario.");
		  }
		}
	  } catch (error) {
		console.error("Error:", error);
		alert("No se pudo conectar al servidor.");
	  }
	};
  return (
	<div>
	  <Nav />
	  <h2>Regístrate</h2>
	  <form className="form__register" onSubmit={handleSubmit}>
		<div className="form-columns">
		  <div className="form-group">
			<label>Nombre</label>
			<input name="nombres" type="text" onChange={handleChange} />
			<small className="error">{errores.nombres || "\u00A0"}</small>
		  </div>
  
		  <div className="form-group">
			<label>Apellidos</label>
			<input name="apellidos" type="text" onChange={handleChange} />
			<small className="error">{errores.apellidos || "\u00A0"}</small>
		  </div>
  
		  <div className="form-group">
			<label>DNI</label>
			<input name="dni" type="text" onChange={handleChange} />
			<small className="error">{errores.dni || "\u00A0"}</small>
		  </div>
  
		  <div className="form-group">
			<label>Teléfono</label>
			<input name="telefono" type="text" onChange={handleChange} />
			<small className="error">{errores.telefono || "\u00A0"}</small>
		  </div>
  
		  <div className="form-group">
			<label>Correo electrónico</label>
			<input name="email" type="email" onChange={handleChange} />
			<small className="error">{errores.email || "\u00A0"}</small>
		  </div>
  
		  <div className="form-group">
			<label>Contraseña</label>
			<input name="password" type="password" onChange={handleChange} />
			<small className="error">{errores.password || "\u00A0"}</small>
		  </div>
		</div>
  
		<button className="button-submit" type="submit">Crear cuenta</button>
	  </form>
	  <Footer />
	</div>
  );
  
};

export default Register;
