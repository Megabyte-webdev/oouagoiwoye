
import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { NavContext } from '../useContext';



const AdministrationList = ({ value, address, headerTitle }) => {
    const navigate=useNavigate();
    const {setMenu, setAdministration}=useContext(NavContext);
    
    return (
        <div className='flex'>
            <div className='w-full'>
            <ul className=" flex flex-col gap-6 pt-7 max-lg:px-0 max-lg:pt-3.5 font-500">
                        <div>
                            <Link to={address} onClick={()=>{setMenu(false); setAdministration(false)}} className='font-bold text-blue-800 text-md text-secondaryBlue'>{headerTitle}</Link>
                        </div>
                        {
                            value.map(({ title }, index) => {
                                return (
                                    <NavLink to={`${address}/${title}`} onClick={()=>{setMenu(false); setAdministration(false)}} className='[&.active]:font-medium [&.active]:text-blue-900 cursor-pointer font-thin hover:opacity-[.77] w-[100%]' key={index}>
                                            {title}
                                    </NavLink>
                                )
                            })
                        }
                    </ul>
            </div>
        </div>
    );
};

export default AdministrationList;
