import { FaAsterisk, FaBars, FaTimes } from 'react-icons/fa';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import assets from '../assets/assets';
import Notifications from './Notifications';
import About from './Nav/About';
import Administration from './Nav/Administration';
import Admission from './Nav/Admission';
import Services from './Nav/Services';
import Login from './Nav/Login';
import LoginDeskTop from './Nav/LoginDeskTop';
import { NavContext } from './Nav/useContext';
import Faculty from './Nav/Faculty';

const Navbar = () => {
  const {menu, setMenu, setAbout, setAdministration, setAdmission, setServices, setLogin}=useContext(NavContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const nav = useRef();

  useEffect(() => {
    let lastScrollPos = 0;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (window.scrollY > 100) {
        setIsScrolled(true);
        if (currentScrollPos > lastScrollPos) {
          nav.current.classList.add('trans');
        } else {
          nav.current.classList.remove('trans');
        }
      } else {
        setIsScrolled(false);
      }
      lastScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menu) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll'); // Cleanup on unmount
  }, [menu]);

  const navBtnClick = () => {
    setMenu(!menu);
  };

  return (
    <div className="text-white relative">
      <nav className="bg-[#010035] capitalize" ref={nav}>
        <div className="py-4 flex justify-between w-11/12 mx-auto items-center max-2xl:w-[96%]  max-lg:w-full max-xl:justify-between">
          <div className="px-5 lg:px-0 max-lg:h-[90px] max-lg:bg-[#010035] max-lg:flex max-lg:items-center max-lg:justify-between max-lg:w-full max-lg:absolute max-lg:top-0 max-lg:z-[99]">
            <img src={assets.logo} className="w-32 md:w-40" alt="logo" />
            <div className="hidden max-lg:text-3xl max-lg:block" onClick={navBtnClick}>
              {menu ? <FaTimes /> : <FaBars />}
            </div>
          </div>

          <div
            className={`relative h-auto max-lg:${menu ? 'block min-h-screen overflow-y-auto' : 'hidden'} max-lg:w-full`}
          >
            <ul className="gap-3 lg:gap-5 flex items-center font-bold max-lg:flex-col max-lg:bg-white max-lg:text-[#010035] max-lg:gap-y-1 max-lg:absolute max-lg:top-[75px] max-lg:w-full max-lg:pt-8 max-lg:pb-0 max-lg:items-start">
              <li className="xl:px-2 max-lg:px-8 max-lg:border-b-2 max-lg:w-full max-lg:pb-6">
                <NavLink to="/">
                  <div className="max-lg:w-full max-lg:flex max-lg:gap-2 max-lg:items-center">
                    <div className="lg:hidden">
                      <FaAsterisk />
                    </div>
                    <Link to="/" onClick={()=>{setMenu(false); setAbout(false); setAdministration(false); setAdmission(false); setServices(false); setLogin(false)}}>Home</Link>
                  </div>
                </NavLink>
              </li>
              <About />
              <Administration />
              <Faculty />
              <Admission />
              <Services />
              <Login />
            </ul>
          </div>

          <LoginDeskTop />
        </div>
      </nav>
      <article className="bg-[#0B35A2] w-full py-5 max-lg:mt-14">
        <Marquee pauseOnHover speed={60}>
          <div className="flex w-full gap-12">
            {/*<h5>News</h5>*/}
            <ul className="flex justify-evenly gap-12 divide-x-2 divide-reverse">
              <Notifications />
            </ul>
          </div>
        </Marquee>
      </article>
    </div>
  );
};

export default Navbar;
