  import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home, Movies, FormLogin, FormRegister, DeleteMovie, ViewMovie, EditMovie, AddMovie, Genres, ViewGenre, EditGenre, DeleteGenre, Users, EditUser } from './pages'
import {Navbar} from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <>
      <Navbar/>

     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/movies" element={<Movies/>} />
      <Route path="/users/login" element={<FormLogin/>} />
      <Route path="/users/register" element={<FormRegister/>} /> {/* Registro */}
      <Route path="/movies/:id" element={<ViewMovie/>} />
      <Route path="/movies/:id/edit" element={<EditMovie/>} />
      <Route path="/movies/add" element={<AddMovie/>} />
      <Route path="/genres" element={<Genres/>} />
      <Route path="/genres/:id" element={<ViewGenre/>} />
      <Route path="/genres/:id/edit" element={<EditGenre/>} />

      <Route path="/users" element={<Users/>} />
      <Route path="/users/:id/edit" element={<EditUser/>} />

    </Routes>
    </>
  )
}

export default App
