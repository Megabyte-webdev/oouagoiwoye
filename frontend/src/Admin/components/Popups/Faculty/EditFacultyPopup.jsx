import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import SuccessModal from '../../../Auth/SuccessModal'; 
import {
    updateFaculty,
    updateBannerImage,
    updateDeanImg,
    updateFacultyContact,
    createFacultyLecturers,
    addDepartment,
  } from "../../../../../Redux/Slicers/FacultySlice";
//   import SuccessModal from "../../../Auth/SuccessModal";
  
  export default function facultyEdit({ close, id }) {
    const dispatch = useDispatch();
    const faculty = useSelector((state) => state.faculty.faculty);
    const [formData, setFormData] = useState({
      facultyData: {},
      facultyImage: {},
      deanImage: {},
      facultyContact: {},
      lecturer: {},
      department: {},
    });
  
    const [currentPage, setCurrentPage] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
  
    const handleChange = (e, key) => {
      const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
      setFormData((prev) => ({
        ...prev,
        [key]: { ...prev[key], [e.target.name]: value },
      }));
    };
  
    const handleSubmit = (action, key) => (e) => {
      e.preventDefault();
      dispatch(action(formData[key]));
      setSuccessMessage("Update successful!");
      setShowSuccess(true);
    };
  
    const renderForm = (title, fields, action, key) => (
      <form onSubmit={handleSubmit(action, key)} className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {fields.map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}:</label>
            <input
              type={type || "text"}
              name={name}
              placeholder={placeholder}
              onChange={(e) => handleChange(e, key)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            />
          </div>
        ))}
        <button className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600">
          {title}
        </button>
      </form>
    );
  
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
          <h2 className="text-2xl font-bold mb-6 text-center">Update Faculty</h2>
  
          {currentPage === 1 && (
            <div className="space-y-6">
              {renderForm(
                "Update Faculty Data",
                [
                  { label: "Faculty Name", name: "title", placeholder: "Enter new faculty name" },
                  { label: "Dean Name", name: "deanName", placeholder: "Enter dean name" },
                  { label: "No. of Departments", name: "noOfDepartments", type: "number", placeholder: "Enter number of departments" },
                  { label: "About Faculty", name: "body", placeholder: "Enter faculty info" },
                ],
                updateFaculty,
                "facultyData"
              )}
              {renderForm(
                "Update Faculty Image",
                [{ label: "Faculty Image", name: "image", type: "file" }],
                updateBannerImage,
                "facultyImage"
              )}
              <button
                onClick={() => setCurrentPage(2)}
                className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          )}
  
          {currentPage === 2 && (
            <div className="space-y-6">
              {renderForm(
                "Update Dean Image",
                [{ label: "Dean Image", name: "deanImage", type: "file" }],
                updateDeanImg,
                "deanImage"
              )}
              {renderForm(
                "Update Faculty Contact",
                [
                  { label: "WhatsApp", name: "whatsapp", placeholder: "WhatsApp No." },
                  { label: "Facebook", name: "facebook", placeholder: "Facebook profile" },
                  { label: "YouTube", name: "youtube", placeholder: "YouTube channel" },
                ],
                updateFacultyContact,
                "facultyContact"
              )}
              <button
                onClick={() => setCurrentPage(1)}
                className="w-full bg-gray-500 text-white font-bold py-2 rounded-lg hover:bg-gray-600"
              >
                Previous
              </button>
            </div>
          )}
  
          {showSuccess && (
            <SuccessModal
              message={successMessage}
              closeModal={() => setShowSuccess(false)}
            />
          )}
        </div>
      </div>
    );
  }
  
