import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function PopupCampusDetails({ campus, close }) {
  if (!campus) {
    return null; 
  }

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
      onClick={close}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative animate-fade-in"
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
            <p className="text-gray-600">{campus.title || 'No title available'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">History:</h3>
            <p className="text-gray-600">{campus.history || 'No history provided'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Location:</h3>
            <p className="text-gray-600">{campus.location || 'No location specified'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Contact Email:</h3>
            <p className="text-gray-600">{campus.contactEmail || 'Not available'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Contact Phone:</h3>
            <p className="text-gray-600">{campus.contactPhone || 'Not available'}</p>
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
}
