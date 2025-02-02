import React from 'react';

const CampusDetailsForm = ({ formData, handleInputChange, loading, onSubmit }) => (
  <form className="space-y-4" onSubmit={onSubmit}>
    <h3 className="text-lg font-semibold">Update Campus Details</h3>
    <div>
      <label className="block font-medium mb-1">Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Enter campus title"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
      />
    </div>
    <div>
      <label className="block font-medium mb-1">Campus Details:</label>
      <input
        type="text"
        name="campusInfo"
        value={formData.campusInfo}
        onChange={handleInputChange}
        placeholder="Enter campus Info"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
      />
    </div>
    <div>
      <label className="block font-medium mb-1">Location:</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        placeholder="Enter campus Info"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
      />
    </div>
    <button
      type="submit"
      className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600"
      disabled={loading}
    >
      {loading ? 'Updating...' : 'Update Details'}
    </button>
  </form>
);

export default CampusDetailsForm;