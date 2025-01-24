import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PopupEditFaculty from "../Popups/Faculty/EditFacultyPopup";
// import PopupFacultyDetails from "../Popups/Faculty/FacultyDetailsPopup";
import {
  fetchFaculty,
  updateFaculty,
  updateBannerImage,
  updateDeanImg,
  updateFacultyContact,
  createFacultyLecturers,
  addDepartment,
} from "../../../../Redux/Slicers/FacultySlice";

export default function Faculty() {
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

  const [popup, setPopup] = useState({ edit: false, details: false });

  useEffect(() => {
    dispatch(fetchFaculty());
  }, [dispatch]);

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
  };

  const renderForm = (title, fields, action, key) => (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-xl mb-3 text-center">{title}</h3>
      <form onSubmit={handleSubmit(action, key)} className="space-y-4">
        {fields.map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}:</label>
            <input
              type={type || "text"}
              name={name}
              placeholder={placeholder}
              onChange={(e) => handleChange(e, key)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
        >
          {title}
        </button>
      </form>
    </div>
  );

  return (
    <div className="w-full h-full p-4 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Faculty Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="font-semibold text-2xl mb-4 text-center">Faculty Details</h2>
          <div className="space-y-4">
            {[
              { label: "Name", value: faculty?.title },
              { label: "Dean", value: faculty?.deanName },
              { label: "Departments", value: faculty?.noOfDepartments },
              { label: "About", value: faculty?.body },
            ].map(({ label, value }) => (
              <p key={label}>
                <strong>{label}:</strong> {value || "N/A"}
              </p>
            ))}
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => setPopup({ ...popup, edit: true })}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => setPopup({ ...popup, details: true })}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Forms Section */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6 overflow-y-auto max-h-screen">
          {renderForm("Update Faculty Data", [
            { label: "Faculty Name", name: "title", placeholder: "Enter new faculty name" },
            { label: "Dean Name", name: "deanName", placeholder: "Enter dean name" },
            { label: "No. of Departments", name: "noOfDepartments", type: "number", placeholder: "Enter number of departments" },
            { label: "About Faculty", name: "body", placeholder: "Enter faculty info" },
          ], updateFaculty, "facultyData")}

          {renderForm("Update Faculty Image", [
            { label: "Faculty Image", name: "image", type: "file" },
          ], updateBannerImage, "facultyImage")}

          {renderForm("Update Dean Image", [
            { label: "Dean Image", name: "deanImage", type: "file" },
          ], updateDeanImg, "deanImage")}

          {renderForm("Update Faculty Contact", [
            { label: "WhatsApp", name: "whatsapp", placeholder: "WhatsApp No." },
            { label: "Facebook", name: "facebook", placeholder: "Facebook profile" },
            { label: "YouTube", name: "youtube", placeholder: "YouTube channel" },
          ], updateFacultyContact, "facultyContact")}

          {renderForm("Create Lecturer", [
            { label: "Name", name: "name", placeholder: "Enter lecturer name" },
            { label: "Designation", name: "designation", placeholder: "Enter lecturer designation" },
            { label: "Image", name: "image", type: "file" },
          ], createFacultyLecturers, "lecturer")}

          {renderForm("Create Department", [
            { label: "Title", name: "title", placeholder: "Enter department title" },
            { label: "Image", name: "image", type: "file" },
            { label: "Body", name: "body", placeholder: "Enter department info" },
          ], addDepartment, "department")}
        </div>
      </div>

      {/* Popups
      {popup.edit && <PopupEditFaculty close={() => setPopup({ ...popup, edit: false })} />}
      {popup.details && <PopupFacultyDetails close={() => setPopup({ ...popup, details: false })} />} */}
    </div>
  );
}
