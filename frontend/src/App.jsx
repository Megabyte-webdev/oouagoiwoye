/* eslint-disable no-unused-vars */
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AllFacultyPage from './Pages/AllFacultyPage'
import AboutPage from './Pages/AboutPage'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function App() {
  return (
    <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/all-faculties' element={<AllFacultyPage />} />
          </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
