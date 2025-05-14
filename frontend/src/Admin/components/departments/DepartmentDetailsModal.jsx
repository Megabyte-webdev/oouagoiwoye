function DepartmentDetailsModal({ department, isOpen, onClose }) {

    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-auto shadow-md">
                <h2 className="font-bold text-2xl text-center mb-6 text-gray-800">Department Details</h2>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 text-gray-700">
                        <p className="mb-2"><span className="font-semibold">Name:</span> {department.title}</p>
                        <p><span className="font-semibold">Description:</span> {department.body}</p>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-2/3">
                        <img
                            className="w-full h-auto rounded-md object-contain"
                            src={`https://api.oouweb.site/public/uploads/${department.image}`}
                            alt="Department image"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>

        </div>
    );
}

export default DepartmentDetailsModal;