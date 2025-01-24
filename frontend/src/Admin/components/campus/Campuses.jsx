// import React, { useState, useEffect } from 'react';
// import { FaPlus } from 'react-icons/fa';
// import { CiEdit } from 'react-icons/ci';
// import { BsTrashFill } from 'react-icons/bs';
// import Popup01 from '../Popups/Campus/Popup01';
// import PopupCampusDetails from '../Popups/Campus/CampusDetailsPopup'; 
// import { EyeFilled } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchCampus,
//   deleteCampus,
// } from '../../../../Redux/Slicers/CampusSlice';

// export default function Campuses() {
//   const [pop, setPop] = useState(false);
//   const [detailsPop, setDetailsPop] = useState(false);
//   const [id, setId] = useState(null);
//   const [campusDetails, setCampusDetails] = useState(null);

//   const dispatch = useDispatch();
//   const campuses = useSelector((state) => state?.campus?.campuses || []); 

//   // Dummy data for testing
//   const dummyCampuses = [
//     {
//       id: 1,
//       title: 'Main Campus',
//       faculties: 'Engineering, Business',
//       location: 'City A',
//       history: 'Established in 1990',
//       image: 'https://via.placeholder.com/150',
//     },
//     {
//       id: 2,
//       title: 'North Campus',
//       faculties: 'Arts, Science',
//       location: 'City B',
//       history: 'Established in 2005',
//       image: 'https://via.placeholder.com/150',
//     },
//   ];

//   useEffect(() => {
//     try {
//       // Fetch all campuses when the component is mounted
//       dispatch(fetchCampus());
//     } catch (error) {
//       console.error('Error fetching campuses:', error); 
//     }
//   }, [dispatch]);

//   const handlePopupOpen = (campusId) => {
//     setId(campusId);
//     setPop(true);
//   };

//   const handlePopupClose = () => {
//     setPop(false);
//     setId(null);
//   };

//   const handleDetailsPopupOpen = (campusId) => {
//     // const campus = campuses.find((camp) => camp.id === campusId);
//     const campus = dummyCampuses.find((camp) => camp.id === campusId); 
//     if (campus) {
//       setCampusDetails(campus);
//       setDetailsPop(true);
//     } else {
//       console.warn(`Campus with ID ${campusId} not found.`);
//     }
//   };

//   const handleDetailsPopupClose = () => {
//     setDetailsPop(false);
//     setCampusDetails(null);
//   };

//   const handleDeleteCampus = (campusId) => {
//     try {
//       dispatch(deleteCampus(campusId));
//     } catch (error) {
//       console.error(`Error deleting campus with ID ${campusId}:`, error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//         {/* Create Campus Form */}
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold mb-4 text-center">Create Campus</h2>
//           <form
//             action=""
//             encType="multipart/form-data"
//             className="space-y-4"
//             onSubmit={(e) => e.preventDefault()}
//           >
//             {/* Title */}
//             <div>
//               <label htmlFor="title" className="block font-medium mb-1">
//                 Title:
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Enter campus title"
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-500"
//               />
//             </div>

//             {/* Image */}
//             <div>
//               <label htmlFor="image" className="block font-medium mb-1">
//                 Image:
//               </label>
//               <input
//                 type="file"
//                 name="image"
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
//               />
//             </div>

//             {/* Campus History */}
//             <div>
//               <label htmlFor="campusInfo" className="block font-medium mb-1">
//                 Campus History:
//               </label>
//               <input
//                 type="text"
//                 name="campusInfo"
//                 placeholder="Enter campus information"
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-500"
//               />
//             </div>

//             {/* Location */}
//             <div>
//               <label htmlFor="campusLocation" className="block font-medium mb-1">
//                 Location:
//               </label>
//               <input
//                 type="text"
//                 name="campusLocation"
//                 placeholder="Enter campus location"
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-500"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg flex items-center justify-center hover:bg-orange-600"
//             >
//               Create <FaPlus className="ml-2" />
//             </button>
//           </form>
//         </div>

//         {/* Campus List */}
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold mb-4 text-center">Campus List</h2>
//           <div className="space-y-2">
//             <div className="grid grid-cols-12 gap-4 font-semibold bg-gray-200 p-3 rounded-md">
//               <span className="col-span-1 text-center">No.</span>
//               <span className="col-span-2 text-center">Campus</span>
//               <span className="col-span-3 text-center">Faculties</span>
//               <span className="col-span-1 text-center">Details</span>
//               <span className="col-span-4 text-center">Actions</span>
//             </div>
//             {/* {campuses.length > 0 ? ( */}
//             {dummyCampuses.length > 0 ? (
//               // campuses.map((campus, index) => (
//                 dummyCampuses.map((campus, index) => (
//                 <div
//                   key={campus?.id || index}
//                   className="grid grid-cols-12 gap-4 bg-gray-100 p-3 rounded-md hover:bg-gray-300"
//                 >
//                   <span className="col-span-1 text-center">{index + 1}.</span>
//                   <span className="col-span-4 text-center">{campus?.title || 'N/A'}</span>
//                   <span className="col-span-3 text-center">{campus?.faculties || 'N/A'}</span>
//                   <div className="col-span-4 flex justify-around items-center">
//                     <CiEdit
//                       className="text-xl text-blue-500 cursor-pointer hover:scale-110"
//                       onClick={() => handlePopupOpen(campus?.id)}
//                     />
//                     <EyeFilled
//                       className="text-xl text-blue-500 cursor-pointer hover:scale-110"
//                       onClick={() => handleDetailsPopupOpen(campus?.id)}
//                     />
//                     <BsTrashFill
//                       className="text-xl text-red-500 cursor-pointer hover:scale-110"
//                       onClick={() => handleDeleteCampus(campus?.id)}
//                     />
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">No campuses available</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Popups */}
//       {pop && id && (
//         <Popup01 close={handlePopupClose} id={id} />
//       )}
//       {detailsPop && campusDetails && (
//         <PopupCampusDetails close={handleDetailsPopupClose} details={campusDetails} />
//       )}
//     </div>
//   );
// }
