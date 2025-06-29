"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verificar si el token es válido
      apiClient
        .get("/auth/me")
        .then((response) => {
          if (response.data.success) {
            setUser(response.data.data.user);
          }
        })
        .catch((error) => {
          console.error("Error verificando token:", error);
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      if (response.data.success) {
        const { user, token } = response.data.data;
        localStorage.setItem("token", token);
        setUser(user);
        return { success: true, user };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      console.error("Error en login:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error de conexión",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiClient.post("/auth/register", userData);
      if (response.data.success) {
        const { user, token } = response.data.data;
        localStorage.setItem("token", token);
        setUser(user);
        return { success: true, user };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      console.error("Error en registro:", error);

      // Manejar errores específicos de validación
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors
          .map((err) => err.message)
          .join(", ");
        return {
          success: false,
          message: `Errores de validación: ${errorMessages}`,
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || "Error de conexión",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.rol === "administrador",
    isClient: user?.rol === "cliente",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
