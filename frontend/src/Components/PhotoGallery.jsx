import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import assets from "../assets/assets";

const PhotoGallery = () => {
  const images = [
    assets.hero_img, // Replace with your image paths
    assets.imaage,
    assets.imaage,
  ];

  return (
    <div className="w-full px-4 py-8 bg-white">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Photo Gallery</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={2.5} // Show only 1 slide at a time
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
