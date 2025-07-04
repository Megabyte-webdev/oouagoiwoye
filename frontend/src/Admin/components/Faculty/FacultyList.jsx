import { EyeFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import FacultyDetailsModal from "./FacultyDetailsModal";
import EditFacultyPopup from "./EditPopup/EditFacultyPopup";

export default function FacultyList({ faculties }) {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [editFaculty, setEditFaculty] = useState(null);

  return (
    <div className="p-6 shadow-lg rounded-lg bg-white">
      <h2 className="font-bold text-2xl text-center mb-4">Faculties</h2>
      {faculties?.length > 0 ? (
        faculties.map((faculty) => (
          <div key={faculty.id} className="flex justify-between items-center p-2 border-b">
            <span>{faculty.title}</span>

            <div className="flex gap-3">
              {/* View Faculty Details */}
              <EyeFilled
                className="text-xl text-blue-500 cursor-pointer hover:scale-110"
                onClick={() => setSelectedFaculty(faculty)}
              />

              {/* Edit Faculty Details */}
              <CiEdit
                className="text-xl text-blue-500 cursor-pointer hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditFaculty(faculty);
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No faculties available for this campus.</p>
      )}

      {/* Faculty Details Modal */}
      {selectedFaculty && (
        <FacultyDetailsModal faculty={selectedFaculty} onClose={() => setSelectedFaculty(null)} />
      )}

      {/* Edit Faculty Popup */}
      {editFaculty && (
        <EditFacultyPopup
          isOpen={!!editFaculty}
          onClose={() => setEditFaculty(null)}
          faculty={editFaculty}
        />
      )}
    </div>
  );
}