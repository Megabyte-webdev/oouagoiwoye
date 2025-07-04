import React from "react";

const FacultyContactForm = ({ contact, handleChange, loading, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Faculty Contact</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
        <input
          type="text"
          name="whatsapp"
          value={contact?.whatsapp || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Facebook</label>
        <input
          type="text"
          name="facebook"
          value={contact?.facebook || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">YouTube</label>
        <input
          type="text"
          name="youtube"
          value={contact?.youtube || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Contact"}
      </button>
    </form>
  );
};

export default FacultyContactForm;