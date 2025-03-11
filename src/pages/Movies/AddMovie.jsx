import { useContext, useState} from 'react'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { Button } from '../../components/Button'
import { InputAdd } from '../../components/InputAdd'

const AddMovie = () => {
  const navigate = useNavigate(); //Para volver a películas
  const { auth, role } = useContext(AuthContext); //Verificamos token

  const [movie, setMovie] = useState({
      title: "",
      description: "",
      genre: [],
      platforms: [],
  })

  const errorMessages = {
    title: "Debe tener al menos dos caracteres",
    description: "Debe tener al menos diez caracteres",
    newGenre: "Debes colocar un género de al menos dos caracteres",
    platformName: "Debe tener al menos dos caracteres",
    platformURL: "Debes colocar una URL válida que comience con http:// o https:// o www.",
    newPlatform: "Debe tener al menos dos caracteres",
    newPlatformWeb: "Debes colocar una URL válida que comience con http:// o https://",
  }

  // console.log(errorMessages.title)
 /*  const patterns = {
    title: /^.{2,}$/,  // Al menos 2 caracteres
    description: /^.{10,}$/,  // Al menos 10 caracteres
    newGenre: /^.{2,}$/,  // Debe empezar con http:// o https:// y ser una URL válida
    newPlatform: /^.{2,}$/,  // Al menos 2 caracteres
    newPlatformUrl: /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
  } */

  const [showError, setShowError] = useState({
    title: false,
    description: false,
    newGenre: false,
    platformName: false,
    platformURL: false,
    newPlatform: false,
    newPlatformWeb: false, 
    addNewPlatform: false,
    editPlatform: false,
    addGenre: false,
  });

  /* Géneros */
  const [deletedGenres, setDeletedGenres] = useState ([])
  const [newGenre, setNewGenre] = useState ('') // Estado temporal para el género nuevo

  /* Plataformas */
  const [newPlatformName, setNewPlatformName] =useState(''); //Estado para el input de name de la nueva plataforma
  const [newPlatformUrl, setNewPlatformUrl] =useState('');  //Estado para el input de url de la nueva plataforma
  const [newPlatforms, setNewPlatforms] =useState([]);
  const [deletedPlatforms, setDeletedPlatforms] = useState ([])

  const [error, setError] = useState("");  // Estado para manejar errores

/*   const [errors, setErrors] = useState({
    title: "",
    description: "",
    newGenre: "",
    newPlatform: "",
    platformURL: ""
  });  *///Errores para cada campo

  const [errors, setErrors] = useState("");

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    //e contiene toda la información del campo. Lo desestructuramos para extraer name y value
    const { name, value } = e.target; //e.target: Es el elemento HTML que ha disparado el evento (en este caso, el input o textarea).
    //Actualizar el estado con el nuevo valor:
    setMovie((prevState) => ({
      ...prevState, //Copiamos el estado anterior
      [name]: value, //Cambiamos lo nuevo
    }));
};

const handleOnBlur  = (e, pattern) =>{
// console.log(e.target.name)
// console.log(e.target.pattern)

const { name, value } = e.target;
  
if (pattern) {
  validate(pattern, value, name, errorMessages[name]);
}
/* const validationErrors = validate(e.target.pattern, e.target.value, e.target.name, e.target.errorMessage) */
// console.log(errors);
}

