import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/Button';

const DeleteGenre = () => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        console.log("Deleting Genre")
    }

    return (
    <div>
      <h2>Borrando película</h2>
        <p>¿Estás seguro de que deseas borrar {{/* Nombre de la pelicula */}}?</p>
        <Button label="No, conservar" onClick={navigate('/movies')}/>
        <Button label="Sí, eliminar" onClick={handleDelete}/>
    </div>
  )
}

export  {DeleteGenre}
