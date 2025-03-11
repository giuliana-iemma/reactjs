import  {useState} from 'react'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import {useNavigate} from 'react-router-dom'
import axios from "axios"

const FormRegister = () => {
    const [values, setValues] = useState ({
        name: "",
        lastname: "",
        email: "",
        password: "",
    });

    // const [error, setError] = useState('');
    
    const [errors, setErrors] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
      }); //Errores para cada campo

    const navigate = useNavigate();

    const inputs = [
        {
            name: "name",
            placeholder: "Nombre",
            label: "Nombre",
            type: "text",
            errorMessage: "Ingresa un nombre válido",
            required: true,
            pattern: "/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}$/"
        },
        {
            name: "lastname",
            placeholder: "Apellido",
            label: "Apellido",
            type: "text",
            errorMessage: "Ingresa un apellido válido",
            required: false,
            pattern: "/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}$/"
        },
        {
            name: "email",
            placeholder: "email@mail.com",
            label: "Email",
            type: "email",
            errorMessage: "El mail es incorrecto",
            required: true,
            pattern: "[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+"
        },
        {
            name: "password",
            placeholder: "Contraseña",
            label: "Contraseña",
            type: "password",
            errorMessage: "Debe tener al menos 4 caracteres",
            required: true,
            pattern: "/^.{6,}$/",
        }
    ]

    const handleOnChange = (e) => {
        setValues({...values,  [e.target.name]: e.target.value})
    }

    const handleOnBlur = () => {
        const validationErrors = validateForm(values);
        setErrors(validationErrors);
      };

      const validateForm = (values) => {
        const newErrors = {};
        if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) {
            //Si no hay valor escrito para email o si no coincide con el pattern
            newErrors.email = 'Por favor ingrese un correo electrónico válido.';
        }

        if (!values.password || !/^.{6,}$/.test(values.password)) {
            //Si no hay valor escrito para password o si no coincide con el pattern}
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
        }

        if (!values.lastname || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}$/.test(values.lastname)) {
            newErrors.lastname = 'Ingrese un apellido válido. Al menos 2 caracteres';
        }

        if (!values.name || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}$/.test(values.name)) {
            //Si no hay valor escrito para password o si no coincide con el pattern

            newErrors.name = 'Ingrese un nombre válido. Al menos 2 caracteres';
        }
        return newErrors;
      };

    const navigateLogin = () => {
        navigate("/users/login")
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const {name, lastname, email, password, role} = values;

        const validationErrors = validateForm(values);
        setErrors(validationErrors);


        if (Object.keys(validationErrors).length === 0) {
            try{
                const res = await axios.post ('http://localhost:3000/users', {
                    name, lastname, email, password, role
                });
    
                console.log(res.data);
    
                //Guardar Token
                navigate('/users/login')
            // console.log("Registrado")
            } catch(err) {
                console.log(err);
                // setError(error.response.data.message);
            }
        }

        //Logear directamente

    }

  return (
    <div className='form-login'>
      <h2>Registro</h2>
      <form action="#" >
                {
                    inputs.map((input) => (
                        <Input
                        key={input.name}
                        value={values[input.name]}
                        onChange={handleOnChange}
                        className="form-control"
                        onBlur={handleOnBlur}
                        {...input}
                        />
                    ))
                }
            <input onClick={handleRegister} type="submit" className='mt-3 btn btn-primary' value='Registrarse'/>

              <div className="error-list">
                {Object.values(errors).length > 0 && (
                <ul>
                    {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                    ))}
                </ul>
                )}
            </div>
        </form>

        <p className='mt-3'>¿Ya tienes una cuenta?</p>
        <Button
        className='btn btn-secondary' 
        onClick={navigateLogin}
        label="Iniciar sesión"
        />
       

    </div>
  )
}

export {FormRegister}
