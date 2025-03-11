import {useEffect, useState, useContext} from 'react'
import { CardUser } from '../../components/CardUser'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import {Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom'

const Users = () => {
  const navigate = useNavigate(); //Para volver a películas
  
  // const { id } = useParams();
  const { auth, role, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]); // De base es un array donde entrarán las películas

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users', {
        headers: { 'Authorization': `Bearer ${auth}` },
      });

      setUsers(res.data); // Guardamos las películas
    } catch (err) {
      console.log('Error al obtener películas: ', err);
    }
  };

   // Use useEffect to trigger navigation only after the first render
   useEffect(() => {
    if (!auth) {
      navigate('/users/login'); // Redirect to login if the user is not authenticated
    } else {
      fetchUsers();  // Fetch movies only if authenticated
    }
  }, [auth]);

  const deleteUser = async (userId) => {
    console.log('Borrar', userId)

    try{
      const res = await axios.delete(`http://localhost:3000/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${auth}` },
      });

      fetchUsers();

      // navigate('/users');
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
    <div className="users-container">
      
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id} className='mt-3'>
            <CardUser
              name={user.name}
              lastname={user.lastname}
              email={user.email}
              role={user.role}

            />
            <div className='buttons-users'>
            <Link className='btn btn-primary' to={`/users/${user._id}/edit`}>Editar</Link>
            {role === 'admin' && (
              <button className='btn btn-danger' onClick={()=>deleteUser(user._id)}>Eliminar usuario</button>
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


export  {Users}

