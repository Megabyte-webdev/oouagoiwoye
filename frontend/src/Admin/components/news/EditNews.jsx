import { useDispatch } from "react-redux";
import { updateNews, updateNewsImage } from "../../../../Redux/Slicers/News";
import { useState } from "react";

function EditNews({ isOpen, onClose, news, onSave }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(news || {});
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [updateImageLoading, setUpdateImageLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    setDetailsLoading(true);
    dispatch(updateNews({ id: news.id, data: formData }))
      .unwrap()
      .then(() => {
        setDetailsLoading(false);
        onSave();
      })
      .catch(() => setDetailsLoading(false));
  };

  const handleUpdateImage = (e) => {
    const { files } = e.target;
    setUpdateImageLoading(true);

    if (files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      dispatch(updateNewsImage({ id: news.id, data: formData }))
        .unwrap()
        .then(() => setUpdateImageLoading(false))
        .catch(() => setUpdateImageLoading(false));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDetailsLoading(true);
    try {
      await dispatch(updateNews({ id: news.id, data: formData })).unwrap();
      onSave();
      onClose();
    } catch (error) {
      console.error("Error updating news details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 rounded-t-xl border-b flex justify-between items-center">
          <h2 className="font-bold text-2xl text-gray-800">Edit News</h2>
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
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            News Details
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${
              activeTab === "image"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("image")}
          >
            News Image
          </button>
        </div>

        <form className="p-6" onSubmit={handleSubmit}>
          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
                  News Headline
                </label>
                <input
                  type="text"
                  name="headline"
                  id="headline"
                  value={formData.headline || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter headline"
                />
              </div>

              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                  News Body
                </label>
                <textarea
                  name="body"
                  id="body"
                  rows={5}
                  value={formData.body || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter news content"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={formData.author || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter author name"
                />
              </div>

              <button
                type="button"
                onClick={handleUpdateDetails}
                className="w-full bg-blue-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center mt-4"
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
              {news?.imageUrl && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Current Image</p>
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <img 
                      src={news.imageUrl} 
                      alt="News" 
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
                    onChange={handleUpdateImage}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={() => document.getElementById('image').click()}
                className="w-full bg-blue-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center"
                disabled={updateImageLoading}
              >
                {updateImageLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Upload New Image"
                )}
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-5 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              disabled={detailsLoading}
            >
              {detailsLoading ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNews;