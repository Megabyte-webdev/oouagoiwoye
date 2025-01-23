import React from "react";
import { Input } from "antd";

const InputField = ({ type, label, value, onChange, placeholder, name }) => {
  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === "password" ? (
        <Input.Password
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      )}
    </div>
  );
};

export default InputField;
