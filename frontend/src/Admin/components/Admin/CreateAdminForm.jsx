import { useDispatch } from "react-redux";
import { useState } from "react";
import { createMember, clearError } from "../../../../Redux/Slicers/Adminstration";
import FormInput from "../Faculty/FormInput";
import CustomButton2 from "../Faculty/CustomButton";
import { Modal } from "antd";

export default function CreateAdminForm({ onCreate }) {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: "", content: "" });
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    biography: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const showModal = (title, content) => {
    setModalConfig({ title, content });
    setModalVisible(true);
  };

  const handleModalOk = () => {
    setModalVisible(false);
    if (modalConfig.title === "Success") {
      setFormData({
        name: "",
        designation: "",
        biography: "",
        image: null,
      });
      onCreate();
    }
    dispatch(clearError()); // Clear Redux error state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("biography", formData.biography);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    // Log FormData contents for debugging
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await dispatch(createMember(formDataToSend)).unwrap();
      showModal("Success", "Admin member created successfully!");
    } catch (error) {
      showModal("Error", `Error creating admin member: ${error.response?.data?.message || error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg max-h-[400px] overflow-auto">
        <FormInput
          title="Admin Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <FormInput
          title="Designation"
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <FormInput
          title="Biography"
          type="text"
          name="biography"
          value={formData.biography}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Admin Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full border border-gray-300 rounded-md p-3 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <CustomButton2
          title={loading ? "Creating..." : "Create Admin Member"}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } transition-colors duration-300`}
        />
      </form>
      <Modal
        title={modalConfig.title}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        okText="OK"
        cancelText="Close"
        centered
        className="rounded-lg"
        okButtonProps={{
          className: "bg-blue-500 hover:bg-blue-600 text-white",
        }}
        cancelButtonProps={{
          className: "border-gray-300 text-gray-700 hover:bg-gray-100",
        }}
      >
        <p className="text-gray-700">{modalConfig.content}</p>
      </Modal>
    </>
  );
}