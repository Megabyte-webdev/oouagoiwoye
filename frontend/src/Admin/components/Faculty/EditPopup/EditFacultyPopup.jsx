import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    updateFaculty,
    updateFacultyImage,
    updateFacultyContact,
    updateDeanImg,
    upsertBannerImage,
} from "../../../../../Redux/Slicers/FacultySlice";
import FacultyDetailsForm from "./FacultyDetailsForm";
import FacultyContactForm from "./FacultyContactForm";
import FacultyDeanImageForm from "./FacultyDeanImageForm";
import FacultyBannerImageForm from "./FacultyBannerImageForm";

const EditFacultyPopup = ({ isOpen, onClose, faculty }) => {
    const dispatch = useDispatch();
    const [facultyData, setFacultyData] = useState(faculty);

    // Loading states for each form
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [contactLoading, setContactLoading] = useState(false);
    const [deanImageLoading, setDeanImageLoading] = useState(false);
    const [bannerImageLoading, setBannerImageLoading] = useState(false);
    const [FacultyImageLoading, setFacultyImageLoading] = useState(false);

    // Handle changes in faculty details
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFacultyData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle changes in faculty contact
    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setFacultyData((prev) => ({
            ...prev,
            contact: {
                ...prev.contact,
                [name]: value,
            },
        }));
    };

    // Handle file uploads (dean image, banner image, etc.)
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            const file = files[0];
            const formData = new FormData();
            formData.append("file", file);

            switch (name) {
                case "imageName":
                    setDeanImageLoading(true);
                    dispatch(updateDeanImg({ id: facultyData.id, formData }))
                        .unwrap()
                        .then(() => setDeanImageLoading(false))
                        .catch(() => setDeanImageLoading(false));
                    break;
                case "bannerImage":
                    setBannerImageLoading(true);
                    dispatch(upsertBannerImage({ id: facultyData.id, formData }))
                        .unwrap()
                        .then(() => setBannerImageLoading(false))
                        .catch(() => setBannerImageLoading(false));
                    break;
                case "image":
                    setFacultyImageLoading(true);
                    dispatch(updateFacultyImage({ id: facultyData.id, formData }))
                        .unwrap()
                        .then(() => setFacultyImageLoading(false))
                        .catch(() => setFacultyImageLoading(false));
                    break;
                default:
                    break;
            }

            // Update local state for preview
            const fileURL = URL.createObjectURL(file);
            setFacultyData((prev) => ({
                ...prev,
                [name]: fileURL,
            }));
        }
    };

    // Handle faculty details form submission
    const handleUpdateDetails = (e) => {
        e.preventDefault(); 
        setDetailsLoading(true);
        dispatch(updateFaculty({ id: facultyData.id, data: facultyData }))
            .unwrap()
            .then(() => setDetailsLoading(false))
            .catch(() => setDetailsLoading(false));
    };

    // Handle faculty contact form submission
    const handleUpdateContact = (e) => {
        e.preventDefault(); // Prevent default form submission
        setContactLoading(true);
        dispatch(updateFacultyContact({ id: facultyData.id, data: facultyData.contact }))
            .unwrap()
            .then(() => setContactLoading(false))
            .catch(() => setContactLoading(false));
    };

    // Handle overall form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        setDetailsLoading(true);
        setContactLoading(true);

        try {
            // Update faculty details
            await dispatch(updateFaculty({ id: facultyData.id, data: facultyData })).unwrap();

            // Update faculty contact
            await dispatch(updateFacultyContact({ id: facultyData.id, data: facultyData.contact })).unwrap();

            // Show success message or toast (if using a notification system)
            console.log("Faculty details updated successfully!");

            // Close modal after successful update
            onClose();
        } catch (error) {
            console.error("Error updating faculty details:", error);
        } finally {
            setDetailsLoading(false);
            setContactLoading(false);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-white p-6 rounded shadow-lg w-1/2 max-h-[500px] overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">Edit Faculty</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Faculty Details Form */}
                    <FacultyDetailsForm
                        faculty={facultyData}
                        handleChange={handleChange}
                        loading={detailsLoading}
                        onSubmit={handleUpdateDetails}
                    />

                    {/* Faculty Contact Form */}
                    <FacultyContactForm
                        contact={facultyData.contact}
                        handleChange={handleContactChange}
                        loading={contactLoading}
                        onSubmit={handleUpdateContact}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {/* Dean Image Form */}
                    <FacultyDeanImageForm
                        imageName={facultyData.imageName}
                        handleFileChange={handleFileChange}
                        loading={deanImageLoading}
                    />

                    {/* Banner Image Form */}
                    <FacultyBannerImageForm
                        bannerImage={facultyData.bannerImage}
                        handleFileChange={handleFileChange}
                        loading={bannerImageLoading}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditFacultyPopup;