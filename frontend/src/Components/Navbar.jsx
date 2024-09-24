/* eslint-disable no-unused-vars */
import { FaCaretDown } from 'react-icons/fa'
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

  const navBtnClick = () => {
    setMenu(!menu);
  };


  return (
    <div className='text-white relative'>
      <nav className='bg-[#010035]'>
        <div className='py-4 flex justify-between w-11/12 mx-auto text-white items-center max-2xl:w-[94%] max-xl:w-[96%] max-xl:justify-start max-xl:gap-12'>
          <div className='max-lg:px-5 max-lg:h-[90px] max-lg:bg-[#010035] max-lg:flex max-lg:items-center max-lg:justify-between max-lg:w-full max-lg:fixed max-lg:top-[0] max-lg:left-[0] max-lg:right-[0%] max-lg:bottom-[90%] max-lg:z-[99] max-md:px-2.5 '>
            <img src={assets.logo} className='max-md:scale-[1] ' alt="logo" />
            <div className='hidden max-lg:text-3xl max-lg:block max-md:text-2xl' onClick={navBtnClick}>
              {
                menu ? <FaTimes /> : <FaBars />
              }
            </div>
          </div>
          <div className={`relative max-lg:${menu ? 'block' : 'hidden'}`} >
            <ul className=" max-3xl:gap-12 flex z-[99] max-2xl:gap-5 max-xl:gap-3 items-center font-bold cursor-pointer max-lg:flex-col max-lg:bg-white max-lg:text-[#010035] max-lg:fixed max-lg:top-[90px] max-lg:left-[50%] max-lg:translate-x-[-50%] max-lg:w-full max-lg:z-[99] max-lg:pt-8 max-lg:gap-7 max-lg:pb-0 max-lg:items-start">
              <li className='max-lg:px-10 max-md:px-7'><NavLink to="/">Home</NavLink></li>
              <hr />
              <li className='max-lg:px-10 max-md:px-7'><NavLink to="/about">About Us</NavLink></li>
              <hr />
              <Dropdown subNav={administration} width={true} title="Administration" link="/administration" />
              <hr />
              <Dropdown subNav={admission} width={true} title="Admissions" link="/admission" />
              <hr />
              <Dropdown subNav={faculties} title="Services" link="/all-faculties" />
              <hr />
              <Dropdown subNav={faculties} title="Library" link="/library" />
              {/* <hr /> */}
              <div className='lg:hidden max-lg:px-10 bg-[#0B35A2] w-full py-3 flex justify-between items-center max-md:px-7 my-0'>
                <button className='bg-[#0B35A2] text-white pointer '>Login Here</button>
                <div className='text-2xl'>
                  <FaCaretDown color='white' />
                </div>
              </div>
            </ul>
          </div>

          <div className=' relative max-lg:hidden'>
            <button className='bg-[#0B35A2] px-4 py-2 rounded-sm shadow-3xl shadow-[goldenrod] shadow-[7px_7px] pointer'>Login Here</button>
          </div>
        </div>
      </nav>
      <article className='bg-[#0B35A2] w-full py-5 max-lg:mt-14 '>
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