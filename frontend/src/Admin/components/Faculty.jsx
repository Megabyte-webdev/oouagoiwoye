// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import FormInput from "../../Components/FormInput";
// import CustomButton2 from "../../Components/CustomButton2";
// import CreateFacultyForm from "./CreateFacultyForm";
// import Modal from "../../Components/Modal"; // Assuming you have a Modal component
// import {
//   fetchCampus,
//   createFaculty,
// } from "../../../Redux/Slicers/CampusSlice"; // Import Redux actions
// import {
//   updateFacultyData,
//   updateFacultyImage,
//   updateFacultyContact,
//   updateDeanImg,
//   upsertBannerImage,
//   createFacultyLecturers,
//   addDepartment,
//   createAdmissionRequirements,
//   fetchFaculty,
// } from "../../../Redux/Slicers/FacultySlice";

// export default function Faculty() {
//   const dispatch = useDispatch();
//   const { campuses, loading: campusLoading } = useSelector((state) => state.campus);
//   const { faculties, loading: facultyLoading } = useSelector((state) => state.faculty);
//   const [selectedCampusId, setSelectedCampusId] = useState("");
//   const [selectedFaculty, setSelectedFaculty] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch campuses on component mount
//   useEffect(() => {
//     dispatch(fetchCampus());
//   }, [dispatch]);

//   // Fetch faculties when a campus is selected
//   useEffect(() => {
//     if (selectedCampusId) {
//       dispatch(fetchFaculty(selectedCampusId));
//     }
//   }, [selectedCampusId, dispatch]);

//   // Handle campus selection
//   const handleCampusChange = (e) => {
//     const selectedId = e.target.value;
//     setSelectedCampusId(selectedId);
//     setSelectedFaculty(null); // Reset selected faculty when campus changes
//   };

//   // Handle faculty selection
//   const handleFacultySelection = (faculty) => {
//     setSelectedFaculty(faculty);
//     setIsModalOpen(true); // Open modal to view faculty details
//   };

//   // Handle form submission for creating a faculty
//   const handleCreateFaculty = async (formData) => {
//     if (selectedCampusId) {
//       try {
//         await dispatch(createFaculty({ id: selectedCampusId, formData })).unwrap();
//         alert("Faculty created successfully!");
//       } catch (error) {
//         alert("Error creating faculty: " + error.message);
//       }
//     }
//   };

//   // Handle form submission for updating faculty data
//   const handleUpdateFacultyData = async (data) => {
//     if (selectedFaculty?.id) {
//       try {
//         await dispatch(updateFacultyData({ id: selectedFaculty.id, data })).unwrap();
//         alert("Faculty data updated successfully!");
//       } catch (error) {
//         alert("Error updating faculty data: " + error.message);
//       }
//     }
//   };

//   // Handle form submission for updating faculty image
//   const handleUpdateFacultyImage = async (formData) => {
//     if (selectedFaculty?.id) {
//       try {
//         await dispatch(updateFacultyImage({ id: selectedFaculty.id, formData })).unwrap();
//         alert("Faculty image updated successfully!");
//       } catch (error) {
//         alert("Error updating faculty image: " + error.message);
//       }
//     }
//   };

//   // Handle form submission for updating faculty contact
//   const handleUpdateFacultyContact = async (data) => {
//     if (selectedFaculty?.id) {
//       try {
//         await dispatch(updateFacultyContact({ id: selectedFaculty.id, data })).unwrap();
//         alert("Faculty contact updated successfully!");
//       } catch (error) {
//         alert("Error updating faculty contact: " + error.message);
//       }
//     }
//   };

//   // Handle form submission for updating dean image
//   const handleUpdateDeanImage = async (formData) => {
//     if (selectedFaculty?.id) {
//       try {
//         await dispatch(updateDeanImg({ id: selectedFaculty.id, formData })).unwrap();
//         alert("Dean image updated successfully!");
//       } catch (error) {
//         alert("Error updating dean image: " + error.message);
//       }
//     }
//   };

//   // Handle form submission for updating banner image
//   const handleUpdateBannerImage = async (formData) => {
//     if (selectedFaculty?.id) {
//       try {
//         await dispatch(upsertBannerImage({ id: selectedFaculty.id, formData })).unwrap();
//         alert("Banner image updated successfully!");
//       } catch (error) {
//         alert("Error updating banner image: " + error.message);
//       }
//     }
//   };

//   // Handle form submission for creating lecturers
//   const handleCreateLecturers = async (formData) => {
//     if (selectedFaculty?.id) {
//       try {
//         await dispatch(createFacultyLecturers({ id: selectedFaculty.id, formData })).unwrap();
//         alert("Lecturer created successfully!");
//       } catch (error) {
//         alert("Error creating lecturer: " + error.message);
//       }
//     }
//   };

