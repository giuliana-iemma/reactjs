import React, {useEffect, useContext, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import { Button } from '../../components/Button'

const AddGenre = () => {
  const navigate = useNavigate(); //Para volver a películas
  const { auth, role } = useContext(AuthContext); //Verificamos token

  //Obtenemos los datos de la película
  const {id} = useParams();

  const [genre, setGenre] = useState({
      name: "",
      description: "",
  })
  
  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    //e contiene toda la información del campo. Lo desestructuramos para extraer name y value
    const { name, value } = e.target; //e.target: Es el elemento HTML que ha disparado el evento (en este caso, el input o textarea).

    // Actualizamos el estado del genre
  setGenre((prevGenre) => ({
    ...prevGenre,
    [name]: value, // actualiza solo el campo que cambió
  }));
    console.log(e.target)
  };

    const handleAdd = async (e) =>{
    e.preventDefault();
      // console.log("Editando");
      try{
        const res = await axios.post(`https://nodejs-api-o7k7.onrender.com/genres`, genre, {
          headers: { 'Authorization': `Bearer ${auth}` },
        });
        console.log('Género agregado: ', res.data);
        navigate('/genres')
      }catch (err){
        console.log(err)
      }
  }
  
  if (role !== "admin") {
    return <h2>No tienes acceso para editar géneros.</h2>;
  }
return (
  <>
   <h1>Agregar nuevo género</h1>

    <form onSubmit={handleAdd}> 
        {/* Title */}
        <div>
            <label className='form-label'>Género</label>
          <input type="text" className='form-control' name='name' value={genre.name}   onChange={handleChange} />
        </div>

        {/* Description */}
        <div>
            <label className='form-label'>Descripción</label>
            <textarea
            className="form-control"
            name="description"
            value={genre.description}  
            onChange={handleChange} 
          />
        </div>

        <button type='submit' onClick={handleAdd} className='btn btn-primary mt-5'>Guardar</button>
    </form>
  </>
 
)}

export  {AddGenre}


