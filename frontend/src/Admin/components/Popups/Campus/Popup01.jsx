import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import SuccessModal from '../../../Auth/SuccessModal';
import {
  updateCampusData,
  updateCampusImage,
  updateCampusContact,
} from '../../../../../Redux/Slicers/CampusSlice';
import CampusDetailsForm from './UpdateCampusDetailsForm';
import CampusImageForm from './UpdateCampusImage';
import CampusContactForm from './UpdatecampusContact';

const Popup01 = ({ close, id, campusDetails }) => {
  console.log('Popup01 props:', { close, campusDetails, id }); // Debugging - Please remove if i forget

  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    campusInfo: '',
    image: null,
    facebook: '',
    whatsapp: '',
    youtube: '',
    location: '',
  });

  // Pre-fill form with existing campus details
  useEffect(() => {
    if (campusDetails) {
      setFormData({
        title: campusDetails.title || '',
        campusInfo: campusDetails.campusInfo || '',
        image: null,
        facebook: campusDetails.Contact?.facebook || '',
        youtube: campusDetails.Contact?.youtube || '',
        whatsapp: campusDetails.Contact?.whatsapp || '',
        location: campusDetails.location || '',
      });
    }
  }, [campusDetails]);

  // Handle Form Submission
  const handleFormSubmit = async (e, formType) => {
    e.preventDefault();
    setLoading(true); 

    try {
      let action;
      if (formType === 'details') {
        action = updateCampusData({
          id,
          data: { title: formData.title, campusInfo: formData.campusInfo, location: formData.location },
        });
      } else if (formType === 'image') {
        const formDataObj = new FormData();
        formDataObj.append('image', formData.image);
        action = updateCampusImage({ id, formData: formDataObj });
      } else if (formType === 'contact') {
        action = updateCampusContact({
          id,
          data: { facebook: formData.facebook, whatsapp: formData.whatsapp, youtube: formData.youtube },
        });
      } else {
        setErrorMessage('Invalid update type');
        return;
      }

      await dispatch(action).unwrap(); 

      setSuccessMessage(`Campus ${formType} updated successfully!`);
      setShowSuccess(true);
    } catch (err) {
      setErrorMessage(err?.message || 'Error updating campus');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
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
            <CampusDetailsForm
              formData={formData}
              handleInputChange={handleInputChange}
              loading={loading}
              onSubmit={(e) => handleFormSubmit(e, 'details')}
            />
            <CampusImageForm
              handleFileChange={handleFileChange}
              loading={loading}
              onSubmit={(e) => handleFormSubmit(e, 'image')}
            />
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

        {/* Page 2: Campus Contact */}
        {currentPage === 2 && (
          <CampusContactForm
            formData={formData}
            handleInputChange={handleInputChange}
            loading={loading}
            onSubmit={(e) => handleFormSubmit(e, 'contact')}
          />
        )}

        {/* Success Modal */}
        {showSuccess && (
          <SuccessModal
            message={successMessage}
            closeModal={() => setShowSuccess(false)}
          />
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 font-semibold mt-4 text-center">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup01;