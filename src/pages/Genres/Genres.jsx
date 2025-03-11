import {useEffect, useState, useContext} from 'react'
import { CardGenre } from '../../components/CardGenre'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import {Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom'
// import React from 'react'

const Genres = () => {

  const navigate = useNavigate(); //Para volver a Genres

  const { auth, role } = useContext(AuthContext);

  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    try {
      const res = await axios.get('http://localhost:3000/genres', {
        headers: {'Authorization': `Bearer ${auth}`}, 
      });

      setGenres(res.data);
      console.log(genres);
    } catch(err){
      console.log('Error al obtener géneros: ', err);
    }
  }

  useEffect(() => {
    if (!auth) {
      // Redirige si no hay usuario autenticado
      navigate('/users/login');
      return;
    }

    // Si está logueado, traemos los géneros
    fetchGenres();

  }, [auth, navigate]);

  const deleteGenre = async (genreId) => {
    console.log('Borrar', genreId);

    try{
       const res = await axios.delete(`http://localhost:3000/genres/${genreId}`, {
              headers: { 'Authorization': `Bearer ${auth}` },
            });

            fetchGenres();
            navigate('/genres');
    } catch (error) {
      console.log('Error al eliminar el género: ' , error)

    }
  }
  
  return (
    <div className="genres-container">
    {auth && role === "admin" && (
     <>
     <h4 className='mt-3'>Funciones de administrador</h4>
     {/* <Link className='btn btn-primary' to={`/genres/add`}>Agregar nueva película</Link> */}
     </>
   )}

   {genres.length > 0 ? (
     genres.map((genre) => (
       <div key={genre._id} className='mt-3'>
         <CardGenre
           title={genre.name}
           description={genre.description}
           />
         <div className='buttons-genre'>
         {role === 'admin' && ( 
          <>
            <Link className="btn btn-primary" to={`/genres/${genre._id}/edit`}>Editar</Link>
            <button className='btn btn-danger' onClick={() => deleteGenre(genre._id)}>Eliminar género</button>
          </>
        )}

         </div>
       </div>
     ))
   ) : (
     <p>No se pueden ver los géneros. Recuerda que debes iniciar sesión para poder visualizar nuestro contenido.</p>
   )}

 </div>
  )
}

export  {Genres}
