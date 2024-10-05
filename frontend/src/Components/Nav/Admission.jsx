import navListJson from '../../Json/navlist.json';
import { FaCaretDown, FaCaretUp, FaAsterisk } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { NavContext } from './useContext';
import { useContext } from 'react';

const Admission = () => {

    const { setAbout, setAdministration, admission, setAdmission, setServices, setLogin } = useContext(NavContext);

    const toggleBtn = () => {
        setAbout(false);
        setAdministration(false);
        setAdmission(!admission);
        setServices(false);
        setLogin(false);
    };
    return (
        <div className='max-lg:w-full '>
            <li className={`group xl:px-2 px-3.5  flex flex-col items-center relative max-lg:items-start max-lg:px-0 max-lg:w-full`}>
                <div className='flex gap-1 items-center max-lg:justify-between max-lg:px-8 max-lg:w-full max-md:px-7 max-lg:border-b-2 max-lg:py-7 z-[22]' onClick={toggleBtn}>
                    <div className='max-lg:w-full max-lg:flex max-lg:gap-2 max-lg:items-center cursor-pointer'>
                        <div className='lg:hidden'><FaAsterisk/></div>
                        <h1>Admission</h1>
                    </div>
                    <div>
                        {admission ? <FaCaretUp /> : <FaCaretDown />}
                    </div>
                </div>

                {admission && <div className={`bg-white text-[#010035]  font-light z-50 py-8 text-md absolute px-8 left-[50%] translate-x-[-50%] top-[55px] group-hover:block max-lg:top-[0%] max-lg:left-[0%] max-lg:translate-x-[0%] max-lg:translate-y-[0%] max-lg:static max-lg:py-0 max-lg:w-[100%]`} >
                    <div className='hidden lg:block w-5 h-5 -rotate-45 bg-white absolute -top-2 right-1/2 translate-x-1/2 '/>
                    <div className='flex gap-2 items-center pb-3 border-b-[3px] w-full max-lg:hidden'>
                        <div><FaAsterisk /></div>
                        <Link to={""} className='text-xl font-bold'>Admission</Link>
                    </div>

                    <ul className=" flex flex-col pt-7 gap-7 max-lg:px-0 max-lg:pt-3.5 font-500" >
                        {
                            navListJson.admissions.map(({ title, href }, index) => {
                                return <li className=' font-thin cursor-pointer hover:opacity-[.77] w-[100%]' key={index}>
                                    <Link to={href} className='block w-full'>{title}</Link></li>
                            })
                        }
                    </ul>

                </div>}

            </li>
        </div>
    )
}

export default Admission
