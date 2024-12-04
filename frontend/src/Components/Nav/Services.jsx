import navListJson from '../../Json/navlist.json';
import { FaCaretDown, FaCaretUp, FaAsterisk } from 'react-icons/fa';
import { NavContext } from './useContext';
import { useContext } from 'react';
import ServicesList from './Services/ServicesList';
import ContinuingEducation from "../../Data/continuingEducation"
import {facultyData} from "../../Data/faculty"
import campusData from "../../Data/campus"
const Services = () => {
    const { setAbout, setAdministration, setAdmission, services, setServices, setLogin } = useContext(NavContext);

    const toggleBtn = () => {
        setAbout(false);
        setAdministration(false);
        setAdmission(false);
        setServices(!services);
        setLogin(false);
    };

    return (
        <div className='max-lg:w-full '>
            <div className={`group flex flex-col items-center relative max-lg:items-start max-lg:px-0 max-lg:w-full`}>
                <div className='flex gap-1 items-center max-lg:justify-between max-lg:px-8 max-lg:w-full max-md:px-7 max-lg:border-b-2 max-lg:py-7 z-[22]' onClick={toggleBtn}>
                    <div className='max-lg:w-full max-lg:flex max-lg:gap-2 max-lg:items-center cursor-pointer'>
                        <div className='lg:hidden'><FaAsterisk /></div>
                        <h1>Academics</h1>
                    </div>
                    <div>
                        {services ? <FaCaretUp /> : <FaCaretDown />}
                    </div>
                </div>

                {services && <div>
                    <div className="{`cursor-pointer bg-white text-[#010035]  font-light z-50 w-[90vw] mx-auto py-8 text-md absolute px-8 left-[0%] translate-x-[-67%] max-xl:translate-x-[-70%] top-[55px] group-hover:block max-lg:top-[43%] max-lg:left-[0%] max-lg:translate-x-[0%] max-lg:translate-y-[7%]`} max-lg:static max-lg:py-2.5">
                        <div className='hidden lg:block w-5 h-5 -rotate-45 bg-white absolute -top-2 right-1/4 -translate-x-11'/>
                        <div className=' flex gap-2 items-center pb-3 border-b-[3px] w-full max-lg:hidden'>
                            <div><FaAsterisk /></div>
                            <h1 className='text-xl font-bold '>Services</h1>
                        </div>
                        <div className="flex justify-between max-lg:flex-col max-lg:gap-5">
                            <ServicesList headerTitle='Campus' address="services/campus" value={campusData} />
                            <ServicesList headerTitle='Faculities' address="services/faculty" value={facultyData?.items.slice(0, Math.round(facultyData?.items.length/2))} />
                            <ServicesList headerTitle='Faculities' address="services/faculty" value={facultyData?.items.slice(Math.round(facultyData?.items.length/2))} />
                            <ServicesList headerTitle='Continuing Education' address="services/continuing" value={ContinuingEducation} />
                            <ServicesList headerTitle='Directorates' address="services/directorate" value={navListJson.services.directorates} />
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Services
