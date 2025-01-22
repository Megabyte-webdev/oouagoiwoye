import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, resetAdminState } from "../../../Redux/Slicers/AdminSlice";
import { useNavigate } from "react-router-dom";
import InputField from "./inputfield";
import SuccessModal from "./SuccessModal";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
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
      // Handle error if username or password is missing
      console.error("Username and password are required");
    }
  };

  // Handle redirection on successful login
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setShowModal(false);
        dispatch(resetAdminState());
        navigate("/admin-ict/oouagoiwoye-9g4c4h8sh");
      }, 5000);
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="flex flex-row items-center justify-between min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-0">
      <div className="p-6 w-1/2  border border-red-600 h-screen">
      <p className="text-4xl ">
        Some details will be here
      </p>
        </div>
      <div className=" p-6 w-1/2  items-center justify-center h-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {error && (
          <p className="text-red-500 text-center mb-4 w-full border border-red-500 p-2 mx-auto rounded-md">
            {typeof error === 'object' ? JSON.stringify(error) : error}
          </p>
        )}

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

      {/* Success Modal */}
      {user && (
        <SuccessModal
          isVisible={true}
          message="Login successful! Redirecting to your dashboard..."
        />
      )}
    </div>
    
  );
};

export default Login;
