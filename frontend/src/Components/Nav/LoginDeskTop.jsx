import { NavContext } from './useContext';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import navListJson from '../../Json/navlist.json';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

const LoginDeskTop = () => {

    const { setAbout, setAdministration, setAdmission, setServices, login, setLogin } = useContext(NavContext);

    const toggleBtn = () => {
        setAbout(false);
        setAdministration(false);
        setAdmission(false);
        setServices(false);
        setLogin(!login);
    };
    return (
        <div className=' relative max-lg:hidden '>
            <button className='bg-[#0B35A2] px-4 py-2 rounded-sm shadow-3xl shadow-[goldenrod] shadow-[7px_7px] pointer w-full flex items-center gap-3' onClick={toggleBtn}>Login Here
                <div>
                    {login ? <FaCaretUp /> : <FaCaretDown />}
                </div>
            </button>
            {login &&  <div className={` bg-white text-[#010035]  font-light z-50 py-8 text-md absolute px-8 w-[155%] left-[45%] translate-x-[-60%] top-[63px] group-hover:block max-lg:top-[0%] max-lg:left-[0%] max-lg:translate-x-[0%] max-lg:translate-y-[0%] max-lg:py-4 max-lg:static`} >
                <div className='block w-full max-lg:hidden'>
                    <h1 className='text-xl font-bold pb-2 border-b-[3px]'>Login</h1>
                </div>
                <ul className=" flex flex-col pt-7 gap-7 max-lg:px-7 max-lg:pb-7 ">
                    {
                        navListJson.login.map(({ title, href }, index) => {
                            return <li className=' font-thin hover:opacity-[.77] w-[100%]' key={index}>
                                <NavLink to={href}>{title}</NavLink>
                            </li>
                        })
                    }
                </ul>

            </div>
            }
        </div>
    )
}

export default LoginDeskTop
