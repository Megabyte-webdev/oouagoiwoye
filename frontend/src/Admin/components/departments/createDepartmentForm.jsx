import { useDispatch } from "react-redux";
import CustomButton2 from "../Faculty/CustomButton";
import FormInput from "../Faculty/FormInput";
import { useState } from "react";
import { addDepartment } from "../../../../Redux/Slicers/FacultySlice";

export default function CreateDepartmentForm({ facultyId, onCreate }) {

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        image: null,
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const formDataToSend = new FormData(); // Create FormData object
    formDataToSend.append("title", formData.title);
    formDataToSend.append("body", formData.body);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    };
    console.log('Form Data to send:', formDataToSend);

    try {
      await dispatch(addDepartment({ id: facultyId, formData: formDataToSend })).unwrap();
      alert("Department created successfully!");

    } catch (error) {
      console.log("Error creating department: " + error.message);
    } finally {
      setLoading(false); 
      onCreate()
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-h-[400px] overflow-auto">

      <FormInput 
      title="Department Name" 
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

      {/* Image Upload Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Department Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full border rounded-md p-2" />
      </div>

      <CustomButton2 title={loading ? "Creating..." : "Create Department"} disabled={loading} />
    </form>
  );
}

