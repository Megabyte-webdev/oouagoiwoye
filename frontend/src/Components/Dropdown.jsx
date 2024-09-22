/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';

const Dropdown = ({ subNav, title, link, width }) => {
  const [drop, setDrop] = useState(false);
  // const dropList = useRef();
  // const dropStyle = { "--drop-height": `${dropList.scrollHeight}` };
  return (
    <li className={`group ${width ? ' px-1' : 'px-3.5' } flex flex-col items-center relative`}>
      <div className='flex items-center gap-1'>
      {title}
        <FaCaretDown />
      </div>

      <div className={`cursor-pointer hidden bg-white text-[#010035]  font-light z-50  py-5 text-md absolute min-w-[180%] ${width ? 'min-w-[150%]' : 'min-w-[180%]' } px-3  left-[50%] translate-x-[-50%] top-[110%] group-hover:block`} >
        <NavLink to={link} className='block w-full'>
          <ul className=" flex flex-col gap-7" >
            {
              subNav.map(({ title }, index) => {
                return <li className=' font-thin hover:opacity-[.77] w-[100%]' key={index}>{title}</li>
              })
            }
          </ul>
        </NavLink>
      </div>

    </li>

  )
};

export default Dropdown;