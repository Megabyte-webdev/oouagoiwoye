import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNews, deleteNews, fetchNews } from "../../../../Redux/Slicers/News";
import CustomButton2 from "../Faculty/CustomButton";
import FormInput from "../Faculty/FormInput";
import { message, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditNews from "./EditNews";

const News = () => {
  const dispatch = useDispatch();
  const { news, loading: newsLoading } = useSelector((state) => state.news);
  const [loading, setLoading] = useState(false);

  const [selectedNews, setSelectedNews] = useState(null);
  const [editNews, setEditNews] = useState(null);
  const [deleteNewsModal, setDeleteNewsModal] = useState(false);
  const [newsId, setNewsId] = useState(null);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    headline: "",
    body: "",
    author: "",
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
    formDataToSend.append("headline", formData.headline);
    formDataToSend.append("body", formData.body);
    formDataToSend.append("author", formData.author);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await dispatch(createNews(formDataToSend)).unwrap();
      message.success("News created successfully");
      dispatch(fetchNews());
      setFormData({
        headline: "",
        body: "",
        author: "",
        image: null,
      });
    } catch (error) {
      console.log("Error creating department: " + error.message);
      message.error("Error creating news: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = (id) => {
    setNewsId(id);
    setDeleteNewsModal(true);
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await dispatch(deleteNews(id)).unwrap();
      message.success("News deleted successfully");
      dispatch(fetchNews());
    } catch (error) {
      message.error("Error deleting news: " + error.message);
    } finally {
      setDeleteNewsModal(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 max-h-[90vh] overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* News List Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
              <h2 className="font-bold text-2xl text-white">News Articles</h2>
            </div>
            
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {newsLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : news.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {news.map((item) => (
                    <div 
                      key={item.id}
                      className="py-4 px-2 hover:bg-gray-50 transition-colors duration-150 overflow-x-auto flex justify-between items-center"
                    >
                      <div className="flex items-center space-x-3">
                        {item.image && (
                          <div className="h-12 w-12 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                            <img
                              src={`https://api.oouweb.site/public/uploads/${item.image}`}
                              alt={item.headline}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/600x400";
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0 ">
                          <h3 className="text-gray-900 font-medium text-base ">{item.headline}</h3>
                          <p className="text-gray-500 text-sm">By {item.author}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setSelectedNews(item)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                          title="View details"
                        >
                          <EyeOutlined style={{ fontSize: '18px' }} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditNews(item);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                          title="Edit news"
                        >
                          <BiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteNews(item.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                          title="Delete news"
                        >
                          <RiDeleteBin6Line size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <p className="mt-4 text-gray-500 text-lg font-medium">No news articles available</p>
                  <p className="text-gray-400 text-sm">Create your first news article to see it here</p>
                </div>
              )}
            </div>
          </div>

          {/* Publish News Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
              <h2 className="font-bold text-2xl text-white">Publish News</h2>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">News Headline</label>
                  <input
                    type="text"
                    name="headline"
                    value={formData.headline}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter headline"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">News Body</label>
                  <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Write news content here..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter author name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">News Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
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
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-colors flex justify-center items-center ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </>
                  ) : (
                    "Publish News"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* News Details Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 rounded-t-xl flex justify-between items-center">
              <h2 className="font-bold text-xl text-white">News Details</h2>
              <button 
                onClick={() => setSelectedNews(null)}
                className="text-white bg-blue-500 bg-opacity-30 hover:bg-opacity-50 rounded-full p-1"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {selectedNews.image && (
                <div className="mb-6 rounded-lg overflow-hidden max-h-64">
                  <img
                    className="w-full h-auto object-cover"
                    src={`https://api.oouweb.site/public/uploads/${selectedNews.image}`}
                    alt="News image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/800/400";
                    }}
                  />
                </div>
              )}
              
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{selectedNews.headline}</h1>
              
              <div className="flex items-center text-gray-500 mb-6">
                <span className="mr-2">By</span>
                <span className="font-medium text-gray-700">{selectedNews.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(selectedNews.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="prose max-w-none text-gray-700">
                <p className="whitespace-pre-line">{selectedNews.body}</p>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit News Modal */}
      {editNews && (
        <EditNews
          isOpen={!!editNews}
          onClose={() => setEditNews(null)}
          news={editNews}
          onSave={() => {
            dispatch(fetchNews());
          }}
        />
      )}
      
      {/* Delete Confirmation Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2 text-red-600">
            <RiDeleteBin6Line size={20} />
            <span>Delete News</span>
          </div>
        }
        open={deleteNewsModal}
        onOk={() => handleDeleteConfirm(newsId)}
        onCancel={() => setDeleteNewsModal(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ 
          danger: true,
          className: "bg-red-500 hover:bg-red-600"
        }}
      >
        <div className="py-4">
          <p className="text-gray-600">Are you sure you want to delete this news article?</p>
          <p className="text-gray-500 text-sm mt-2">This action cannot be undone.</p>
        </div>
      </Modal>
    </>
  );
};

export default News;