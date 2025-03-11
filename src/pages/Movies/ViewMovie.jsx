import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import { Button } from '../../components/Button'
import {useNavigate} from 'react-router-dom'

const ViewMovie = () => {
    const navigate = useNavigate();

    const {id} = useParams();
    const { auth, role } = useContext(AuthContext);
    // console.log("AUTH:", auth)
    // console.log("ID: ", id)

    const [movie, setMovie] = useState({
        title: "",
        description: "",
        genre: [],
        platforms: [],
    })

    
    const fetchMovieDetails = async () => {
        try{
           const res =  await axios.get(`http://localhost:3000/movies/${id}`, {
                headers: { 'Authorization': `Bearer ${auth}` },
              });
            console.log("DATA: ", res.data);
            setMovie(res.data)
            console.log(movie)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
            fetchMovieDetails()
    }, [id])

    const deleteMovie = async () => {
        console.log("ID A BORRAR: ", id)
          try {
            // Realizamos la petición DELETE para eliminar la película
            await axios.delete(`http://localhost:3000/movies/${id}`, {
              headers: { 'Authorization': `Bearer ${auth}` },
            });
            // Filtramos la película eliminada del estado
            // setMovies(movies.filter((movie) => movie._id !== movieId));
            //Dirigimos al home
            navigate('/');
          } catch (err) {
            console.log('Error al eliminar película: ', err);
          }
      }

  return (
    <div className='card text-center'>
      <h1 className='card-header'>{movie.title}</h1>
      <p className='card-text'>{movie.description}</p>
      <h2>Géneros</h2>
      <ul className='horizontal-list'>
        {movie.genre.map((genre, index) => (
            <li key={index}>{genre.name}</li>
        ))}
      </ul>
      <h2>Plataformas</h2>
      <ul>
        {movie.platforms.map((platform, index) =>(
            <li key={index}>{platform.name}</li>
        ))}
      </ul>

      {/* Si el usuario es admin le mostramos los botones */}
      {
              role === "admin" && (
                <>
                 <Link className="btn btn-primary"  to={`/movies/${id}/edit`}>Editar</Link>
                <button className='btn btn-danger' onClick={deleteMovie}>Eliminar</button>
                 
                </>
              ) 
            }
    </div>
  )
}

export  {ViewMovie}
