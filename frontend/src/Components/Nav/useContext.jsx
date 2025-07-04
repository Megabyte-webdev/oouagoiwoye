import { createContext, useState } from 'react'
import Navbar from '../Navbar';

export const NavContext = createContext();

const NavBar = () => {

    const [about, setAbout] = useState(false);
    const [administration, setAdministration] = useState(false);
    const [admission, setAdmission] = useState(false);
    const [services, setServices] = useState(false);
    const [faculty, setFaculty] = useState(false);
    const [login, setLogin] = useState(false);
    const [menu, setMenu] = useState(false);

    return (
        <NavContext.Provider value={{ 
            menu, setMenu, 
            about, setAbout, 
            administration, setAdministration,
            admission, setAdmission, 
            services, setServices, 
            login, setLogin,
            faculty, setFaculty}}>
            <Navbar/>
        </NavContext.Provider>
    )
}

export default NavBar;
