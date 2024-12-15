import React from 'react'
import assets from '../assets/assets'

const ViceChancellor = () => {
    return (

        <section className="w-full h-auto bg-blue-100 py-10 px-5 flex flex-col lg:flex-row items-center justify-center">
            <article className='w-full lg:w-1/2'>
                <span className='flex flex-row items-center justify-center bg-gray-400/50 p-1 w-56'>
                    <i className='bx bx-buildings mr-1 text-xl text-blue-800'></i>
                    <h5 className="text-xl font-semibold text-blue-800 capitalize">vice-chancellor</h5>
                </span>
                {/* <h5 className="section-label"></h5> */}

                <h2 className="text-4xl font-bold my-3 capitalize">Prof. Agboola Ayodeji <br /> olayinka johnson</h2>
                <p className='text-blue-800 font-semibold text-xl my-2'>
                    OLABISI ONABANJO University Vice-Chancellor
                </p>

                <p className='mr-8 text-sm leading-7'>
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
