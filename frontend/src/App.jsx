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
import AdminDash from './Admin/AdminDash';
import NavBar from './Components/Nav/useContext';
import PrincipalOfficers from './Pages/administration/PrincipalOfficers'
import POfficers from './Pages/administration/POfficers'
import Administration from './Pages/administration/Administration'
import AAdministration from './Pages/administration/AAdministration'
import AdminDash from './Admin/AdminDash'
import AllFaculty from './Pages/faculties/AllFaculty'
import Faculty from './Pages/faculties/Faculty'

function App() {
  return (
    <BrowserRouter>
          <NavBar/>
          <Routes>
              <Route path='/' exact element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='//administration/admin' element={<Administration />} />
              <Route path='//administration/admin/:id' element={<AAdministration />} />
              <Route path='/administration/principal-officers' element={<PrincipalOfficers />} />
              <Route path='/administration/principal-officers/:id' element={<POfficers />} />
              <Route path='/services/campus' element={<Campus />} />
              <Route path='/services/campus/:id' element={<CampusElement />} />
              <Route path='/faculties' element={<AllFaculty />} />
              <Route path='/faculties/:facultyId' element={<Faculty />} />
              <Route path='/admin-ict/oouagoiwoye-9g4c4h8sh' element={<AdminDash />} />
              
          </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
