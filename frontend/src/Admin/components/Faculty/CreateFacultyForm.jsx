import React, { useState } from "react"; 
import CustomButton2 from "./CustomButton";
import FormInput from "./FormInput";

export default function CreateFacultyForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    noOfDepartments: "",
    image: null, // New state for image
  });

  // Handles text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Save file in state
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData(); // Create FormData object
    formDataToSend.append("title", formData.title);
    formDataToSend.append("body", formData.body);
    formDataToSend.append("noOfDepartments", formData.noOfDepartments);
    if (formData.image) {
      formDataToSend.append("image", formData.image); // Attach image file
    }

    onSubmit(formDataToSend); // Pass formDataToSend to parent
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-h-[400px] overflow-auto">
      <h2 className="text-lg font-semibold">Create Faculty</h2>

      <FormInput 
      title="Faculty Name" 
      type="text" name="title" 
      value={formData.title} 
      onChange={handleChange} 
      />
      
      <FormInput 
      title="Description" 
      type="text" name="body" 
      value={formData.body} 
      onChange={handleChange} 
      />

      <FormInput 
      title="Number of Departments" 
      type="number" 
      name="noOfDepartments" 
      value={formData.noOfDepartments} 
      onChange={handleChange} 
      />

      {/* Image Upload Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full border rounded-md p-2" />
      </div>

      <CustomButton2 title={loading ? "Creating..." : "Create Faculty"} disabled={loading} />
    </form>
  );
}
