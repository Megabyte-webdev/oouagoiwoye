import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import collaboration1 from "../assets/collaboration1.jpg";
import collaboration2 from "../assets/collaboration2.jpg";
import collaboration3 from "../assets/collaboration3.jpg";

const PhotoGallery = () => {
  const images = [collaboration1, collaboration2, collaboration3, collaboration1, collaboration2, collaboration3];

  return (
    <div className="w-full px-4 py-10 bg-white">
      <h2 className="text-3xl font-bold text-blue-800 my-10">
        Collaborations
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20} // Space between slides
        slidesPerView={1.4} // Main slide fully visible, partial neighbors
        centeredSlides={true} // Center the active slide
        loop={true} // Enables infinite loop
        autoplay={{
          delay: 2500, // Slide changes every 3 seconds
          disableOnInteraction: false, // Keeps autoplay active even after interaction
        }}
        navigation
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            
            return `<span class="${className}" style=" 
              background-color: '#1D4ED8'; 
              border-radius: 50%; 
              margin: 0 4px; 
              display: inline-block; 
            "></span>`;
          },
        }}
        lazy={true} // Lazy loading images
        preloadImages={true} // Ensure images are preloaded
        className="mySwiper w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[350px] md:h-[400px] object-cover rounded-lg shadow-md"
              style={{
                objectPosition: "50% 10%", // Prioritize the top of the image (can also use 'center' or '50% 50%')
              }}
              loading="lazy" // Use lazy loading for better performance
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoGallery;
