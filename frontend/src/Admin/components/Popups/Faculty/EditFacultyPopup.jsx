// import React, { useState } from 'react';
// import { FaTimes } from 'react-icons/fa';


// export default function PopupEditFaculty({ close, faculty, onSubmit }) {
//   const [formData, setFormData] = useState (faculty);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     close();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
//         <FaTimes
//           className="absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer hover:text-gray-800"
//           onClick={close}
//         />
//         <h2 className="text-2xl font-bold mb-6 text-center">Edit Faculty</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             title="Faculty Name"
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//           />
//           <input
//             title="Dean Name"
//             type="text"
//             name="deanName"
//             value={formData.deanName}
//             onChange={handleChange}
//           />
//           <input
//             title="No. of Dept."
//             type="number"
//             name="noOfDepartments"
//             value={formData.noOfDepartments}
//             onChange={handleChange}
//           />
//           <input
//             title="About Faculty"
//             type="text"
//             name="body"
//             value={formData.body}
//             onChange={handleChange}
//           />
//           <button title="Save Changes" type="submit" />
//         </form>
//       </div>
//     </div>
//   );
// }