import navListJson from '../../Json/navlist.json';
import { Link, NavLink } from 'react-router-dom';
import { FaCaretDown, FaCaretUp, FaAsterisk } from 'react-icons/fa';
import { NavContext } from './useContext';
import { useContext } from 'react';

const Login = () => {

    const { setAbout, setAdministration, setAdmission, setServices, login, setLogin } = useContext(NavContext);

    const toggleBtn = () => {
        setAbout(false);
        setAdministration(false);
        setAdmission(false);
        setServices(false);
        setLogin(!login);
    };
    return (
        <div className='lg:hidden max-lg:w-full max-lg:block '>
            <li className={`group xl:px-1 px-3.5  flex flex-col items-center relative max-lg:items-start max-lg:px-0 max-lg:w-full`}>
                <div className={`lg:hidden max-lg:px-8 bg-[#0B35A2] max-lg:w-full py-3 flex justify-between items-center max-md:px-7 my-0 `} onClick={toggleBtn} >
                    <div className='max-lg:w-full max-lg:flex max-lg:gap-2 max-lg:items-center'>
                        <div className='lg:hidden'><FaAsterisk color='white' /></div>
                        <button className='bg-[#0B35A2] text-white pointer '>Login Here</button>
                    </div>
                    <div className='text-2xl'>
                        {login ? <FaCaretUp color='white' /> : <FaCaretDown color='white' />}
                    </div>
                </div>
                {login && <ul className=" flex flex-col pt-7 gap-7 max-lg:px-7 max-lg:pb-7 ">
                    {
                        navListJson.login.map(({ title, href }, index) => {
                            return <li className=' font-thin hover:opacity-[.77] w-[100%]' key={index}>
                                <Link to={href}>{title}</Link>
                            </li>
                        })
                    }
                </ul>}
            </li>
        </div>
    )
}

export default Login
