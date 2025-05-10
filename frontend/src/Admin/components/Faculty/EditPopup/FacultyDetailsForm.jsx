import React from "react";

const FacultyDetailsForm = ({ faculty, handleChange, loading, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Faculty Details</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Faculty Name</label>
        <input
          type="text"
          name="title"
          value={faculty.title || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Dean Name</label>
        <input
          type="text"
          name="deanName"
          value={faculty.deanName || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Number of Departments</label>
        <input
          type="number"
          name="noOfDepartments"
          value={faculty.noOfDepartments || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="body"
          value={faculty.body || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Details"}
      </button>
    </form>
  );
};

export default FacultyDetailsForm;