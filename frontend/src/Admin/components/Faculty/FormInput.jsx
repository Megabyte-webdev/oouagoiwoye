import React from "react";

export default function FormInput({ title, type, name, value, onChange, defaultValue, required = true }) {
  return (
    <div className="w-full">
      {title && <label className="block text-gray-700 font-semibold mb-1">{title}</label>}
      <input
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
