import "./PerfilUser.css";
import { useUsuario } from "../../components/Context/UsuarioContext.jsx";

const PerfilUser = ({ setVista }) => {
  const { usuario } = useUsuario(); // 🔗 Accede al usuario desde el contexto
  const primerNombre = usuario?.nombres?.split(" ")[0] || "";

  // 🧠 Lógica para calcular membresía según los puntos
  const puntos = usuario?.puntos || 0;

  const calcularMembresia = (puntos) => {
    if (puntos >= 500) return "Elite";
    if (puntos >= 100) return "Premium";
    return "Estándar";
  };

  const membresia = calcularMembresia(puntos); // 🏷️ Resultado final de membresía

  return (
    <div className="perfil-usuario">
      <h2 className="titulo-perfil">Perfil de Usuario</h2>

      <div className="card-perfil">
        <div className="perfil-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Foto de perfil"
            className="foto-usuario"
          />
          <div className="datos-usuario">
            <h3 className="nombre-usuario">{primerNombre}</h3>
            <p className="email-usuario">{usuario?.email || "Sin correo"}</p>
          </div>

        </div>

        <div className="bloque-info">
          <h4 className="titulo-bloque">Estado de Lealtad</h4>
          {/* 🏅 Mostrar membresía y puntos dinámicamente */}
          <p><strong>Membresía:</strong> {membresia}</p>
          <p><strong>Puntos acumulados:</strong> {puntos}</p>
        </div>

        <div className="bloque-info">
          <h4 className="titulo-bloque">Historial de Reservas</h4>
          <p>No hay reservas anteriores.</p>
        </div>

        <div className="botones-perfil">
          <button className="btn-editar" onClick={() => setVista('informacion')}>
            Editar Perfil
          </button>

          <button className="btn-nueva-habitacion">+ Nueva Habitación</button>
        </div>
      </div>
    </div>
  );
};

export default PerfilUser;
