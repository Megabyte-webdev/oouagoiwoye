import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommunity, deleteCommunity, fetchCommunities } from "../../../../Redux/Slicers/Communities";
import { message, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditCommunity from "./EditCommunity";

const Communities = () => {
  const dispatch = useDispatch();
  const { communities, loading: communitiesLoading } = useSelector((state) => state.communities);
  const [loading, setLoading] = useState(false);

  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [editCommunity, setEditCommunity] = useState(null);
  const [deleteCommunityModal, setDeleteCommunityModal] = useState(false);
  const [communityId, setCommunityId] = useState(null);

  useEffect(() => {
    dispatch(fetchCommunities());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("body", formData.body);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await dispatch(createCommunity(formDataToSend)).unwrap();
      message.success("Community created successfully");
      dispatch(fetchCommunities());
      setFormData({
        title: "",
        body: "",
        image: null,
      });
    } catch (error) {
      console.log("Error creating community: " + error.message);
      message.error("Error creating community: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCommunity = (id) => {
    setCommunityId(id);
    setDeleteCommunityModal(true);
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await dispatch(deleteCommunity(id)).unwrap();
      message.success("Community deleted successfully");
      dispatch(fetchCommunities());
    } catch (error) {
      message.error("Error deleting community: " + error.message);
    } finally {
      setDeleteCommunityModal(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 max-h-[90vh] overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Communities List Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-[#0B35A2] px-6 py-4">
              <h2 className="font-bold text-2xl text-white">Communities</h2>
            </div>
            
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {communitiesLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : communities?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {communities.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.image ? (
                              <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                                <img
                                  src={`https://api.oouweb.site/public/uploads/${item.image}`}
                                  alt={item.title}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/600x400";
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 truncate max-w-xs">{item.body}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setSelectedCommunity(item)}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                                title="View details"
                              >
                                <EyeOutlined style={{ fontSize: '18px' }} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditCommunity(item);
                                }}
                                className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50"
                                title="Edit community"
                              >
                                <BiEdit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteCommunity(item.id)}
                                className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                                title="Delete community"
                              >
                                <RiDeleteBin6Line size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="mt-4 text-gray-500 text-lg font-medium">No communities available</p>
                  <p className="text-gray-400 text-sm">Create your first community to see it here</p>
                </div>
              )}
            </div>
          </div>

          {/* Create Community Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-[#0B35A2] px-6 py-4">
              <h2 className="font-bold text-2xl text-white">Create Community</h2>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Community Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="Enter community title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Community Description</label>
                  <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="Write community description here..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Community Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-[#0B35A2] hover:text-purple-500 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      {formData.image && (
                        <p className="text-sm text-green-600">
                          Selected: {formData.image.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#0B35A2] text-white font-medium py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-800 transition-colors flex justify-center items-center ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    "Create Community"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Community Details Modal */}
      {selectedCommunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="bg-[#0B35A2] px-6 py-4 rounded-t-xl flex justify-between items-center">
              <h2 className="font-bold text-xl text-white">Community Details</h2>
              <button 
                onClick={() => setSelectedCommunity(null)}
                className="text-white bg-purple-500 bg-opacity-30 hover:bg-opacity-50 rounded-full p-1"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {selectedCommunity.image && (
                <div className="mb-6 rounded-lg overflow-hidden max-h-64">
                  <img
                    className="w-full h-auto object-cover"
                    src={`https://api.oouweb.site/public/uploads/${selectedCommunity.image}`}
                    alt="Community image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/800/400";
                    }}
                  />
                </div>
              )}
              
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{selectedCommunity.title}</h1>
              
              <div className="flex items-center text-gray-500 mb-6">
                <span>{new Date(selectedCommunity.createdAt).toLocaleDateString() || "Date not available"}</span>
              </div>
              
              <div className="prose max-w-none text-gray-700">
                <p className="whitespace-pre-line">{selectedCommunity.body}</p>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedCommunity(null)}
                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Community Modal */}
      {editCommunity && (
        <EditCommunity
          isOpen={!!editCommunity}
          onClose={() => setEditCommunity(null)}
          community={editCommunity}
          onSave={() => {
            dispatch(fetchCommunities());
          }}
        />
      )}
      
      {/* Delete Confirmation Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2 text-red-600">
            <RiDeleteBin6Line size={20} />
            <span>Delete Community</span>
          </div>
        }
        open={deleteCommunityModal}
        onOk={() => handleDeleteConfirm(communityId)}
        onCancel={() => setDeleteCommunityModal(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ 
          danger: true,
          className: "bg-red-500 hover:bg-red-600"
        }}
      >
        <div className="py-4">
          <p className="text-gray-600">Are you sure you want to delete this community?</p>
          <p className="text-gray-500 text-sm mt-2">This action cannot be undone.</p>
        </div>
      </Modal>
    </>
  );
};

export default Communities;