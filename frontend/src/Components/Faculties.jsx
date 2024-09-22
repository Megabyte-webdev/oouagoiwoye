import React from 'react';
import Slider from './Slider';

const Faculties = ({ theme, label, heading, showAll, db }) => {
    return (
        <section className={`p-10 lg:p-20 ${theme && theme} bg-blue-100`} id="faculties">
            <article>
                <div className='flex flex-row items-center justify-center bg-slate-300 w-40 p-1'>
                    <i className='bx bx-buildings mr-1 text-xl text-blue-800'></i>
                    <h5 className="text-xl font-semibold text-blue-800">{label}</h5>
                </div>
                
                <h2 className="text-xl lg:text-3xl my-3 font-bold">Programs Offered At <br /> Olabisi Onabanjo University</h2>
            </article>
            <Slider showAll={showAll} slides={db} link="/all-faculties" />
        </section>
    )
}
export default Faculties