import { NavLink } from 'react-router-dom';

const ServicesList = ({value, headerTitle}) => {
    return (
        <div className='flex'>
            <div className='w-full'>
                <ul className=" flex flex-col gap-6 pt-7 max-lg:px-0 max-lg:pt-3.5 font-500">
                    <div>
                        <h1 className='font-bold text-blue-800 text-md text-secondaryBlue'>{headerTitle}</h1>
                    </div>
                    {
                        value.map(({ title }, index) => {
                            return (
                                <li className=' font-thin hover:opacity-[.77] w-[100%]' key={index}>
                                    <NavLink to='/services'>
                                        {title}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default ServicesList
