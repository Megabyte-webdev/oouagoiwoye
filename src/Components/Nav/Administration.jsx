import { useContext } from 'react';
import navListJson from '../../Json/navlist.json';
import { FaCaretDown, FaCaretUp, FaAsterisk } from 'react-icons/fa';
import AdministrationList from './Administration/AdminsitrationList';
import { NavContext } from './useContext';
const Administration = () => {

    const { setAbout, administration, setAdministration, setAdmission, setServices, setLogin } = useContext(NavContext);

    const toggleBtn = () => {
        setAbout(false);
        setAdministration(!administration);
        setAdmission(false);
        setServices(false);
        setLogin(false);
    };

    return (
        <div className='max-lg:w-full'>
            <div className={`group flex flex-col items-center relative max-lg:items-start max-lg:px-0 max-lg:w-full`}>
                <div className='flex gap-1 items-center max-lg:justify-between max-lg:px-8 max-lg:w-full max-md:px-7 max-lg:border-b-2 max-lg:py-7 z-[22]' onClick={toggleBtn}>
                <div className='max-lg:w-full max-lg:flex max-lg:gap-2 max-lg:items-center'>
                    <div className='lg:hidden'><FaAsterisk/></div>
                        <h1>Administration</h1>
                    </div>
                    <div>
                        { administration ? <FaCaretUp/> : <FaCaretDown />}
                        {/* <FaCaretUp/> */}
                    </div>
                </div>

                {administration && <div className='max-lg:w-full max-lg:overflow-scroll'>
                    <div className="cursor-pointer w-[400%] bg-white text-[#010035]  font-light z-50 py-8 text-md absolute px-8 left-[50%] translate-x-[-50%] top-[55px] group-hover:block max-lg:top-[0%] max-lg:left-[0%] max-lg:translate-x-[0%] max-lg:translate-y-[0%] max-lg:static max-lg:py-0 max-lg:w-[100%] ">
                        <div className='w-full max-lg:hidden flex gap-2 items-center pb-3 border-b-[3px]'>
                        <div><FaAsterisk/></div>
                            <h1 className='text-xl font-bold'>Administration</h1>
                        </div>
                        <div className="flex gap-6 wrap max-lg:flex-col">
                            <AdministrationList value={navListJson.administration.administrations} headerTitle='Adminstrations' />
                            <AdministrationList value={navListJson.administration.Principal_Officers} headerTitle='Principal Officers' />
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Administration;
