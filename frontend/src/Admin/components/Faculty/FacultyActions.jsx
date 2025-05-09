import React from "react";
import FormInput from "./FormInput";
import CustomButton2 from "./CustomButton";


export default function FacultyActions({ faculty }) {
  const handleSubmit = (e, callback, field) => {
    e.preventDefault();
    const data = new FormData();
    if (field === "image" || field === "deanImage" || field === "bannerImage") {
      data.append(field, e.target[field].files[0]);
    } else {
      data[field] = e.target[field].value;
    }
    callback(data);
  };

  return (
    <div className="space-y-6">
      {/* Update Faculty Details */}
      <form onSubmit={(e) => handleSubmit(e, faculty.handleUpdateFacultyData, "title")} className="space-y-4">
        <FormInput title="Faculty Name" type="text" name="title" defaultValue={faculty.title} />
        <CustomButton2 title="Update Faculty" />
      </form>

      {/* Update Faculty Image */}
      <form onSubmit={(e) => handleSubmit(e, faculty.handleUpdateFacultyImage, "image")} className="space-y-4">
        <FormInput title="Faculty Image" type="file" name="image" />
        <CustomButton2 title="Update Image" />
      </form>
      
      {/* Update Dean Image */}
      <form onSubmit={(e) => handleSubmit(e, faculty.handleUpdateDeanImage, "deanImage")} className="space-y-4">
        <FormInput title="Dean Image" type="file" name="deanImage" />
        <CustomButton2 title="Update Dean Image" />
      </form>
      
      

    </div>
  );
}
