
// src/context/UsuarioContext.jsx
import { createContext, useState, useContext } from "react";

// Creamos el contexto
const UsuarioContext = createContext();

// Hook personalizado para usar el contexto
export const useUsuario = () => useContext(UsuarioContext);

// Componente que provee el contexto
export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = (usuarioData) => setUsuario(usuarioData);
  const logout = () => setUsuario(null);

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
};
