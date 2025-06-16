import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DMHotels } from './DMHotels'
import "./style.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UsuarioProvider } from './components/Context/UsuarioContext.jsx'; //Context para manejar el estado del usuario
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import Servicios from './views/Servicios/Servicios'
import Contacto from './views/Contacto/Contacto'
import Habitaciones from './views/Habitaciones/Habitaciones'
import Reservas from "./views/ReservasForm/Reservas"
import ReservasList from "./views/ReservasList/ReservasList"
import PerfilLa from './components/PerfilLayout/Perfilla.jsx'; // Importa el componente de perfil
import PerfilEdit from './views/PerfilEdit/PerfilEdit.jsx'; // Importa el componente de edición de perfil
import PerfilRes from './views/PerfilRes/PerfilRes.jsx'; // Importa el componente de perfil de reservas

const router = createBrowserRouter([
  {path:"/", element: <DMHotels />},
  {path:"/servicios", element: <Servicios />},
  {path:"/contacto", element: <Contacto />},
  {path:"/login", element: <Login />},
  {path:"/register", element: <Register />},
  {path:"/habitaciones", element: <Habitaciones />}, 
  {path:"/Reservas", element: <Reservas />},
  {path:"/ReservasList", element: <ReservasList />},
  {path:"/PerfilLa", element: <PerfilLa />},
  {path:"/PerfilEdit", element: <PerfilEdit />},
  {path:"/PerfilRes", element: <PerfilRes />},  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UsuarioProvider>
      <RouterProvider router={router} />
    </UsuarioProvider>
  </React.StrictMode>,
)
