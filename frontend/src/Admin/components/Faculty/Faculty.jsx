import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FacultyList from "./FacultyList";
import FacultyDetailsModal from "./FacultyDetailsModal";
import CreateFacultyForm from "./CreateFacultyForm";
import { fetchCampus, createFaculty } from "../../../../Redux/Slicers/CampusSlice";

export default function Faculty() {
  const dispatch = useDispatch();
  const { campuses, loading: campusLoading } = useSelector((state) => state.campus);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch campuses on component mount
  useEffect(() => {
    dispatch(fetchCampus());
  }, [dispatch]);

  // Handle campus selection
  const handleCampusChange = (e) => {
    const selectedId = e.target.value;
    const campus = campuses.find((c) => c.id === selectedId);
    setSelectedCampus(campus || null);
    setSelectedFaculty(null); // Reset faculty selection
  };

  // Handle faculty creation
  const handleCreateFaculty = async (formData) => {
    if (selectedCampus) {
      try {
        await dispatch(createFaculty({ id: selectedCampus.id, formData })).unwrap();
        alert("Faculty created successfully!");

        // Manually update the faculties list in the selected campus object
        setSelectedCampus((prev) => ({
          ...prev,
          faculties: [...(prev?.faculties || []), { id: Date.now(), ...formData }],
        }));
      } catch (error) {
        alert("Error creating faculty: " + error.message);
      }
    }
  };

  return (
    <div className="w-full h-full p-5 grid gap-6 lg:grid-cols-2 bg-gray-100">
      {/* Campus Selection */}
      <div className="p-6 shadow-lg rounded-lg bg-white">
        <h2 className="font-bold text-2xl text-center mb-4">Select Campus</h2>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedCampus?.id || ""}
          onChange={handleCampusChange}
          disabled={campusLoading}
        >
          <option value="" disabled>Select a Campus</option>
          {campuses?.map((campus) => (
            <option key={campus.id} value={campus.id}>
              {campus.title}
            </option>
          ))}
        </select>
      </div>

      {/* Faculty List */}
      {selectedCampus && (
        <FacultyList
          faculties={selectedCampus.faculties || []}
          onSelectFaculty={(faculty) => {
            setSelectedFaculty(faculty);
            setIsModalOpen(true);
          }}
        />
      )}

      {/* Create Faculty Form */}
      {selectedCampus && (
        <CreateFacultyForm
          onSubmit={handleCreateFaculty}

        />
      )}

      {/* Faculty Details Modal */}
      {isModalOpen && selectedFaculty && (
        <FacultyDetailsModal
          faculty={selectedFaculty}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