const handleAddMovie = async (e) =>{
    e.preventDefault();
      
    try{
        const res = await axios.post(`http://localhost:3000/movies`, movie, {
          headers: { 'Authorization': `Bearer ${auth}` },
        });
        navigate('/movies');
        console.log(movie)
        console.log("DATA: ", res.data);

      }catch (err){
        console.log(err)
        const errorMessage = err.response?.data?.message || 'Error al iniciar sesión. Inténtalo nuevamente.';
        setError(errorMessage);      
        console.log(movie)
      }
  }

  const handleDeleteGenre = (e, genre) => {
    e.preventDefault()
    e.stopPropagation();

     // Verificar si el género ya está eliminado, si no lo está, agregarlo a removedGenres
     if (!deletedGenres.some((g) => g._id === genre._id)) {
      setDeletedGenres((prevDeletedGenres) => [...prevDeletedGenres, genre]);
    }

    setMovie((prevMovie) => ({
      ...prevMovie,
      genre: prevMovie.genre.filter((g) => g._id !== genre._id), //Obtenemos todos los géneros que no sean el que queremos eliminar
    }));
  }

  const handleDeletePlatform = (e, platform) => {
    e.preventDefault()
    e.stopPropagation();

      // Verificar si la plataforma ya está eliminada, si no lo está, agregarla a deletedPlatforms
  if (!deletedPlatforms.some((p) => p._id === platform._id)) {
    setDeletedPlatforms((prevDeletedPlatforms) => [...prevDeletedPlatforms, platform]);
  }

  // Eliminar la plataforma de la lista de plataformas
  setMovie((prevMovie) => ({
    ...prevMovie,
    platforms: prevMovie.platforms.filter((p) => p._id !== platform._id), // Asegúrate de que esté usando _id y no otro campo
  }));

  console.log('Plataforma eliminada:', platform);

  }

  const handleChangeGenre = async (e) =>{
    setNewGenre(e.target.value); // Actualiza el estado con el valor del input
 // Opcional: Verifica en consola el valor ingresado
  } 

  const validate = (pattern, target, fieldName, message) =>{
   
    if (!target || !pattern.test(target)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: message  // Se usa el nombre del campo como clave
      }));

      // console.log("error", fieldName);

      // showError[fieldName] = true;
      // console.log(showError[fieldName])
      // console.log(message)

      setShowError(prevState => ({
        ...prevState,
        [fieldName]: true
      }));

      return false;
    } else {
      // Si pasa la validación, se limpia el error
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: "" 

      }
    ));
      setShowError(prevState => ({
        ...prevState,
        [fieldName]: false
      }));
      return true;
    }   
  }

  const handleAddNewGenre = async (e) => {    
    e.preventDefault();
    e.stopPropagation();

    // console.log(newGenre)
    const genreName = newGenre.trim();

    // Verificar que el género no esté vacío y que no se haya agregado previamente
    if (genreName && !movie.genre.some((g) => g.name === genreName)) {
      // Crear un objeto de género 
      const newGenreObject = { name: genreName };

      // Actualizar el estado de movie, agregando el nuevo género
      setMovie((prevMovie) => ({
        ...prevMovie,
        genre: [...prevMovie.genre, newGenreObject],
      }
    ));
      // Limpiar el campo de entrada
      setNewGenre('');
    }
  }

  const handleChangePlatformName = async (e) =>{
    setNewPlatformName(e.target.value); // Actualiza el estado con el valor del input
    console.log(newPlatformUrl); // Opcional: Verifica en consola el valor ingresado
  } 

  const handleChangePlatformUrl = async (e) =>{
    setNewPlatformUrl(e.target.value); // Actualiza el estado con el valor del input
    console.log(newPlatformUrl); // Opcional: Verifica en consola el valor ingresado
  } 

  const handleAddNewPlatform = (e) => {
    e.preventDefault();
    console.log('Agregando')

    const newPlatformObject = {name: newPlatformName, url: newPlatformUrl}

    if(!showError.newPlatform && !showError.newPlatformWeb && newPlatformName && newPlatformUrl){
      setMovie ((prevMovie) => ({
        ...prevMovie,
        platforms:  [...prevMovie.platforms, newPlatformObject]
      }))
      console.log(newPlatforms)
      setNewPlatformName('')
      setNewPlatformUrl('')
      setShowError ((prevState) => ({
        ...prevState,
        newPlatform: false,
        newPlatformWeb: false,
        addNewPlatform : false
      }))


    } else {
      setShowError ((prevState) => ({
        ...prevState,
        addNewPlatform : true
      }))
    }
  }

  /* Editar plataformas */
 const handleChangePlatform = (e, index) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => {
        const updatedPlatforms = [...prevMovie.platforms];
        updatedPlatforms[index] = { ...updatedPlatforms[index], [name]: value };
        return { ...prevMovie, platforms: updatedPlatforms };
    }); 
};

  const handleEditPlatform = (e) => {
    e.preventDefault();
    console.log('Editando')
  }

  if (role !== "admin") {
    return <h2>No tienes acceso para agregar películas.</h2>;
  }

