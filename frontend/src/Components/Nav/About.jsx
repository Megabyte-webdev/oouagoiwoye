import navListJson from '../../Json/navlist.json';
import { FaCaretDown, FaCaretUp, FaAsterisk } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { NavContext } from './useContext';
import { useContext } from 'react';

const About = () => {

    const { setMenu, about, setAbout, setAdministration, setAdmission, setFaculty, setServices, setLogin } = useContext(NavContext);

    const toggleBtn = () => {
        setAbout(!about);
        setAdministration(false);
        setAdmission(false);
        setFaculty(false);
        setServices(false);
        setLogin(false);
    };
    return (
        <div className='max-lg:w-full '>
            <li className={`group flex flex-col items-center relative max-lg:items-start max-lg:px-0 max-lg:w-full`}>
                <div className='flex gap-1 items-center max-lg:justify-between max-lg:px-8 max-lg:w-full max-md:px-7 max-lg:border-b-2 max-lg:py-7 z-[22] ' onClick={toggleBtn} >
                    <div className='max-lg:w-full max-lg:flex max-lg:gap-2 max-lg:items-center cursor-pointer'>
                        <div className='lg:hidden'><FaAsterisk /></div>
                        <h1>About</h1>
                    </div>
                    <div>
                        {about ? <FaCaretUp /> : <FaCaretDown />}
                    </div>
                </div>
                {about && <div className={`bg-white text-[#010035]  font-light z-50 py-8 text-md absolute px-8 w-[500%] left-[50%] translate-x-[-50%] top-[55px] group-hover:block max-lg:top-[0%] max-lg:left-[0%] max-lg:translate-x-[0%] max-lg:translate-y-[0%] max-lg:py-4 max-lg:static`} >
                    <div className='hidden lg:block w-5 h-5 -rotate-45 bg-white absolute -top-2 right-1/2 translate-x-1/2 ' />
                    <div className='w-full max-lg:hidden flex gap-2 items-center pb-3 border-b-[3px]'>
                        <div className='hidden lg:inline'><FaAsterisk /></div>
                        <Link Link to="/about" onClick={()=>{setMenu(false); setAbout(false)}} className='text-xl font-bold' > About Us</Link>
                    </div>
                    <ul className=" flex flex-col gap-7 pt-7 max-lg:px-0 max-lg:pt-0 font-500" >
                        {
                            navListJson.about.map((item, index) => (
                                <NavLink to={`/about#${item?.href}`} onClick={() => { setMenu(false); setAbout(false) }} className='[&.active]:font-medium [&.active]:text-blue-900 cursor-pointer font-thin hover:opacity-[.77] w-[100%]' key={index}>
                                    {item?.title}
                                </NavLink>
                            ))
                        }
                    </ul>
                </div>}
            </li>
        </div>
    );
};

export default About;
