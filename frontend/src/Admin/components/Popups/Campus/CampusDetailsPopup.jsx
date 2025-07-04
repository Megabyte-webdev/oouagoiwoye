import React from 'react';
import { FaTimes } from 'react-icons/fa';

const PopupCampusDetails = ({ details, close }) => {
  if (!details) {
    return null;
  }

  // Base URL for the API
  const baseUrl = 'http://localhost:5000';

  // Full image URL
  const fullImageUrl = `${baseUrl}/public/uploads/${details.image}`;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
      onClick={close}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative animate-fade-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <FaTimes
          className="absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer hover:text-gray-800"
          onClick={close}
          aria-label="Close"
        />

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Campus Details
        </h2>

        {/* Campus Details */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Campus Title:</h3>
            <p className="text-gray-600">{details.title || 'No title available'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Campus Image:</h3>
            <img src={fullImageUrl} alt="Campus" className="w-[100px] h-[100px]" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Campus Info:</h3>
            <p className="text-gray-600">{details.campusInfo || 'No history provided'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Location:</h3>
            <p className="text-gray-600">{details.location || 'No location specified'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Facebook</h3>
            <p className="text-gray-600">{details.Contact?.facebook || 'Not available'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Whatsapp</h3>
            <p className="text-gray-600">{details.Contact?.whatsapp || 'Not available'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Youtubeb </h3>
            <p className="text-gray-600">{details.Contact?.youtube || 'Not available'}</p>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 text-center">
          <button
            onClick={close}
            className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCampusDetails;