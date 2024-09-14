import {Routes, Route, BrowserRouter} from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import HomePage from './Pages/HomePage'
import AllFacultyPage from './Pages/AllFacultyPage'
import AboutPage from './Pages/AboutPage'
import './App.css'
import Navbar from './Components/Navbar'

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
            {/* <Route path='/' element={<MainLayout />} > */}
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/all-faculties' element={<AllFacultyPage />} />
          
        </Routes>
    </BrowserRouter>
  )
}

export default App
