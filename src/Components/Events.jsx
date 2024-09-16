import React from 'react'
import Slider from './Slider'
import {data} from "../Data/news.js"
import SliderComponent from "./SliderComponent"

export default function Events() {
  return (
    <section className={`p-10 lg:p-20 bg-bgBlue`} id="faculties">
            <article>
            <div className='flex flex-row items-center justify-center bg-amber-950 p-1 w-56'>
                    <i className='bx bx-buildings mr-1 text-xl text-amber-500'></i>
                    <h5 className="text-xl font-semibold text-amber-500">{data.tag}</h5>
                </div>
                
                <h2 className="text-xl lg:text-3xl my-3 font-bold text-white">{data.title}</h2>
            </article>
            {/* <Slider showAll={showAll} slides={db} link="/all-faculties" /> */}
            <SliderComponent data={data.items} />
    </section>
  )
}
