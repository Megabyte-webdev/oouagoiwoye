import React from 'react';

const CampusContactForm = ({ formData, handleInputChange, loading, onSubmit }) => (
  <form className="space-y-4" onSubmit={onSubmit}>
    <h3 className="text-lg font-semibold">Update Campus Contact</h3>
    <div>
      <label className="block font-medium mb-1">Youtube</label>
      <input
        type="text"
        name="youtube"
        value={formData.youtube}
        onChange={handleInputChange}
        placeholder="Enter Youtube Link"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
      />
    </div>
    <div>
      <label className="block font-medium mb-1">FaceBook</label>
      <input
        type="text"
        name="facebook"
        value={formData.facebook}
        onChange={handleInputChange}
        placeholder="Enter Facebook Link"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
      />
    </div>
    <div>
      <label className="block font-medium mb-1">Whatsapp</label>
      <input
        type="text"
        name="whatsapp"
        value={formData.whatsapp}
        onChange={handleInputChange}
        placeholder="Enter Whatsapp phone Number"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
      />
    </div>
    <button
      type="submit"
      className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600"
      disabled={loading}
    >
      {loading ? 'Updating...' : 'Update Contact'}
    </button>
  </form>
);

export default CampusContactForm;