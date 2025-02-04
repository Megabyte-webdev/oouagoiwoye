import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { BsTrashFill } from 'react-icons/bs';
import { EyeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampus, deleteCampus, createCampus } from '../../../../Redux/Slicers/CampusSlice';
import Popup01 from '../Popups/Campus/Popup01';
import PopupCampusDetails from '../Popups/Campus/CampusDetailsPopup';
import DeleteConfirmationModal from './ConfirmDelete';

export default function Campuses() {
  const [pop, setPop] = useState(false);
  const [detailsPop, setDetailsPop] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCampusId, setSelectedCampusId] = useState(null);
  const [campusDetails, setCampusDetails] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    campusInfo: '',
    location: '',
    facebook: '',
    whatsapp: '',
    youtube: '',
  });
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const campuses = useSelector((state) => state.campus.campuses || []);
  const loading = useSelector((state) => state.campus.loading);
  const error = useSelector((state) => state.campus.error);

  useEffect(() => {
    dispatch(fetchCampus());
  }, [dispatch]);

  const handlePopupOpen = (campusId) => {
    console.log('Opening popup for campus ID:', campusId);
    const campus = campuses.find((campus) => campus.id === campusId);
    if (campus) {
      console.log('Campus found:', campus);
      setCampusDetails(campus);
      setSelectedCampusId(campusId);
      setPop(true);
    } else {
      console.warn('Campus not found for ID:', campusId);
    }
  };

  const handlePopupClose = () => {
    setPop(false);
    setCampusDetails(null);
    setSelectedCampusId(null);
  };

  const handleDetailsPopupOpen = (campusId) => {
    const campus = campuses.find((campus) => campus.id === campusId);
    if (campus) {
      setCampusDetails(campus);
      setDetailsPop(true);
    }
  };

  const handleDetailsPopupClose = () => {
    setDetailsPop(false);
    setCampusDetails(null);
  };

  const handleDeleteCampus = (campusId) => {
    setSelectedCampusId(campusId);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteCampus(selectedCampusId));
    setDeleteModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleCreateCampus = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('campusInfo', formData.campusInfo);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('facebook', formData.facebook);
    formDataToSend.append('whatsapp', formData.whatsapp);
    formDataToSend.append('youtube', formData.youtube);


    try {
      const result = await dispatch(createCampus(formDataToSend)).unwrap();
      setSuccessMessage('Campus created successfully!');
      setSuccess(true);
      setFormData({
        title: '',
        image: null,
        campusInfo: '',
        location: '',
        facebook: '',
        whatsapp: '',
        youtube: '',
      });
      // Refetch campuses to update the list
      dispatch(fetchCampus());
    } catch (error) {
      setSuccessMessage(`Failed to create campus: ${error?.message || "Unknown error"}`);
      setSuccess(true);
    }
  };

  const SuccessModal = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-lg text-gray-700 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Campus Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Create Campus</h2>
          <form
            action=""
            encType="multipart/form-data"
            className="space-y-4"
            onSubmit={handleCreateCampus}
          >
            {/* Title */}
            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter campus title"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-500"
              />
            </div>

            {/* Image */}
            <div>
              <label htmlFor="image" className="block font-medium mb-1">
                Image:
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
              />
            </div>

            {/* Campus History */}
            <div>
              <label htmlFor="campusInfo" className="block font-medium mb-1">
                Campus History:
              </label>
              <input
                type="text"
                name="campusInfo"
                value={formData.campusInfo}
                onChange={handleInputChange}
                placeholder="Enter campus information"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-500"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="campusLocation" className="block font-medium mb-1">
                Location:
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter campus location"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg flex items-center justify-center hover:bg-orange-600"
            >
              Create <FaPlus className="ml-2" />
            </button>
          </form>
        </div>

        {/* Campus List */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Campus List</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-4 font-semibold bg-gray-200 p-3 rounded-md">
              <span className="col-span-1 text-center">No.</span>
              <span className="col-span-2 text-center">Campus</span>
              {/* <span className="col-span-3 text-center">Faculties</span> */}
              <span className="col-span-5 text-center">Faculty No.</span>
              <span className="col-span-4 text-center">Actions</span>
            </div>
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : campuses.length > 0 ? (
              campuses.map((campus, index) => (
                <div
                  key={campus.id}
                  className="grid grid-cols-12 gap-4 bg-gray-100 p-3 rounded-md hover:bg-gray-300 max-h-[90vh] overflow-y-auto"
                >
                  <span className="col-span-1 text-center">{index + 1}.</span>
                  <span className="col-span-4 text-left">{campus.title || 'N/A'}</span>
                  <span className="col-span-3 text-center">{campus.faculties.length || 'N/A'}</span>
                  <div className="col-span-4 flex justify-around items-center">
                    <CiEdit
                      className="text-xl text-blue-500 cursor-pointer hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handlePopupOpen(campus.id);
                      }}
                    />
                    <EyeFilled
                      className="text-xl text-blue-500 cursor-pointer hover:scale-110"
                      onClick={() => handleDetailsPopupOpen(campus.id)}
                    />
                    <BsTrashFill
                      className="text-xl text-red-500 cursor-pointer hover:scale-110"
                      onClick={() => handleDeleteCampus(campus.id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No campuses available</p>
            )}
          </div>
        </div>
      </div>

      {/* Popups */}
      {pop && campusDetails && (
        <Popup01
          close={handlePopupClose}
          campusDetails={campusDetails}
          id={selectedCampusId} 
        />
      )}
      {detailsPop && campusDetails && (
        <PopupCampusDetails close={handleDetailsPopupClose} details={campusDetails} />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Success Modal */}
      {success && (
        <SuccessModal
          message={successMessage}
          onClose={() => setSuccess(false)}
        />
      )}
    </div>
  );
}