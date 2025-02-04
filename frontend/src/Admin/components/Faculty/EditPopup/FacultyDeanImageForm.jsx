import React from "react";

const FacultyDeanImageForm = ({ imageName, handleFileChange, loading }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <h3 className="text-lg font-semibold">Dean Image</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Dean Image</label>
        <input
          type="file"
          name="imageName"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {imageName && (
          <img src={imageName} alt="Dean" className="mt-2 w-32 h-32 object-cover rounded" />
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Update Image"}
      </button>
    </form>
  );
};

export default FacultyDeanImageForm;