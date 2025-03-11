import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import { Button } from '../../components/Button'
import {useNavigate} from 'react-router-dom'

const ViewGenre = () => {
    const navigate = useNavigate();

    const {id} = useParams();
    const { auth, role } = useContext(AuthContext);
    // console.log("AUTH:", auth)
    // console.log("ID: ", id)

    const [genre, setGenre] = useState({
        name: "",
        description: "",
    })

    const fetchGenreDetails = async () => {
        try{
           const res =  await axios.get(`https://nodejs-api-o7k7.onrender.com/genres/${id}`, {
                headers: { 'Authorization': `Bearer ${auth}` },
              });
            console.log("DATA: ", res.data);
            setGenre(res.data)
            console.log(genre)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
            fetchGenreDetails()
    }, [id])

    const deleteGenre = async () => {
        console.log("ID A BORRAR: ", id)
          try {
            // Realizamos la petición DELETE para eliminar la película
            await axios.delete(`https://nodejs-api-o7k7.onrender.com/movies/${id}`, {
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
      <h1 className='card-header'>{genre.name}</h1>
      <p className='card-text'>{genre.description}</p>
     

      {/* Si el usuario es admin le mostramos los botones */}
      {
              role === "admin" && (
                <>
                 <Link className="btn btn-primary"  to={`/genres/${id}/edit`}>Editar</Link>
                <button className='btn btn-danger' onClick={deleteGenre}>Eliminar</button>
                 
                </>
              ) 
            }
    </div>
  )
}

export  {ViewGenre}
