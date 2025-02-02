import React, { useState, useEffect } from "react";
import FormInput from "../../Components/FormInput";
import CustomButton2 from "../../Components/CustomButton2";

export default function Faculty() {
  const [facultyData, setFacultyData] = useState({});
  const [facultyImage, setFacultyImage] = useState({});
  const [bannerImage, setbannerImage] = useState({});
  const [deanImage, setDeanImage] = useState({});
  const [facultyContact, setFacultyContact] = useState({});
  const [lecturer, setLecturer] = useState({});
  const [department, setDepartment] = useState({});

  useEffect(() => {
    console.log("Faculty Data:", facultyData);
    console.log("Faculty Image:", facultyImage);
    console.log("Dean Image:", deanImage);
    console.log("Faculty Contact:", facultyContact);
    console.log("Lecturer Data:", lecturer);
    console.log("Department Data:", department);
  }, [facultyData, facultyImage, deanImage, facultyContact, lecturer, department]);

  const renderForm = (title, fields, stateUpdater) => (
    <div className="w-full p-4 shadow-lg rounded-lg bg-white">
      <h3 className="font-semibold text-lg text-center mb-4">{title}</h3>
      <form className="space-y-4">
        {fields.map(({ label, name, type, placeholder }) => (
          <FormInput
            key={name}
            title={label}
            type={type}
            name={name}
            placeholder={placeholder}
            onchange={(e) => {
              const value = type === "file" ? e.target.files[0] : e.target.value;
              stateUpdater((prev) => ({ ...prev, [name]: value }));
            }}
          />
        ))}
        <CustomButton2 title="Update" />
      </form>
    </div>
  );

  return (
    <div className="w-full h-full p-5 grid gap-6 lg:grid-cols-2 bg-gray-100">
      {/* Faculty Data Display */}
      <div className="flex flex-col p-6 shadow-lg rounded-lg bg-white">
        <h2 className="font-bold text-2xl text-center mb-4">Faculty Details</h2>
        <p className="text-center text-gray-600">Manage and update faculty-related information here.</p>
      </div>

      {/* Forms Section */}
      <div className="space-y-6 overflow-y-auto">
        {renderForm(
          "Update Faculty Data",
          [
            { label: "Faculty Name", name: "title", type: "text", placeholder: "Enter new faculty name" },
            { label: "Dean Name", name: "deanName", type: "text", placeholder: "Enter dean name here" },
            { label: "No. of Departments", name: "noOfDepartments", type: "number", placeholder: "Enter number of departments" },
            { label: "About Faculty", name: "body", type: "text", placeholder: "Enter faculty information" },
          ],
          setFacultyData
        )}

        {renderForm(
          "Update Faculty Image",
          [{ label: "Faculty Image", name: "image", type: "file", placeholder: "Select faculty image" }],
          setFacultyImage
        )}
    
	    {renderForm(
          "Update Banner Image",
          [{ label: "Faculty Image", name: "image", type: "file", placeholder: "Select faculty image" }],
          setbannerImage
        )}

        {renderForm(
          "Update Dean Image",
          [{ label: "Dean Image", name: "deanImage", type: "file", placeholder: "Select dean image" }],
          setDeanImage
        )}

        {renderForm(
          "Update Faculty Contact",
          [
            { label: "WhatsApp", name: "whatsapp", type: "text", placeholder: "Enter WhatsApp number" },
            { label: "Facebook", name: "facebook", type: "text", placeholder: "Enter Facebook profile" },
            { label: "YouTube", name: "youtube", type: "text", placeholder: "Enter YouTube channel" },
          ],
          setFacultyContact
        )}

        {renderForm(
          "Create Lecturer",
          [
            { label: "Name", name: "name", type: "text", placeholder: "Enter lecturer name" },
            { label: "Designation", name: "designation", type: "text", placeholder: "Enter lecturer designation" },
            { label: "Image", name: "image", type: "file", placeholder: "Upload lecturer image" },
          ],
          setLecturer
        )}

        {renderForm(
          "Create Department",
          [
            { label: "Title", name: "title", type: "text", placeholder: "Enter department title" },
            { label: "Body", name: "designation", type: "text", placeholder: "Enter department info" },
            { label: "Image", name: "image", type: "file", placeholder: "Upload department image" },
          ],
          setDepartment
        )}

        {renderForm(
          "Admission Requirements",
          [
            { label: "Course", name: "course", type: "text", placeholder: "Enter Course title" },
            { label: "Utme Requirements", name: "utmeReq", type: "text", placeholder: "eg 2 O'level credits # 4 A' level passes"  },
            { label: "O Level Requirements", name: "olevelReq", type: "text", placeholder: "eg 2 O'level credits # 4 A' level passes"  },
            { label: "Direct Entry Requirements", name: "DEReq", type: "text", placeholder: "eg 2 O'level credits # 4 A' level passes" },
          ],
          setDepartment
        )}
      </div>
    </div>
  );
}
