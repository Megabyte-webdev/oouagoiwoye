import React from 'react'
import assets from '../assets/assets'

const ViceChancellor = () => {
    return (

        <section className="w-full h-auto bg-bgBlue p-10 flex flex-col lg:flex-row items-center justify-center">
            <article className='w-full lg:w-1/2'>
                <span className='flex flex-row items-center justify-center bg-amber-950 p-1 w-56'>
                    <i className='bx bx-buildings mr-1 text-xl text-amber-500'></i>
                    <h5 className="text-xl font-semibold text-amber-500">Our vice-chancellor</h5>
                </span>
                {/* <h5 className="section-label"></h5> */}

                <h2 className="text-white text-4xl font-bold my-3">Prof. Agboola Ayodeji <br /> olayinka johnson</h2>
                <p className='text-blue-900 font-semibold text-xl my-2'>
                    OLABISI ONABANJO University Vice-Chancellor
                </p>

                <p className='mr-8 text-white text-sm leading-7'>
                    Olabisi Onabanjo University is a prominent institution committed to excellence in teaching, learning, research, and community engagement. Over the past few years, we have nurtured leaders across a multitude of disciplines through our diverse programs.
                </p>
            </article>
            <div className="image mt-4 lg:mt-0">
                <img src={assets.vc} alt="hero-img-large" />
            </div>

        </section>
    )
}

export default ViceChancellor
