import React,{useState} from "react";
import CustomButton from "./CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "./swipe.css";
import img from "../assets/assets";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link, useNavigate } from "react-router-dom";

export default function sliderComponent({ data, design = "", hideBtn=false, btnDesc, address}) {
  const navigate=useNavigate();
  
  const TextTruncator=(text)=>{
    const [isTruncated, setIsTruncated]= useState(true);
  const truncatedText=text?.slice(0,300)+"...";
  return(
    <p>
      {isTruncated ? truncatedText : text}
      {/* <small className="cursor-pointer text-sm font-semibold" onClick={()=>setIsTruncated(!isTruncated)}>{isTruncated ? "...Read More" : "...Read Less"}</small> */}
    </p>
  )
  }  
  
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
        {data?.map((item, index) => (
          <>
            {
            (design === "") && (
              <SwiperSlide key={index} className="bg-[#FFF] p-5 mb-10">
                <img src={item?.image} alt="slide" className="w-full object-cover h-48" />
                <div>
                  <h2 className="capitalize text-xl font-semibold my-2 mb-0">
                    {item?.title}
                  </h2>
                  <h2 className="text-sm font-semibold mt-0 my-2 text-blue-600">
                    {item?.subtitle}
                  </h2>
                  <p className="text-xs mt-0 my-2">{TextTruncator(item?.body)}</p>
                  <h2 className="text-xs font-medium mt-0 my-2 text-blue-600">
                    {item?.author}
                  </h2>
                </div>
                {!hideBtn && <CustomButton handleClick={()=>{navigate(`${address}/${item?.title}`); scrollTo(0,0)}} text={btnDesc && btnDesc} />}
              </SwiperSlide>
            )
            }
            {
            (design === "department") && (
              <SwiperSlide key={index} className="bg-[#f0f8ff] p-5 mb-10">
                {data && (
                  <img src={item?.image} alt="slide" className="w-full object-cover h-48" />
                )}
                <div>
                  <h2 className="capitalize text-lg text-blue-900 font-semibold mt-5 mb-0">
                    {item?.title}
                  </h2>
                  <h2 className="text-sm font-semibold mt-0 my-2 text-blue-600">
                    {item?.subtitle}
                  </h2>
                  <p className="text-xs mt-0 my-2">{TextTruncator(item?.body)}</p>
                  <h2 className="text-xs font-medium mt-0 my-2 text-blue-600">
                    {item?.author}
                  </h2>
                </div>
              </SwiperSlide>
            )}
            {
            (design === "lecturer") && (
              <SwiperSlide key={index} className="bg-[#f8f6f6] p-5 mb-10">
                {data && (
                  <img src={item?.image} alt="slide" className="w-full object-cover h-48" />
                )}
                <div>
                  <h2 className="capitalize text-lg text-blue-900 font-semibold mt-5 mb-0">
                    {item?.title}
                  </h2>
                  <h2 className="text-sm font-semibold mt-0 my-2 text-blue-600">
                    {item?.subtitle}
                  </h2>
                  <h2 className="text-xs font-medium mt-0 my-2 text-blue-600">
                    {item?.author}
                  </h2>
                  <div className='flex gap-3'>
                  {
                    Object.entries(item?.socials,).map(([key, value], index)=>(
                      <Link to={value} key={index} className={(key === 'linkedin' && 'bx bxl-linkedin-square text-blue-700 text-3xl cursor-pointer') || (key === 'twitter' && 'bx bxl-twitter text-blue-700 text-3xl cursor-pointer') }></Link>
                    ))
                  }
                  </div>
                  
                </div>
              </SwiperSlide>
            )}

          </>
        ))}
      </Swiper>
    </div>
  );
}
