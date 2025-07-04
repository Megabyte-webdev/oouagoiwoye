import React, { useState } from "react";
import tour from "../assets/tour.svg";
import bg from "../assets/bg.png";

const Tour = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  const closeModal = () => {
    setShowVideo(false);
    setLoading(true); // Reset loader state for the next open
  };

  return (
    <section
      className="relative w-full h-[70vh] flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative w-11/12 max-w-3xl bg-white rounded-lg shadow-lg p-4">
            {/* Loader */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {/* Video */}
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your desired video link
              title="Tour Video"
              className="w-full h-64 md:h-96"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleVideoLoad}
            ></iframe>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full px-3 py-1 text-sm shadow-md hover:bg-red-600 focus:outline-none z-20"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <img src={tour} alt="Tour Icon" className="w-4/5 max-w-lg mb-6" />
      <button
        className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transform transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={() => setShowVideo(true)}
      >
        Take a Tour
      </button>
    </section>
  );
};

export default Tour;
