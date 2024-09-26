import React from 'react'
import CustomButton from './CustomButton'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import "./swipe.css";
import img from "../assets/assets"


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function sliderComponent({data}) {
    
  return (
    <div>
        <Swiper
              // install Swiper modules
        modules={[Navigation, Pagination]}
		    spaceBetween={40}
		    slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        navigation
        pagination={{ clickable: true }}
		    >
        
		    {data.map((item, index)=>(
                <SwiperSlide key={index} className='bg-white p-5'>
                   {data && <img src={item.image} alt="slide" className='w-full'/>}
                    <div>
                    <h2 className='text-xl font-semibold my-2 mb-0'>{item.title}</h2>
                    <h2 className='text-sm font-semibold mt-0 my-2 text-blue-600'>{item.subtitle}</h2>
                    <p className='text-xs mt-0 my-2'>{item.body}</p>
                    <h2 className='text-xs font-medium mt-0 my-2 text-blue-600'>{item.author}</h2>
                    </div>
                    <CustomButton />
                </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
