import React from "react";
import FormInput from "../../../Components/FormInput";
import CustomButton2 from "../../../Components/CustomButton2";

const FacultyForm = ({ title, fields, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = React.useState(initialData || {});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full p-4 shadow-lg rounded-lg bg-white">
      <h3 className="font-semibold text-lg text-center mb-4">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ label, name, type, placeholder }) => (
          <FormInput
            key={name}
            title={label}
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name] || ""}
            onchange={handleChange}
          />
        ))}
        <CustomButton2 title="Submit" />
      </form>
    </div>
  );
};

export default FacultyForm;
