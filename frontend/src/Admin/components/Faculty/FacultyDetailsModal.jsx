import React from "react";

export default function FacultyDetailsModal({ faculty, onClose }) {
  return (
    <div 
    className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
    onClick={onClose}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="font-bold text-2xl text-center mb-4">Faculty Details</h2>
        <div className="space-y-4">
          <p><strong>Name:</strong> {faculty.title}</p>
          <p><strong>Dean:</strong> {faculty.deanName}</p>
          <p><strong>Departments:</strong> {faculty.noOfDepartments}</p>
          <p><strong>Description:</strong> {faculty.body}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}