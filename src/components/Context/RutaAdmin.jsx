import { useUsuario } from './UsuarioContext';
import { Navigate } from 'react-router-dom';

const RutaAdmin = ({ children }) => {
  const { usuario } = useUsuario();

  if (usuario?.email === 'admin@dmhoteles.com') {
    return children;
  } else {
    return <Navigate to="/no-autorizado" />;
  }
};

export default RutaAdmin;
