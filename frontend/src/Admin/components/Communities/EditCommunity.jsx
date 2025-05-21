import { useDispatch } from "react-redux";
import { updateCommunity, updateCommunityImage } from "../../../../Redux/Slicers/Communities";
import { useState } from "react";
import { message } from "antd";

function EditCommunity({ isOpen, onClose, community, onSave }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(community || {});
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setDetailsLoading(true);
    
    try {
      await dispatch(updateCommunity({ 
        id: community.id, 
        data: { 
          title: formData.title, 
          body: formData.body 
        } 
      })).unwrap();
      
      message.success("Community details updated successfully");
      onSave();
    } catch (error) {
      console.error("Error updating community details:", error);
      message.error("Failed to update community details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageLoading(true);
      
      const imageFile = e.target.files[0];
      const formData = new FormData();
      formData.append("image", imageFile);
      
      dispatch(updateCommunityImage({ id: community.id, formData }))
        .unwrap()
        .then(() => {
          message.success("Community image updated successfully");
          onSave();
        })
        .catch((error) => {
          console.error("Error updating community image:", error);
          message.error("Failed to update community image");
        })
        .finally(() => {
          setImageLoading(false);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateDetails(e);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[80vh] overflow-y-auto transform transition-all">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 rounded-t-xl border-b flex justify-between items-center">
          <h2 className="font-bold text-2xl text-gray-800">Edit Community</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${
              activeTab === "details"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Community Details
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${
              activeTab === "image"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("image")}
          >
            Community Image
          </button>
        </div>

        <form className="p-6" onSubmit={handleSubmit}>
          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Community Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B35A2] focus:border-[#0B35A2]"
                  placeholder="Enter community title"
                />
              </div>

              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                  Community Description
                </label>
                <textarea
                  name="body"
                  id="body"
                  rows={5}
                  value={formData.body || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter community description"
                />
              </div>

              <button
                type="button"
                onClick={handleUpdateDetails}
                className="w-full bg-[#0B35A2] text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-950 transition-colors flex justify-center items-center mt-4"
                disabled={detailsLoading}
              >
                {detailsLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Details"
                )}
              </button>
            </div>
          )}

          {/* Image Tab */}
          {activeTab === "image" && (
            <div className="space-y-6">
              {community?.image && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Current Image</p>
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <img 
                      src={`https://api.oouweb.site/public/uploads/${community.image}`} 
                      alt="Community" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/400/300";
                      }}
                    />
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload New Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      {imageLoading ? "Uploading..." : "Click or drag image to upload"}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-[#0B35A2] text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-950 transition-colors flex justify-center items-center mt-4"
                disabled={imageLoading}
                onClick={() => document.getElementById("image").click()}
              >
                {imageLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  "Choose Image"
                )}
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0B35A2] text-white font-medium rounded-lg hover:bg-[#151d59a5] transition-colors"
              disabled={detailsLoading || imageLoading}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCommunity;