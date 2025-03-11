import {useContext, useEffect} from 'react'
import { Movies } from '../Movies/Movies'
import { AuthContext } from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'


const Home = () => {

  const {user} = useContext(AuthContext);

  const navigate = useNavigate();

  /* Si no está logeado, redirigimos al login */
  useEffect(() => {
    if (!user) {
      navigate('/users/login');
    }  }, []) 
  


  return (
    <div>
        {user && <h1>Hola {user.name}!</h1>}

            <h2>¿Qué deseas ver hoy?</h2>

            {/* <h3>Géneros</h3> */}
            {/* Listado de géneros para filtrar por género */}
            
            <h3>Películas</h3>
            {/* Listado de todas las peliculas */}
            
            <Movies/>
        
    </div>

)
}

export  {Home}