return (
  <>
  
   <h1>Agregar nueva película</h1>

    <form onSubmit={handleAddMovie} action='post'> 
        {/* Title */}
        <div>
            <Input 
              label="Título"
              type="text"
              className="form-control"
              name="title"
              value={movie.title}
              onChange={handleChange}
              onBlur={(e) => handleOnBlur(e, /^.{2,}$/)}
              errorMessage = {errorMessages.title}
              showError = {showError.title}
              />
        </div>

        {/* Description */}
            <Textarea
              label="Descripción"
              className="form-control"
              name="description"
              value={movie.description}  
              onChange={handleChange} 
              // pattern="/^.{10,}$/"
              onBlur={(e) => handleOnBlur(e, /^.{10,}$/)}
              errorMessage = {errorMessages.description}
              showError = {showError.description}
            />

        {/* Genres */}
        <div className='mt-3'>  
        <h2 className='edit-title'>Géneros</h2>
        {movie.genre && movie.genre.length > 0 ? (
          movie.genre.map((genre, index) => {
            return (
              <div 
              className={`genre-tag d-flex flex-row mt-1`} /* Si esta dentro de los géneros eliminados, ponemos la clase removed. sino no */
              key={index}>

                <p className="d-block genre-tag-text">{genre.name}{genre._id}</p>

                {/* Botón para eliminar el género */}
                <Button onClick={(e) => handleDeleteGenre(e, genre)} className="genre-btn" label="x"/>
              </div>
            );
          })
          ) : (
          <p>No hay géneros disponibles.</p>
          )}
          
          {/* Agregar género */}
            <InputAdd 
            className='input-add' 
            type="text" 
            onChange={handleChangeGenre} 
            name='newGenre' 
            value={newGenre} 
            // pattern="/^.{2,}$/"               
            onBlur={handleOnBlur}
            errorMessage = {errorMessages.newGenre}
            showError = {showError.newGenre}
            onClickButton = {(e) => handleAddNewGenre(e)}
            />

            <p className='form-text text-add d-block'>Recuerda guardar luego de actualizar la lista de géneros para que los cambios impacten</p>

          </div>
        {/* </div> */}
      
        {/* Platforms */}
        <div className='mt-3'>  
        <h2 className='edit-title'>Plataformas</h2>
        {/* Editar */}
        {movie.platforms && movie.platforms.length > 0 ? (
            movie.platforms.map((platform, index) => {
              return (
                <div className="platform-edit mt-3 mb-3" key={index}>

                  <p><span>Platform: </span>{platform.name}</p>
                  <p><span>Platform URL: </span>{platform.url}</p>

                  <Button onClick={(e) => handleDeletePlatform(e, platform)}  className="btn btn-primary" label="Eliminar"/>
                </div>
             /*  <div className='platform-edit mt-3 mb-3' key={index}>
                <div className='mt-2'>
                  <Input 
                  label="Plataforma" 
                  className='form-control' 
                  type="text" 
                  name='platformName' 
                  onChange={(e) => handleChangePlatform(e, index)} 
                  value={platform.name}
                  onBlur={(e) => handleOnBlur(e, /^.{2,}$/)}
                  errorMessage = {errorMessages.platformName}
                  showError = {showError.platformName}
                  />
                </div>

                <div className='mt-2'>
                <Input 
                label="Link a la plataforma" 
                className='form-control' 
                type="text" 
                onChange={(e) => handleChangePlatform(e, index)}  name='platformURL' 
                value={platform.url}
                onBlur={(e) => handleOnBlur(e, /^(https?:\/\/[^\s$.?#].[^\s]*)$/)}
                errorMessage = {errorMessages.platformURL}
                  showError = {showError.platformURL}
                />

                <p className='form-text'>Recordá revisar que el link funcione antes de colocarlo</p>
                </div>

                <Button onClick={handleEditPlatform} className='btn btn-secondary' label="Guardar"/>
              </div> */
              );
            })
          ) : (
            <p>No hay plataformas disponibles.</p>
          )
        }        

        {/* Agregar nueva plataforma */}
          <div className='platform-add mt-3 mb-3'>
              <div className='mt-2'>
                <Input 
                label="Plataforma" 
                className='form-control' 
                type="text" 
                name='newPlatform' 
                onChange={handleChangePlatformName} 
                value={newPlatformName} 
                onBlur={(e) => handleOnBlur(e, /^.{2,}$/)}
                errorMessage = {errorMessages.newPlatform}
                showError = {showError.newPlatform}
                />
              </div>

              <div className='mt-2'>
              <Input 
              label="Link a la plataforma" 
              className='form-control' 
              type="text" 
              onChange={handleChangePlatformUrl} 
              name='newPlatformWeb' 
              value={newPlatformUrl} 
              onBlur={(e) => handleOnBlur(e, /^(https?:\/\/|www\.)[^\s$.?#].[^\s]*$/)}
              errorMessage = {errorMessages.newPlatformWeb}
              showError = {showError.newPlatformWeb}
              />

              <p className='form-text'>Recordá revisar que el link funcione antes de colocarlo</p>
              </div>

              <Button  className='btn btn-secondary' onClick={handleAddNewPlatform} label="Agregar plataforma"/>

              {showError.addNewPlatform && <p className='text-danger'>Hay algún error en los datos. Por favor revísalos.</p>}
          </div>
  
        </div>
        <Button  type='submit' onClick={handleAddMovie} className='btn btn-primary mt-5' label="Guardar"/>
    </form>
  </>
 
)}

export  {AddMovie}

  {/* Géneros eliminados */}
          {/* Esto es algo que intenté hacer pero no logré, lo dejo para revisarlo en clase */}
          {/* {
            deletedGenres.length > 0 && (
              <div>
                {deletedGenres.map((genre) => (
                  <div key={genre._id} className='genre-tag d-flex flex-row removed'>
                    <p className='d-bock genre-tag-text'>{genre.name}</p>
                    <button
                    onClick={() => handleAddGenre(genre)}
                    className="genre-btn"
                  > + </button>
                  </div>  
                ))}
              </div>
            )
          } */}