import { Link, NavLink, useNavigate } from 'react-router-dom';
import { NavContext } from '../useContext';
import { useContext } from 'react';

const ServicesList = ({value, address, headerTitle}) => {
const navigate=useNavigate();    
  const {setMenu, setServices, setFaculty}=useContext(NavContext);
    return (
        <div className='flex'>
            <div className='w-full'>
                <ul className=" flex flex-col gap-6 pt-7 max-lg:px-0 max-lg:pt-3.5 font-500">
                    {!address.match("faculty") && <div>
                        <Link to={address} onClick={()=>{setServices(false); setFaculty(false); setMenu(false)}} className='font-bold text-blue-800 text-md text-secondaryBlue'>{headerTitle}</Link>
                    </div>}
                    {
                        value?.map((item, index) => {
                            return (
                                <NavLink to={`${address}/${address.match("faculty") ? item?.href : item?.title}`} onClick={()=>{setMenu(false); setServices(false); setFaculty(false)}} className='[&.active]:font-medium [&.active]:text-blue-900 cursor-pointer font-thin hover:opacity-[.77] w-[100%]' key={index}>
                                    
                                        {item?.title}
                                    
                                </NavLink>
                            )
                        })
                    }
                </ul>
                {/* See All Button */}
                {headerTitle === "Faculties"
                &&
                    <button
                        onClick={() => {navigate(address); setServices(false); setMenu(false); setFaculty(false)}}
                        className="mt-5 px-6 py-2 bg-blue-700 text-white font-semibold rounded-2xl hover:bg-blue-800 transition"
                    >
                        See All
                    </button>
                }
            </div>
        </div>
    )
}

export default ServicesList
