import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function PopupFacultyDetails({ close, faculty }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <FaTimes
          className="absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer hover:text-gray-800"
          onClick={close}
        />
        <h2 className="text-2xl font-bold mb-6 text-center">Faculty Details</h2>
        <div className="space-y-4">
          <p><strong>Name:</strong> {faculty?.title || 'N/A'}</p>
          <p><strong>Dean:</strong> {faculty?.deanName || 'N/A'}</p>
          <p><strong>Departments:</strong> {faculty?.noOfDepartments || 'N/A'}</p>
          <p><strong>About:</strong> {faculty?.body || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}