/* eslint-disable no-unused-vars */
import { FaAsterisk } from 'react-icons/fa'
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
import About from './Nav/About';
import Administration from './Nav/Administration';
import Admission from './Nav/Admission';
import Services from './Nav/Services';
import Login from './Nav/Login';
import LoginDeskTop from './Nav/LoginDeskTop';
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
        <div className=' py-4 flex justify-between w-11/12 mx-auto text-white items-center max-2xl:w-[94%] max-xl:w-[93%] max-lg:w-full max-xl:justify-between max-xl:gap-0'>
          <div className='max-lg:px-5 max-lg:h-[90px] max-lg:bg-[#010035] max-lg:flex max-lg:items-center max-lg:justify-between max-lg:w-full max-lg:absolute max-lg:top-[0] max-lg:translate-y-[0%] max-lg:left-[0] max-lg:right-[0%] max-lg:z-[99] max-md:px-2.5'>
            <img src={assets.logo} className='max-md:scale-[1] ' alt="logo" />
            <div className='hidden max-lg:text-3xl max-lg:block max-md:text-2xl' onClick={navBtnClick}>
              {
                menu ? <FaTimes /> : <FaBars />
              }
            </div>
          </div>
<<<<<<< HEAD:frontend/src/Components/Navbar.jsx
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
=======
          <div className={`relative max-lg:${menu ? 'block' : 'hidden'} max-lg:w-full `} >
            <ul className="gap-12 flex z-[99] max-2xl:gap-10 max-xl:gap-8 items-center font-bold cursor-pointer max-lg:flex-col max-lg:bg-white max-lg:text-[#010035] max-lg:absolute max-lg:top-[75px] max-lg:w-full max-lg:z-[99] max-lg:pt-8 max-lg:gap-7 max-lg:pb-0 max-lg:items-start max-xl:text-sm  max-lg:gap-0">
              <li className='xl:px-2 max-lg:px-8 max-md:px-7  max-lg:border-b-2 max-lg:pb-3 max-lg:w-full max-lg:pb-6'><NavLink to="/">
                <div className='max-lg:w-full max-lg:flex max-lg:gap-2 max-lg:items-center'>
                  <div className='lg:hidden'><FaAsterisk /></div>
                  <h1>Home</h1>
>>>>>>> fola:src/Components/Navbar.jsx
                </div>
              </NavLink></li>
              <About />
              <Administration />
              <Admission />
              <Services />
              <Login />
            </ul>
          </div>

          <LoginDeskTop />
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