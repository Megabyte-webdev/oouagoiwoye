import React from "react";

export default function CustomButton2({ title, onClick, type = "submit", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-2 rounded-md font-semibold text-white transition duration-200 ${
        disabled ? "bg-gray-400 cursor-not-allowed mt-8" : "bg-blue-500 hover:bg-blue-600 mt-8"
      }`}
    >
      {title}
    </button>
  );
}
