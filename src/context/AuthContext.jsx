import {createContext, useState, useEffect} from 'react';
import {jwtDecode} from 'jwt-decode'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate()
    //Vamos a validar si tengo o no el token del usuario que ingresa. 
    const [user, setUser] = useState(null) //Si no tengo un usuario logeado, que sea null el valor por default

    //Intento obtener el token, si lo hay. Sino, null
    const auth = Cookies.get('jwToken') || null;
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true); // Agregar estado de carga

    useEffect(() => {
        if (auth) {
          try {
            // Decodificamos el token
            const decoded = jwtDecode(auth);
            console.log("Decoded: ", decoded);
    
            // Establecemos los valores del usuario y el rol
            setUser({
              name: decoded.name,
              id: decoded.id,
              email: decoded.email,
              role: decoded.role
            });
            setRole(decoded.role);
          } catch (error) {
            console.error("Error al decodificar el token: ", error);
          }
        }
    
        // Indicamos que la carga ha terminado
        setLoading(false);
      }, [auth]);

    const logoutUser = () => {
        setUser(null);
        Cookies.remove('jwToken')
        navigate('/users/login');
    }

    return (
        <AuthContext.Provider value ={{user, setUser, auth, logoutUser, role}}>
            {children}    
        </AuthContext.Provider>
    )
}