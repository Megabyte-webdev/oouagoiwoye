import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Modal } from "antd"; 
import {
  updateAdminData,
  updateAdminImage,
  updateAdminResponsibilities,
  updateAdminContact,
} from "../../../../Redux/Slicers/Adminstration";
import FormInput from "../Faculty/FormInput";
import CustomButton2 from "../Faculty/CustomButton";

function EditAdminModal({ admin, isOpen, onClose, onSave }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({
    data: false,
    responsibilities: false,
    contact: false,
    image: false,
  });
  
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    biography: "",
    responsibilities: "",
    image: null,
  });
  
  const [contactData, setContactData] = useState({
    whatsapp: "",
    facebook: "",
    youtube: "",
  });

  // Initialize form data when admin prop changes
  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name || "",
        designation: admin.designation || "",
        biography: admin.biography || "",
        responsibilities: admin.responsibilities || "",
        image: null,
      });
      
      // Initialize contact data if available
      if (admin.contact) {
        setContactData({
          whatsapp: admin.contact.whatsapp || "",
          facebook: admin.contact.facebook || "",
          youtube: admin.contact.youtube || "",
        });
      } else {
        setContactData({
          whatsapp: "",
          facebook: "",
          youtube: "",
        });
      }
    }
  }, [admin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Update admin data (name, designation, biography)
  const handleUpdateData = async () => {
    setLoading((prev) => ({ ...prev, data: true }));
    try {
      await dispatch(
        updateAdminData({
          id: admin.id,
          data: {
            name: formData.name,
            designation: formData.designation,
            biography: formData.biography,
          },
        })
      ).unwrap();
      Modal.success({
        title: "Success",
        content: "Admin data updated successfully!",
        onOk: onSave,
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.message || "Failed to update admin data",
      });
    } finally {
      setLoading((prev) => ({ ...prev, data: false }));
    }
  };

  // Update responsibilities
  const handleUpdateResponsibilities = async () => {
    setLoading((prev) => ({ ...prev, responsibilities: true }));
    try {
      await dispatch(
        updateAdminResponsibilities({
          id: admin.id,
          data: { responsibilities: formData.responsibilities },
        })
      ).unwrap();
      Modal.success({
        title: "Success",
        content: "Responsibilities updated successfully!",
        onOk: onSave,
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.message || "Failed to update responsibilities",
      });
    } finally {
      setLoading((prev) => ({ ...prev, responsibilities: false }));
    }
  };

  // Update contact
  const handleUpdateContact = async () => {
    setLoading((prev) => ({ ...prev, contact: true }));
    try {
      await dispatch(
        updateAdminContact({
          id: admin.id,
          data: contactData,
        })
      ).unwrap();
      Modal.success({
        title: "Success",
        content: "Contact information updated successfully!",
        onOk: onSave,
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.message || "Failed to update contact information",
      });
    } finally {
      setLoading((prev) => ({ ...prev, contact: false }));
    }
  };

  // Update image
  const handleUpdateImage = async () => {
    if (!formData.image) {
      Modal.warning({
        title: "Warning",
        content: "Please select an image to upload",
      });
      return;
    }
    setLoading((prev) => ({ ...prev, image: true }));
    try {
      const imageFormData = new FormData();
      imageFormData.append("image", formData.image);
      await dispatch(updateAdminImage({ id: admin.id, formData: imageFormData })).unwrap();
      Modal.success({
        title: "Success",
        content: "Image updated successfully!",
        onOk: onSave,
      });
    } catch (error) {
      Modal.error({
        title: "Error",
        content: error.message || "Failed to update image",
      });
    } finally {
      setLoading((prev) => ({ ...prev, image: false }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-auto mx-auto shadow-2xl transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header section */}
        <div className="bg-blue-600 px-6 py-4 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
          <h2 className="font-bold text-2xl text-white">Edit Admin Member</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content section */}
        <div className="p-6 space-y-8">
          {/* Admin preview */}
          <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 border border-gray-200">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {admin.image ? (
                <img 
                  src={`https://api.oouweb.site/public/uploads/${admin.image}`}
                  alt={admin.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150?text=" + (admin.name?.charAt(0) || "A");
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-2xl font-bold">
                  {admin.name?.charAt(0) || "A"}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{admin.name || "Unknown Name"}</h3>
              <p className="text-gray-600">{admin.designation || "No designation"}</p>
            </div>
          </div>
          
          {/* Admin Data (Name, Designation, Biography) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Admin Details</h3>
            <div className="space-y-4">
              <FormInput
                title="Admin Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FormInput
                title="Designation"
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FormInput
                title="Biography"
                type="textarea"
                name="biography"
                value={formData.biography}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
              <CustomButton2
                title={loading.data ? "Updating..." : "Update Admin Details"}
                disabled={loading.data}
                onClick={handleUpdateData}
                className={`w-full py-3 rounded-lg text-white font-semibold ${
                  loading.data ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                } transition-colors duration-300`}
              />
            </div>
          </div>

          {/* Responsibilities Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Responsibilities</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsibilities (separate with # symbol)
                </label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="E.g. Oversee curriculum # Manage faculty # Develop policies"
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Enter responsibilities separated by # symbol
                </p>
              </div>
              <CustomButton2
                title={loading.responsibilities ? "Updating..." : "Update Responsibilities"}
                disabled={loading.responsibilities}
                onClick={handleUpdateResponsibilities}
                className={`w-full py-3 rounded-lg text-white font-semibold ${
                  loading.responsibilities ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                } transition-colors duration-300`}
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Contact Information</h3>
            <div className="space-y-4">
              <FormInput
                title="WhatsApp"
                type="text"
                name="whatsapp"
                value={contactData.whatsapp}
                onChange={handleContactChange}
                placeholder="https://wa.me/1234567890"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FormInput
                title="Facebook"
                type="text"
                name="facebook"
                value={contactData.facebook}
                onChange={handleContactChange}
                placeholder="https://facebook.com/username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FormInput
                title="YouTube"
                type="text"
                name="youtube"
                value={contactData.youtube}
                onChange={handleContactChange}
                placeholder="https://youtube.com/channel/..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <CustomButton2
                title={loading.contact ? "Updating..." : "Update Contact Information"}
                disabled={loading.contact}
                onClick={handleUpdateContact}
                className={`w-full py-3 rounded-lg text-white font-semibold ${
                  loading.contact ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                } transition-colors duration-300`}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Profile Image</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload New Admin Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full border border-gray-300 rounded-lg p-3 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.image && (
                  <div className="mt-2 text-sm text-green-600">
                    Selected file: {formData.image.name}
                  </div>
                )}
              </div>
              <CustomButton2
                title={loading.image ? "Uploading..." : "Update Image"}
                disabled={loading.image || !formData.image}
                onClick={handleUpdateImage}
                className={`w-full py-3 rounded-lg text-white font-semibold ${
                  loading.image || !formData.image ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                } transition-colors duration-300`}
              />
            </div>
          </div>
        </div>
        
        {/* Footer section */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditAdminModal;