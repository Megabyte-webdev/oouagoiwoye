import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import img1 from "../assets/Group 19.png"
// import data from "../Data/faculty.json"

import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import CustomButton from './CustomButton';


export default function VideoComponent({data}) {
  
  return (
    <>
    <section className="w-full h-screen p-10 lg:p-12 bg-white">
            <article>
                <span className='bg-slate-300 min-w-20 p-2 justify-items-center'>
                    <i className='bx bx-buildings mr-1 text-xl text-blue-800'></i>
                    <span className="text-xl font-semibold text-blue-800">{data.tag}</span>
                </span>
                
                <h2 className="text-xl lg:text-3xl my-3 font-bold">{data.title}</h2>
            </article>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
				{data.items.map((item, index)=>(
           <div key={index} className=''>
            <img src={img1} alt="slide" className='w-full'/>
         </div>
        ))}
      </div>
    </section>
    </>
  )
}
