import React from 'react'
import assets from '../assets/assets'
const Footer = () => {
  return (
    <footer className="bg-bgBlue text-white py-10 px-5 lg:p-20">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-14">
        <section className="cols">
            <h2 className='text-lg font-semibold'>Contact Us</h2>
            <p className='text-sm my-2 text-slate-400 flex items-center'><i className='bx bxs-phone-call text-white mr-2'></i><a href="tel:+2348106244890">(+234)705-211-2362</a></p>
            <p className='text-sm my-2 text-slate-400'><i className='bx bxs-envelope text-white mr-2'></i><a href="">enquiries@oouagoiwoye.edu.ng</a></p>
            <p className='text-sm my-2 text-slate-400 flex justify-between items-start'><i className='bx bxs-map-alt text-white mr-2 mt-1'></i><a>Olabisi Onabanjo University, Ago Iwoye, Ogun State.</a></p>
        </section>
        <section className="col">
            <h2 className='text-lg font-semibold'>Our Campus</h2>
            <p className='text-sm my-2 text-slate-400'><a href="">EduPortal</a></p>
            <p className='text-sm my-2 text-slate-400'><a href="#">University Library</a></p>
            <p className='text-sm my-2 text-slate-400'><a href="#">Inauguration Lecture Series</a></p>
            <p className='text-sm my-2 text-slate-400'><a href="#">Tetfund Projects</a></p>
            <p className='text-sm my-2 text-slate-400'><a href="#">Academic Calenders</a></p>
        </section>
        <section className="col">
            <h2 className='text-lg font-semibold'>Academics</h2>
            <p className='text-sm my-2 text-slate-400'><a href="#">Staff Portal</a></p>
            <p className='text-sm my-2 text-slate-400'><a href="#">Business School</a></p>
            <p className='text-sm my-2 text-slate-400'><a href="#">Continuing Education</a></p>
            <p className='text-sm my-2 text-slate-400'><a href="#">Open Distance Learning</a></p>
            <p className='text-sm my-2 text-slate-400'><a href="#">Research & Linkage</a></p>
        </section>
        <section className="col">
            <h2 className='text-lg font-semibold'>Campus Life</h2>
            <p className='text-sm my-2 text-slate-400'><a href="#">Webmail</a></p>
            <p className='text-sm my-2 text-slate-400'><a href="#">Siwes</a></p>
            <p className='text-sm my-2 text-slate-400'><a href="#"></a>Alumni</p>
            <p className='text-sm my-2 text-slate-400'><a href="">Bulletin</a></p>
            <p className='text-sm my-2 text-slate-400'><a href="#">Career</a></p>
        </section>
    </div>
    <hr className='mx-5 lg:mx-20 mb-9 mt-20'/>
    <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
        <img className="logo" src={assets.logo} alt="logo" />
        <small className="copyright">Copyright &copy; 2024 OOU By ICTREC, All rights reserved.</small>
        <section className="grid grid-cols-3 gap-5">
            <a href=""><i className='bx bxl-whatsapp text-white text-2xl border-2 p-2 py-1 rounded-full'></i></a>
            <a href=""><i className='bx bxl-facebook-circle text-white text-2xl border-2 p-2 py-1 rounded-full'></i></a>
            <a href=""><i className='bx bxl-youtube text-white text-2xl border-2 p-2 py-1 rounded-full'></i></a>
        </section>
    </div>
</footer>
  )
}

export default Footer