//   // Handle form submission for adding a department
//   const handleAddDepartment = async (formData) => {
//     if (selectedFaculty?.id) {
//       try {
//         await dispatch(addDepartment({ id: selectedFaculty.id, formData })).unwrap();
//         alert("Department added successfully!");
//       } catch (error) {
//         alert("Error adding department: " + error.message);
//       }
//     }
//   };

//   // Handle form submission for creating admission requirements
//   const handleCreateAdmissionRequirements = async (data) => {
//     if (selectedFaculty?.id) {
//       try {
//         await dispatch(createAdmissionRequirements({ id: selectedFaculty.id, data })).unwrap();
//         alert("Admission requirements updated successfully!");
//       } catch (error) {
//         alert("Error updating admission requirements: " + error.message);
//       }
//     }
//   };

//   return (
//     <div className="w-full h-full p-5 grid gap-6 lg:grid-cols-2 bg-gray-100">
//       {/* Campus Selection */}
//       <div className="p-6 shadow-lg rounded-lg bg-white">
//         <h2 className="font-bold text-2xl text-center mb-4">Select Campus</h2>
//         <select
//           className="w-full p-2 border rounded-md"
//           value={selectedCampusId || ""}
//           onChange={handleCampusChange}
//           disabled={campusLoading}
//         >
//           <option value="" disabled>Select a Campus</option>
//           {campuses?.map((campus) => (
//             <option key={campus.id} value={campus.id}>
//               {campus.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Faculty List */}
//       {selectedCampusId && (
//         <div className="p-6 shadow-lg rounded-lg bg-white">
//           <h2 className="font-bold text-2xl text-center mb-4">Faculties</h2>
//           {faculties?.length > 0 ? (
//             faculties.map((faculty) => (
//               <div key={faculty.id} className="flex justify-between items-center p-2 border-b">
//                 <span>{faculty.title}</span>
//                 <button
//                   onClick={() => handleFacultySelection(faculty)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                 >
//                   View Details
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600">No faculties available for this campus.</p>
//           )}
//         </div>
//       )}

//       {/* Create Faculty Form */}
//       {selectedCampusId && !faculties?.length && (
//         <div className="p-6 shadow-lg rounded-lg bg-white">
//           <CreateFacultyForm
//             onSubmit={handleCreateFaculty}
//             loading={facultyLoading}
//           />
//         </div>
//       )}

//       {/* Modal for Faculty Details */}
//       {isModalOpen && selectedFaculty && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <div className="space-y-6">
//             <h2 className="font-bold text-2xl text-center mb-4">Faculty Details</h2>

//             {/* Update Faculty Data Form */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleUpdateFacultyData({
//                   title: e.target.title.value,
//                   body: e.target.body.value,
//                   noOfDepartments: e.target.noOfDepartments.value,
//                 });
//               }}
//               className="space-y-4"
//             >
//               <h3 className="text-lg font-semibold">Update Faculty Data</h3>
//               <FormInput
//                 title="Faculty Name"
//                 type="text"
//                 name="title"
//                 placeholder="Enter faculty name"
//                 defaultValue={selectedFaculty.title}
//               />
//               <FormInput
//                 title="Description"
//                 type="text"
//                 name="body"
//                 placeholder="Enter faculty description"
//                 defaultValue={selectedFaculty.body}
//               />
//               <FormInput
//                 title="Number of Departments"
//                 type="number"
//                 name="noOfDepartments"
//                 placeholder="Enter number of departments"
//                 defaultValue={selectedFaculty.noOfDepartments}
//               />
//               <CustomButton2 title="Update Faculty Data" />
//             </form>

//             {/* Update Faculty Image Form */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData();
//                 formData.append("image", e.target.image.files[0]);
//                 handleUpdateFacultyImage(formData);
//               }}
//               className="space-y-4"
//             >
//               <h3 className="text-lg font-semibold">Update Faculty Image</h3>
//               <FormInput
//                 title="Faculty Image"
//                 type="file"
//                 name="image"
//                 placeholder="Select faculty image"
//               />
//               <CustomButton2 title="Update Faculty Image" />
//             </form>

