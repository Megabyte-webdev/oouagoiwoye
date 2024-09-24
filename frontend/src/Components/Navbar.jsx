/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import assets from '../assets/assets'
import faculties from '../faculties.json'
import administration from '../administration.json'
import admission from '../admissions.json'
import Notifications from './Notifications';
import { NavLink } from 'react-router-dom';
import Dropdown from './Dropdown';
import Marquee from 'react-fast-marquee';
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const nav = useRef();
  const brief = useRef();
  // alert(brief.current.scrollWidth);
  let lastScrollPos = 0;

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let currentScrollPos = window.scrollY;
      window.scrollY > 100 ? setIsScrolled(true) : setIsScrolled(false);
      window.scrollY > 100 && currentScrollPos > lastScrollPos ? nav.current.classList.add("trans") : nav.current.classList.remove("trans");
      window.addEventListener('scrollend', () => {
        lastScrollPos = currentScrollPos;
      });
    });
  }, []);


  return (
    <div className='text-white'>
      <nav className='bg-[#010035]'>
        <div className='py-4 flex justify-between w-11/12 mx-auto text-white items-center'>
          <div>
            <img src={assets.logo} alt="logo" />
          </div>
          <ul className="flex gap-12 font-bold cursor-pointer">
            <div className='hidden max-md:block' onClick={() => setMenu(!menu)}>
              {
                menu ? <FaTimes /> : null
              }
            </div>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <Dropdown subNav={administration}  width={true} title="Administration" link="/administration" />
            <Dropdown subNav={admission}  width={true} title="Admissions" link="/admission" />
            <Dropdown subNav={faculties} title="Faculties" link="/all-faculties" />
            <Dropdown subNav={faculties} title="Library" link="/library" />

          </ul>
          <div className=' relative'>
            <button className='bg-[#0B35A2] px-4 py-2 rounded-sm shadow-3xl shadow-[goldenrod] shadow-[7px_7px] pointer'>Login Here</button>
          </div>
        </div>

        <div className='hidden max-md:block' onClick={() => setMenu(!menu)}>
          {
            menu ? null : <FaBars />
          }
        </div>
      </nav>
      <article className='bg-[#0B35A2] w-full py-5 '>
        <Marquee pauseOnHover speed={60}>
          <div className='flex w-full gap-12 '>
            <h5>News</h5>
            <ul className='flex justify-evenly gap-12'>
              <Notifications />
            </ul>
          </div>
        </Marquee>
      </article>
    </div>
  )
};

export default Navbar;