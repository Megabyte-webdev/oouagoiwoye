/* eslint-disable no-unused-vars */
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Campus from './Pages/services/Campus'
import CampusElement from './Pages/services/CampusElement'
import campusData from "./Data/campus"
import AdminDash from './Admin/AdminDash'

function App() {
  return (
    <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/services/campus' element={<Campus />} />
              <Route path='/services/campus/main-campus' element={<CampusElement data={campusData[0]} key={1} />} />
              <Route path='/services/campus/egba-campus' element={<CampusElement data={campusData[1]} key={1} />} />
              <Route path='/services/campus/yewa-campus' element={<CampusElement data={campusData[2]} key={1} />} />
              <Route path='/services/campus/remo-campus' element={<CampusElement data={campusData[3]} key={1} />} />
              <Route path='/admin-ict/oouagoiwoye-9g4c4h8sh' element={<AdminDash />} />
          </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
