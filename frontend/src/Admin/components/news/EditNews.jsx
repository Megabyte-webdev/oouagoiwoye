import { useDispatch } from "react-redux";
import { updateNews, updateNewsImage } from "../../../../Redux/Slicers/News";
import {useState} from "react";

function EditNews({isOpen, onClose, news, onSave}) {

    const dispatch = useDispatch()
    const [formData, setFormData] = useState(news || {});
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [updateImageLoading, setUpdateImageLoading] = useState(false);

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
                setDetailsLoading(false)
                onSave();
            })
            .catch(() => setDetailsLoading(false));
    };



    const handleUpdateImage = (e) => {
        const { name, files } = e.target;
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
        e.preventDefault(); // Prevent form from submitting prematurely
        setDetailsLoading(true);
        try {
            await dispatch(editDepartment({ id: department.id, data: formData })).unwrap();
            onSave(); // Trigger parent save function
            onClose(); // Close modal
        } catch (error) {
            console.error("Error updating faculty details:", error);
        } finally {
            setDetailsLoading(false);
            onSave()
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                <h2 className="font-bold text-3xl text-center mb-4">Edit News</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <h2 className="font-semibold text-2xl text-left mb-4 underline">Edit News Details</h2>
                    <div>
                        <label htmlFor="title" className="block font-semibold">News HeadLine</label>
                        <input
                            type="text"
                            name="headline"
                            value={formData.headline}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="body" className="block font-semibold">News Body</label>
                        <textarea
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="author" className="block font-semibold">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleUpdateDetails}
                        className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600"
                        disabled={detailsLoading}
                    >
                        {detailsLoading ? "Updating..." : "Update Details"}
                    </button>

                    <h2 className="font-semibold text-1xl text-left mb-4">Edit News Image</h2>
                    <div>
                        <label htmlFor="image" className="block font-semibold">Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleUpdateImage}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleUpdateImage}
                        className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600"
                        disabled={updateImageLoading}
                    >
                        {updateImageLoading ? "Updating..." : "Update Image"}
                    </button>

                    {/* Main Save Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        disabled={detailsLoading}
                    >
                        {detailsLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditNews;