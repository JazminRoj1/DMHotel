import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DMHotels } from './DMHotels'
import "./style.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './views/Register/Register'
import Login from './views/Login/Login'

import Servicios from './views/Servicios/Servicios'
import Contacto from './views/Contacto/Contacto'
import Habitaciones from './views/Habitaciones/Habitaciones'
import Reservas from "./views/Reservas/Reservas"

const router = createBrowserRouter([
  {path:"/", element: <DMHotels />},
  {path:"/servicios", element: <Servicios />},
  {path:"/contacto", element: <Contacto />},
  {path:"/login", element: <Login />},
  {path:"/register", element: <Register />},
  {path:"/habitaciones", element: <Habitaciones />},
  {path:"/Reservas", element: <Reservas />},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} >
      <DMHotels />
    </RouterProvider>
  </React.StrictMode>,
)
