import { EyeFilled } from "@ant-design/icons";
import { CiEdit } from "react-icons/ci";
import { BsTrashFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AdminDetailsModal from "./AdminDetailsModal";
import EditAdminModal from "./EditAdminModal";
import DeleteConfirmationModal from "./DeleteConfirmation";
import { deleteAdminMember } from "../../../../Redux/Slicers/Adminstration";

function AdminList({ members, onEdit, loading }) {
  const dispatch = useDispatch();
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editAdmin, setEditAdmin] = useState(null);
  const [deleteAdminVisible, setDeleteAdminVisible] = useState(false);
  const [adminId, setAdminId] = useState(null);

  const handleDeleteAdmin = (id) => {
    setAdminId(id);
    setDeleteAdminVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteAdminMember(adminId)).unwrap();
      alert("Admin member deleted successfully!");
    } catch (error) {
      alert("Error deleting admin member: " + (error.message || "Unknown error"));
    } finally {
      setDeleteAdminVisible(false);
      onEdit();
    }
  };

  return (
    <>
      {loading ? (
        <p className="font-semibold text-center text-gray-300 text-md md:text-lg">Loading...</p>
      ) : members?.length > 0 ? (
        members.map((admin) => (
          <div className="flex justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors" key={admin.id}>
            <span className="text-gray-700 font-medium">{admin.name}</span>
            <div className="flex gap-4 items-center">
              <EyeFilled
                className="text-xl text-blue-500 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setSelectedAdmin(admin)}
              />
              <CiEdit
                className="text-xl text-blue-500 cursor-pointer hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditAdmin(admin);
                }}
              />
              <BsTrashFill
                className="text-xl text-red-500 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => handleDeleteAdmin(admin.id)}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="mt-8">
          <p className="font-semibold text-center text-gray-300 text-md md:text-lg">No Admin Members Available</p>
        </div>
      )}
      {selectedAdmin && (
        <AdminDetailsModal
          isOpen={!!selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
          admin={selectedAdmin}
        />
      )}
      {editAdmin && (
        <EditAdminModal
          isOpen={!!editAdmin}
          onClose={() => setEditAdmin(null)}
          admin={editAdmin}
          onSave={onEdit}
        />
      )}
      {deleteAdminVisible && (
        <DeleteConfirmationModal
          visible={deleteAdminVisible}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteAdminVisible(false)}
        />
      )}
    </>
  );
}

export default AdminList;