import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import SuccessModal from '../../Auth/SuccessModal'; // Assuming this is the success modal component.

export default function Popup01({ close, id }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 

  const handleFormSubmit = (e, formType) => {
    e.preventDefault();
    // Simulated form submission logic
    if (formType === 'details') {
      setSuccessMessage('Campus details updated successfully!');
    } else if (formType === 'image') {
      setSuccessMessage('Campus image updated successfully!');
    } else if (formType === 'contact') {
      setSuccessMessage('Campus contact updated successfully!');
    } else if (formType === 'location') {
      setSuccessMessage('Campus location updated successfully!');
    } else {
      setErrorMessage('An error occurred while updating the campus.');
      return;
    }
    setShowSuccess(true);
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
      onClick={close}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <FaTimes
          className="absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer hover:text-gray-800"
          onClick={close}
        />
        <h2 className="text-2xl font-bold mb-6 text-center">Update Campus</h2>

        {/* Page 1: Campus Details and Image */}
        {currentPage === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form 1: Update Campus Details */}
            <form className="space-y-4" onSubmit={(e) => handleFormSubmit(e, 'details')}>
              <h3 className="text-lg font-semibold">Update Campus Details</h3>
              <div>
                <label className="block font-medium mb-1">Title:</label>
                <input
                  type="text"
                  placeholder="Enter campus title"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">History:</label>
                <input
                  type="text"
                  placeholder="Enter campus history"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                />
              </div>
              <button className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600">
                Update Details
              </button>
            </form>

            {/* Form 2: Update Campus Image */}
            <form className="space-y-4" onSubmit={(e) => handleFormSubmit(e, 'image')}>
              <h3 className="text-lg font-semibold">Update Campus Image</h3>
              <div>
                <label className="block font-medium mb-1">Image:</label>
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                />
              </div>
              <button className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600">
                Update Image
              </button>
            </form>

            {/* Next Button */}
            <div className="col-span-2 text-center mt-6">
              <button
                onClick={() => setCurrentPage(2)}
                className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Page 2: Campus Contact and Location */}
        {currentPage === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form 3: Update Campus Contact */}
            <form className="space-y-4" onSubmit={(e) => handleFormSubmit(e, 'contact')}>
              <h3 className="text-lg font-semibold">Update Campus Contact</h3>
              <div>
                <label className="block font-medium mb-1">Contact Email:</label>
                <input
                  type="email"
                  placeholder="Enter campus contact email"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Contact Phone:</label>
                <input
                  type="tel"
                  placeholder="Enter campus contact phone"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                />
              </div>
              <button className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600">
                Update Contact
              </button>
            </form>

            {/* Form 4: Update Campus Location */}
            <form className="space-y-4" onSubmit={(e) => handleFormSubmit(e, 'location')}>
              <h3 className="text-lg font-semibold">Update Campus Location</h3>
              <div>
                <label className="block font-medium mb-1">Location:</label>
                <input
                  type="text"
                  placeholder="Enter campus location"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-500"
                />
              </div>
              <button className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600">
                Update Location
              </button>
            </form>

            {/* Previous Button */}
            <div className="col-span-2 text-center mt-6">
              <button
                onClick={() => setCurrentPage(1)}
                className="bg-gray-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-600"
              >
                Previous
              </button>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccess && (
          <SuccessModal
            message={successMessage}
            closeModal={() => setShowSuccess(false)}
          />
        )}

        {/* Error Handling */}
        {errorMessage && (
          <div className="text-red-500 font-semibold mt-4 text-center">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
