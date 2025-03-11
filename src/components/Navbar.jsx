import { useContext } from 'react'
import { NavLink } from "react-router-dom"
import { AuthContext } from '../context/AuthContext'


const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { auth, role} = useContext(AuthContext);

  console.log('user', user)

  return (
    <nav>
    <ul>
      <li className='navbar-brand'><span className='logo-text'>MoviePicker</span></li>
        <li><NavLink to="/">Inicio</NavLink></li>
        <li><NavLink to="/movies">Películas</NavLink></li>
        <li><NavLink to="/genres">Géneros</NavLink></li>
        {auth && role === "admin" && (
        <>
        <li><NavLink to="/users">Usuarios</NavLink></li>
        </>
      )}


        {
          user ? (
            <>
              <li><button className='btn btn-primary logout' onClick={logoutUser}>Cerrar sesión</button></li> 
            </>
          ) : (
            <li><NavLink to="/users/login">Iniciar sesión</NavLink></li>
          )}
    </ul>
   </nav> 
  )
}

export {Navbar}

