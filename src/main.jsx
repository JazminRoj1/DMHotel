import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DMHotels } from './DMHotels'
import "./style.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import Hotel from './views/Hotel/Hotel'  
import Habitaciones from "./views/Habitaciones/Habitacion";

const router = createBrowserRouter([
  {path:"/", element: <DMHotels />},
  {path:"/Hotel", element: <Hotel />},
  {path:"/login", element: <Login />},
  {path:"/register", element: <Register />},
  {path:"/habitaciones", element: <Habitaciones />}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} >
      <DMHotels />
    </RouterProvider>
  </React.StrictMode>,
)
