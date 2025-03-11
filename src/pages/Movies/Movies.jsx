import {useEffect, useState, useContext} from 'react'
import { CardMovie } from '../../components/CardMovie'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import {Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom'

const Movies = () => {
  const navigate = useNavigate(); //Para volver a películas
  
  // const { id } = useParams();
  const { auth, role, loading } = useContext(AuthContext);
  const [movies, setMovies] = useState([]); // De base es un array donde entrarán las películas

  const fetchMovies = async () => {
    try {
      const res = await axios.get('https://nodejs-api-o7k7.onrender.com/movies', {
        headers: { 'Authorization': `Bearer ${auth}` },
      });

      setMovies(res.data); // Guardamos las películas
    } catch (err) {
      console.log('Error al obtener películas: ', err);
    }
  };

   // Use useEffect to trigger navigation only after the first render
   useEffect(() => {
    if (!auth) {
      navigate('/users/login'); // Redirect to login if the user is not authenticated
    } else {
      fetchMovies();  // Fetch movies only if authenticated
    }
  }, [auth]);

  const deleteMovie = async (movieId) => {
    console.log('Borrar', movieId)

    try{
      const res = await axios.delete(`https://nodejs-api-o7k7.onrender.com/movies/${movieId}`, {
        headers: { 'Authorization': `Bearer ${auth}` },
      });

      fetchMovies();
      navigate('/movies');
      // console.log(res.data)
    }catch (error){
      console.log('Error al eliminar la película: ' , error)
    }

  }

    // Evitar renderizado antes de que role y auth estén disponibles
    if (loading) {
      return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtiene auth y role
    }
    
  return (
    <div className="movies-container">
       {auth && role === "admin" && (
        <>
        <h4 className='mt-3'>Funciones de administrador</h4>
        <Link className='btn btn-primary' to={`/movies/add`}>Agregar nueva película</Link>
        </>
      )}

      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie._id} className='mt-3'>
            <CardMovie
              title={movie.title}
              description={movie.description}
              genre={movie.genre.map((genre) => genre.name).join(", ")}
            />
            <div className='buttons-movie'>
            <Link className='btn btn-primary' to={`/movies/${movie._id}`}>Ver detalle</Link>
            {role === 'admin' && (
              <button className='btn btn-danger' onClick={()=>deleteMovie(movie._id)}>Eliminar película</button>
            )}
            </div>
          </div>
        ))
      ) : (
        <p>No se pueden ver las películas. Recuerda que debes iniciar sesión para poder visualizar nuestro contenido.</p>
      )}

     


    </div>
  );
}


export  {Movies}

