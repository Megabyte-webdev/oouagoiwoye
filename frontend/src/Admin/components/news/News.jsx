import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNews, deleteNews, fetchNews } from "../../../../Redux/Slicers/News";
import CustomButton2 from "../Faculty/CustomButton";
import FormInput from "../Faculty/FormInput";
import { message, Modal } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { CiEdit } from "react-icons/ci";
import { BsTrashFill } from "react-icons/bs";
import EditNews from "./EditNews";


const News = () => {

  const dispatch = useDispatch()
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
    setFormData({ ...formData, image: e.target.files[0] }); // Save file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData(); // Create FormData object
    formDataToSend.append("headline", formData.headline);
    formDataToSend.append("body", formData.body);
    formDataToSend.append("author", formData.author);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    };

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
  }

  const handleDeleteConfirm = async (id) => {
    try {
      await dispatch(deleteNews(id)).unwrap();
      message.success("News deleted successfully");
      dispatch(fetchNews());
    }catch (error) {
      message.error("Error deleting news: " + error.message);
    }finally {
      setDeleteNewsModal(false);
    }
  }

  return (
      <>
        <div className='container w-full max-h-[90vh] overflow-y-auto bg-gray-100 mx-auto p-5 grid gap-6 lg:grid-cols-2'>
          <div className='bg-white p-6 shadow-lg rounded-lg'>
            <h2 className='font-bold text-2xl text-center mb-4'> List Of News </h2>
            {newsLoading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-center mb-4 text-xl">Loading...</p>
              </div>
            ) : (
              <ul className='list-disc pl-5'>
                {news.length > 0 ? news.map((item) => (
                  <div className="flex justify-between p-2 border-b" key={item.id} >
                    <span>{item.headline}</span>
                    <div className="flex gap-3 items-center justify-center">
                      <EyeFilled
                        className="text-xl text-blue-500 cursor-pointer hover:scale-110"
                        onClick={() => setSelectedNews(item)}
                      />
                      <CiEdit
                        className="text-xl text-blue-500 cursor-pointer hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditNews(item);
                        }}
                      />
                      <BsTrashFill
                        className="text-xl text-red-500 cursor-pointer hover:scale-110"
                        onClick={() => handleDeleteNews(item.id)}
                      />
                    </div>
                  </div>
                )) : (
                  <p className='mb-2 font-bold text-center text-gray-500'>
                    No news available
                  </p>
                )}
              </ul>
            )}
          </div>
          <div className='bg-white p-6 shadow-lg rounded-lg'>
            <h2 className='font-bold text-2xl text-center mb-4'> Publish News </h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-h-[400px] overflow-auto">

              <FormInput
                title="News Headline"
                type="text" name="headline"
                value={formData.headline}
                onChange={handleChange}
              />

              <label htmlFor="body" className="block text-gray-700 font-semibold mb-1"> News Body </label>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
              </textarea>
              <FormInput
                title="Author"
                type="text" name="author"
                value={formData.author}
                onChange={handleChange}
              />

              {/* Image Upload Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">News Image</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full border rounded-md p-2" />
              </div>

              <CustomButton2 title={loading ? "Publishing..." : "Publish News"} disabled={loading} />
            </form>
          </div>
        </div>
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
        {
          selectedNews && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-auto shadow-md">
                <h2 className="font-bold text-2xl text-center mb-6 text-gray-800">News Details</h2>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 text-gray-700">
                    <p className="mb-2"><span className="font-bold">Headline:</span> {selectedNews.headline}</p>
                    <p className="mb-2"><span className="font-semibold">Body:</span> {selectedNews.body}</p>
                    <p><span className="font-semibold italic">Author:</span> {selectedNews.author}</p>
                  </div>
                  <div className="flex-shrink-0 w-full md:w-1/3">
                    <img
                      className="w-full h-auto rounded-md object-cover"
                      src={`https://api.oouweb.site/public/uploads/${selectedNews.image}`}
                      alt="Department image"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )
        }
        <Modal
          title="Delete News"
          open={deleteNewsModal}
          onOk={() => handleDeleteConfirm(newsId)}
          onCancel={() => setDeleteNewsModal(false)}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete this News?</p>
        </Modal>
      </>
    )
  }
  export default News;