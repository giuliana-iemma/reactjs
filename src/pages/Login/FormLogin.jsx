    import  {useState, useContext} from 'react'
    import { Input } from '../../components/Input'    
    import { Button } from '../../components/Button'
    import {useNavigate} from 'react-router-dom'
    import axios from "axios"
    import { AuthContext } from '../../context/AuthContext'
    import Cookies from 'js-cookie'

    const FormLogin = () => {
        const [values, setValues] = useState({
            email: "",
            password: "",
        });

        const [error, setError] = useState('');

        const [errors, setErrors] = useState({
            email: '',
            password: ''
          }); //Errores para cada campo


        const navigate = useNavigate(); 

        const handleOnChange = (e) => {
            setValues({...values, [e.target.name]: e.target.value});
        }

        const handleOnBlur = () => {
            const validationErrors = validateForm(values);
            setErrors(validationErrors);
          };
          
        const navigateRegister = () => {
            navigate("/users/register")
        }

        const validateForm = (values) => {
            const newErrors = {};
            if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) {
                //Si no hay valor escrito para email o si no coincide con el pattern

                newErrors.email = 'Por favor ingrese un correo electrónico válido.';
            }
            if (!values.password || values.password.length < 6) {
                //Si no hay valor escrito para password o si no coincide con el pattern

                newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
            }
            return newErrors;
          };

        const {setUser, user} = useContext(AuthContext);

        const handleLogin = async (e) =>{
            e.preventDefault();
            const {email, password} = values;

            const validationErrors = validateForm(values);
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length === 0) {
                // El formulario es válido, se puede enviar
                console.log('Formulario enviado', values);

                try {
                    // console.log("Logeado")
                    const res = await axios.post('http://localhost:3000/login',  { email, password });
    
                    console.log("RES: " , res.data);
    
                    setUser ({
                        name: res.data.name,
                        id: res.data.id,
                        email: res.data.email,
                        role: res.data.role,
                    });
    
                    //Guardar Token. Expires indica cuánto de vida le doy la cookie.
                    Cookies.set('jwToken', res.data.token, {expires: 3});
                    
                    // Redirigir al home si se logea bien
                    navigate('/');
                } catch (err){
                    console.log(err);
                    const errorMessage = err.response?.data?.message || 'Error al iniciar sesión. Inténtalo nuevamente.';
                    setError(errorMessage);        }
              }            
        }

        if (user){
            navigate('/')
        }

    return (
        <div className='form-login'>
            <h1 className='headline-brand'><span className='logo-text'>MoviePickr</span></h1>
            <p className='subtitle'>Descubrí en qué plataformas podés ver tus películas favoritas</p>

            <h2>Iniciá sesión</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Mensaje de error */}

            <form action="/login" >
                    <Input
                        name="email"
                        label="Correo electrónico"
                        type="email"
                        value={values.email}
                        onChange={handleOnChange}
                        placeholder="Ingresa tu correo"
                        // errorMessage={errors.email}
                        onBlur={handleOnBlur}
                        className="form-control"
                    />

                    <Input
                        name="password"
                        label="Contraseña"
                        type="password"
                        value={values.password}
                        onChange={handleOnChange}
                        placeholder="Ingresa tu contraseña"
                        // errorMessage={errors.password}
                        onBlur={handleOnBlur}
                        className="form-control"
                    />
            </form>

            <div className="error-list">
                {Object.values(errors).length > 0 && (
                <ul>
                    {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                    ))}
                </ul>
                )}
            </div>
            
            <button type='submit' className="btn btn-primary mt-3" onClick={handleLogin}>Ingresar</button>
        
           
            <p>¿No tienes una cuenta?</p>
            <Button
                className='btn btn-secondary'
                onClick={navigateRegister}
                label="Registrarse"
            />
           
            
        </div>
        
    )
    }

    export {FormLogin}
