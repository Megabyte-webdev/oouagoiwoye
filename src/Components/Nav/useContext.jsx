import { createContext, useState } from 'react'
import Navbar from '../Navbar';

export const NavContext = createContext();

const NavBar = () => {

    const [about, setAbout] = useState(false);
    const [administration, setAdministration] = useState(false);
    const [admission, setAdmission] = useState(false);
    const [services, setServices] = useState(false);
    const [login, setLogin] = useState(false);

    return (
        <NavContext.Provider value={{ about, setAbout, administration, setAdministration, admission, setAdmission, services, setServices, login, setLogin }}>
            <Navbar/>
        </NavContext.Provider>
    )
}

export default NavBar;
