import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMembers } from "../../../../Redux/Slicers/Adminstration";
import AdminList from "./AdminList";
import CreateAdminForm from "./CreateAdminForm";

const Administration = () => {
  const dispatch = useDispatch();
  const { members, loading } = useSelector((state) => state.administration);

  useEffect(() => {
    dispatch(fetchAllMembers());
  }, [dispatch]);

  const handleSave = async () => {
    await dispatch(fetchAllMembers());
  };

  return (
    <div className="container w-full max-h-[90vh] overflow-y-auto bg-gray-100 mx-auto p-6 grid gap-6 lg:grid-cols-2">
      <div className="bg-white p-8 shadow-lg rounded-xl">
        <h2 className="font-bold text-center text-xl md:text-2xl text-gray-800 mb-6">Admin Members</h2>
        <AdminList members={members} onEdit={handleSave} loading={loading} />
      </div>
      <div className="bg-white p-8 shadow-lg rounded-xl">
        <h2 className="font-bold text-center text-xl md:text-2xl text-gray-800 mb-6">Create Admin Member</h2>
        <CreateAdminForm onCreate={handleSave} />
      </div>
    </div>
  );
};

export default Administration;