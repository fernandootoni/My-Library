import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';

import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';

import { UserProvider } from './context/UserContext';
import Dashboard from './components/pages/Dashboard';
import AddBook from './components/pages/Books/AddBook';
import BookPage from './components/pages/Books/BookPage';
import Author from './components/pages/Author/Author';
import EditPerfil from './components/pages/EditPerfil';
import Perfil from './components/pages/Perfil';
import EditComment from './components/pages/EditComment';
import Genres from './components/pages/Genres';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
          <Container>
            <Routes>
              <Route path='/books/genre/:genre' element={<Genres/>}/>
              <Route path='/books/:id' element={<BookPage/>}/>
              <Route path='/author/:id' element={<Author/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/books/add' element={<AddBook/>}/>
              <Route path='/perfil' element={<Perfil/>}/>
              <Route path='/editperfil' element={<EditPerfil/>}/>
              <Route path='/comments/edit/:id' element={<EditComment/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/' element={<Home/>}/>
            </Routes>
          </Container>
        <Footer/>
      </UserProvider>
    </Router>
  );
}

export default App;
