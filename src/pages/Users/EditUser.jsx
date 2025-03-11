import React, {useEffect, useContext, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import { Button } from '../../components/Button'

const EditUser = () => {
  const navigate = useNavigate(); //Para volver a películas
  const { auth, role } = useContext(AuthContext); //Verificamos token

  //Obtenemos los datos de la película
  const {id} = useParams();

  const [user, setUser] = useState({
      name: "",
      lastname: "",
      email: "",
      role: "",
  })
  

  const fetchUserDetails = async () => {
      try{
         const res =  await axios.get(`http://localhost:3000/users/${id}`, {
              headers: { 'Authorization': `Bearer ${auth}` },
            });
          // console.log("DATA: ", res.data);
          setUser(res.data)
          // console.log(movie.genre)
      } catch (err) {
          console.log(err)
      }
  }

  useEffect(() => {
      fetchUserDetails()
  }, [id])

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    //e contiene toda la información del campo. Lo desestructuramos para extraer name y value
    const { name, value } = e.target; //e.target: Es el elemento HTML que ha disparado el evento (en este caso, el input o textarea).
    //Actualizar el estado con el nuevo valor:
    setUser((prevState) => ({
      ...prevState, //Copiamos el estado anterior
      [name]: value, //Cambiamos lo nuevo
    }));

    // console.log('Movie:', movie)
  };

    const handleEdit = async (e) =>{
    e.preventDefault();
      // console.log("Editando");
      try{
        const res = await axios.put(`http://localhost:3000/users/${id}`, user, {
          headers: { 'Authorization': `Bearer ${auth}` },
        });
        console.log('Usuario actualizado: ', res.data);
        navigate('/users')
        // // setMovie(res.data)
      }catch (err){
        console.log(err)
      }
  }

  
  
  if (role !== "admin") {
    return <h2>No tienes acceso para editar usuarios.</h2>;
  }

return (
  <>
   <h1>Editando {user.name} {user.lastname}</h1>

    <form onSubmit={handleEdit}> 
        {/* Name */}
        <div>
            <label className='form-label'>Nombre</label>
          <input type="text" className='form-control' name='name' value={user.name}   onChange={handleChange} />
        </div>

        <div>
            <label className='form-label'>Apellido</label>
          <input type="text" className='form-control' name='lastname' value={user.lastname}   onChange={handleChange} />
        </div>

        <fieldset>
            <legend>Choose a role for the user</legend>
           
           <div className='checkbox-container'>
                 <div>
                    <input type="radio" id='admin' name='role' value='admin' checked={user.role === "admin"}  onChange={handleChange}/>
                    <label htmlFor="admin">Administrador</label>
                    </div>  
                
                <div>
                    <input type="radio" id='user' name='role' value='user'   checked={user.role === "user"}  onChange={handleChange} // se selecciona si el valor actual es "user"
                    />
                    <label htmlFor="user" >Cliente</label>
                </div>

            </div>
        </fieldset>

        <button type='submit' onClick={handleEdit} className='btn btn-primary mt-5'>Guardar</button>
    </form>
  </>
 
)}

export  {EditUser}



