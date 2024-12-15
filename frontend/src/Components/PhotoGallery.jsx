import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import collaboration1 from "../assets/collaboration1.jpg";
import collaboration2 from "../assets/collaboration2.jpg" 
import collaboration3 from "../assets/collaboration3.jpg";

const PhotoGallery = () => {
  const images = [
    collaboration1,
    collaboration2,
    collaboration3,
  ];

  return (
    <div className="w-full px-4 py-8 bg-white">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Collaborations</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1} // Show only 1 slide at a time
        centeredSlides={true} // Center the main slide
        navigation
        className="w-full"
      >
        {images?.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[350px] md:h-[400px] object-cover rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoGallery;
