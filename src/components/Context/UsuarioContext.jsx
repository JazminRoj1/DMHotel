import { createContext, useState, useContext, useEffect } from "react";

const UsuarioContext = createContext();

export const useUsuario = () => useContext(UsuarioContext);

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = (usuarioData) => {
    setUsuario(usuarioData);
    localStorage.setItem("usuario", JSON.stringify(usuarioData)); // 🔐 Guardar el usuario
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario"); // 🔐 Limpiar
  };
  
  // ✅ Esto evita que se recuerde el login anterior
  useEffect(() => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  }, []);


  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
};

