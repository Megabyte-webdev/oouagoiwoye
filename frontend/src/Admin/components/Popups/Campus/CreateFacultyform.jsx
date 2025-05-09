import React from 'react';

const CreateFacultyForm = ({ formData, handleInputChange, handleFileChange, loading, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Create Faculty</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Number of Departments</label>
                <input
                    type="number"
                    name="noOfDepartments"
                    value={formData.noOfDepartments}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600"
            >
                {loading ? 'Creating...' : 'Create Faculty'}
            </button>
        </form>
    );
};

export default CreateFacultyForm;