import React from 'react'
import assets from '../assets/assets'
import CustomButton from './CustomButton'
import { useNavigate } from 'react-router-dom'
const About = () => {
    const navigate=useNavigate();
  return (
    <div>
        <section className="w-full bg-blue-100 flex flex-col-reverse lg:flex-row items-center justify-center p-10">
            <div className="w-full lg:w-1/3 mr-10 mt-10 lg:mt-0">
                <img src={assets.group4} alt="hero-img-large" />
            </div>
            <article className='w-full lg:w-1/2'>
                <div className='flex flex-row items-center justify-center bg-slate-300 w-60 p-1 my-4'>
                    <i className='bx bx-buildings mr-1 text-xl text-blue-800'></i>
                    <h5 className="text-xl font-semibold text-blue-800">About our University</h5>
                </div>
                {/* <h5 className="section-label"></h5> */}

                <h2 className="text-xl lg:text-3xl font-semibold">A good education is a foundation for a better future</h2>

                <p className='w-9/12 mb-8'>
                    Olabisi Onabanjo University is a prominent insitution to excellence in teaching, research and
                    community engagement. Over the past few years, we have nurtured leaders acros a multitude of
                    disciplines through our diverse programs.
                </p>
                <CustomButton handleClick={()=>navigate('/about')} />
                {/* <button className="primary-btn"><a href="">Check it out</a></button> */}
            </article>

        </section>
    </div>
  )
}

export default About