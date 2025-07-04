import React from 'react';

const CampusImageForm = ({ handleFileChange, loading, onSubmit }) => (
  <form className="space-y-4" onSubmit={onSubmit}>
    <h3 className="text-lg font-semibold">Update Campus Image</h3>
    <div>
      <label className="block font-medium mb-1">Image:</label>
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
      />
    </div>
    <button
      type="submit"
      className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600"
      disabled={loading}
    >
      {loading ? 'Uploading...' : 'Update Image'}
    </button>
  </form>
);

export default CampusImageForm;