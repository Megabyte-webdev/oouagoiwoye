import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, resetAdminState } from "../../../Redux/Slicers/AdminSlice";
import { useNavigate } from "react-router-dom";
import InputField from "./inputfield";
import SuccessModal from "./SuccessModal";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [modalMessage, setModalMessage] = useState(""); 
  const [showModal, setShowModal] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentAdmin: user, loading, error } = useSelector((state) => state.admin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      dispatch(loginAdmin(formData));
    } else {
      setModalMessage("Username and password are required.");
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalMessage("");
  };
    

  useEffect(() => {
    if (user) {
      setModalMessage("Login successful! Redirecting to your dashboard...");
      setShowModal(true);

      // Navigate after a short delay
      setTimeout(() => {
        dispatch(resetAdminState());
        navigate("/admin-ict/oouagoiwoye-9g4c4h8sh");
      }, 1500);
    
    } else if (error) {
      setModalMessage(typeof error === "object" ? JSON.stringify(error) : error);
      setShowModal(true);
    }
  }, [user, error, navigate, dispatch]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-0">
      {/* Left Section */}
      <div className="lg:w-1/2 w-full lg:flex hidden items-center justify-center bg-white p-6 lg:h-screen lg:shadow-md ">
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">Welcome Back!</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Login from here to get access to your admin dashboard. More data for the school can be here.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6 bg-gray-50 lg:h-screen">
        <div className="w-full max-w-md rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Admin Login</h2>

          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter your username"
            />
            <InputField
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              placeholder="Enter your password"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-blue-400 animate-pulse cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold py-2 rounded-md transition duration-200`}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      <SuccessModal isVisible={showModal} message={modalMessage} onClose={handleModalClose} />
    </div>
  );
};

export default Login;