//             {/* Update Faculty Contact Form */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleUpdateFacultyContact({
//                   whatsapp: e.target.whatsapp.value,
//                   facebook: e.target.facebook.value,
//                   youtube: e.target.youtube.value,
//                 });
//               }}
//               className="space-y-4"
//             >
//               <h3 className="text-lg font-semibold">Update Faculty Contact</h3>
//               <FormInput
//                 title="WhatsApp"
//                 type="text"
//                 name="whatsapp"
//                 placeholder="Enter WhatsApp number"
//                 defaultValue={selectedFaculty.contact?.whatsapp}
//               />
//               <FormInput
//                 title="Facebook"
//                 type="text"
//                 name="facebook"
//                 placeholder="Enter Facebook profile"
//                 defaultValue={selectedFaculty.contact?.facebook}
//               />
//               <FormInput
//                 title="YouTube"
//                 type="text"
//                 name="youtube"
//                 placeholder="Enter YouTube channel"
//                 defaultValue={selectedFaculty.contact?.youtube}
//               />
//               <CustomButton2 title="Update Faculty Contact" />
//             </form>

//             {/* Update Dean Image Form */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData();
//                 formData.append("deanImage", e.target.deanImage.files[0]);
//                 handleUpdateDeanImage(formData);
//               }}
//               className="space-y-4"
//             >
//               <h3 className="text-lg font-semibold">Update Dean Image</h3>
//               <FormInput
//                 title="Dean Image"
//                 type="file"
//                 name="deanImage"
//                 placeholder="Select dean image"
//               />
//               <CustomButton2 title="Update Dean Image" />
//             </form>

//             {/* Update Banner Image Form */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData();
//                 formData.append("bannerImage", e.target.bannerImage.files[0]);
//                 handleUpdateBannerImage(formData);
//               }}
//               className="space-y-4"
//             >
//               <h3 className="text-lg font-semibold">Update Banner Image</h3>
//               <FormInput
//                 title="Banner Image"
//                 type="file"
//                 name="bannerImage"
//                 placeholder="Select banner image"
//               />
//               <CustomButton2 title="Update Banner Image" />
//             </form>

//             {/* Create Lecturer Form */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData();
//                 formData.append("name", e.target.name.value);
//                 formData.append("designation", e.target.designation.value);
//                 formData.append("image", e.target.image.files[0]);
//                 handleCreateLecturers(formData);
//               }}
//               className="space-y-4"
//             >
//               <h3 className="text-lg font-semibold">Create Lecturer</h3>
//               <FormInput
//                 title="Name"
//                 type="text"
//                 name="name"
//                 placeholder="Enter lecturer name"
//               />
//               <FormInput
//                 title="Designation"
//                 type="text"
//                 name="designation"
//                 placeholder="Enter lecturer designation"
//               />
//               <FormInput
//                 title="Image"
//                 type="file"
//                 name="image"
//                 placeholder="Upload lecturer image"
//               />
//               <CustomButton2 title="Create Lecturer" />
//             </form>

//             {/* Add Department Form */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData();
//                 formData.append("title", e.target.title.value);
//                 formData.append("body", e.target.body.value);
//                 formData.append("image", e.target.image.files[0]);
//                 handleAddDepartment(formData);
//               }}
//               className="space-y-4"
//             >
//               <h3 className="text-lg font-semibold">Add Department</h3>
//               <FormInput
//                 title="Title"
//                 type="text"
//                 name="title"
//                 placeholder="Enter department title"
//               />
//               <FormInput
//                 title="Description"
//                 type="text"
//                 name="body"
//                 placeholder="Enter department info"
//               />
//               <FormInput
//                 title="Image"
//                 type="file"
//                 name="image"
//                 placeholder="Upload department image"
//               />
//               <CustomButton2 title="Add Department" />
//             </form>

//             {/* Create Admission Requirements Form */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleCreateAdmissionRequirements({
//                   course: e.target.course.value,
//                   utmeReq: e.target.utmeReq.value,
//                   olevelReq: e.target.olevelReq.value,
//                   DEReq: e.target.DEReq.value,
//                 });
//               }}
//               className="space-y-4"
//             >
//               <h3 className="text-lg font-semibold">Admission Requirements</h3>
//               <FormInput
//                 title="Course"
//                 type="text"
//                 name="course"
//                 placeholder="Enter course title"
//               />
//               <FormInput
//                 title="UTME Requirements"
//                 type="text"
//                 name="utmeReq"
//                 placeholder="Enter UTME requirements"
//               />
//               <FormInput
//                 title="O Level Requirements"
//                 type="text"
//                 name="olevelReq"
//                 placeholder="Enter O Level requirements"
//               />
//               <FormInput
//                 title="Direct Entry Requirements"
//                 type="text"
//                 name="DEReq"
//                 placeholder="Enter Direct Entry requirements"
//               />
//               <CustomButton2 title="Update Admission Requirements" />
//             </form>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }