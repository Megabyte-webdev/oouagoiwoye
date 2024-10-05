/* eslint-disable no-unused-vars */
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import HomePage from './Pages/HomePage'
import AllFacultyPage from './Pages/AllFacultyPage'
import AboutPage from './Pages/AboutPage'
import './App.css';
import NavBar from './Components/Nav/useContext';

function App() {
  return (
    <BrowserRouter>
        {/* <div className='lg:w-9/12 mx-auto'> */}
          <NavBar/>
          <Routes>
              {/* <Route path='/' element={<MainLayout />} /> */}
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/all-faculties' element={<AllFacultyPage />} />
          </Routes>
        {/* </div> */}
    </BrowserRouter>
  )
}

export default App
