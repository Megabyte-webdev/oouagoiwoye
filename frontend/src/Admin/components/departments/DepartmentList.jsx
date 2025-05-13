import { EyeFilled } from "@ant-design/icons";
import { CiEdit } from "react-icons/ci";
import DepartmentDetailsModal from "./DepartmentDetailsModal";
import { useEffect, useState } from "react";
import EditDepartmentModal from "./EditDepartmentModal";
import { useDispatch, useSelector } from "react-redux";
import { use } from "react";
import { deleteDepartment, fetchAllDepartments } from "../../../../Redux/Slicers/DepartmentSlice";
import { BsTrashFill } from "react-icons/bs";
import DeleteConfirmationModal from "./deleteModal";

function DepartmentList({ departments, onEdit }) {

    const dispatch = useDispatch();

    const [selectedDepartment, setSelectedDepartment] = useState();
    const [editDepartment, setEditDepartment] = useState();
    const [deleteDepartmentVisible, setDeleteDepartmentVisible] = useState(false);
    const [departmentId, setDepartmentId] = useState(null);
    

    const handleDeleteDepartment = (id) => {
        setDepartmentId(id);
        setDeleteDepartmentVisible(true);
    }

    const handleDeleteConfirm = (id) => {
            try {
                dispatch(deleteDepartment(departmentId)).unwrap();
                setDeleteDepartmentVisible(true);
                
            } catch (error) {
                alert("Error deleting department: " + error.message);
            }finally {
                setDeleteDepartmentVisible(false);
                onEdit();
            }
        }

    return (
        <>
            {departments.length > 0 ?
                departments.map((department) => (
                    <div className="flex justify-between p-2 border-b" key={department.id} >
                        <span>{department.title}</span>

                        <div className="flex gap-3">

                            <EyeFilled
                                className="text-xl text-blue-500 cursor-pointer hover:scale-110"
                                onClick={() => setSelectedDepartment(department)}
                            />


                            <CiEdit
                                className="text-xl text-blue-500 cursor-pointer hover:scale-110"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setEditDepartment(department);
                                }}
                            />
                            <BsTrashFill
                                className="text-xl text-red-500 cursor-pointer hover:scale-110"
                                onClick={() => handleDeleteDepartment(department.id)}    
                            />
                        </div>
                    </div>
                )) :
                <div className="mt-8">
                    <p className="font-semibold text-center text-gray-300 text-md md:text-lg">No Departments Available</p>
                </div>
            }
            {selectedDepartment && (
                <DepartmentDetailsModal
                    isOpen={!!selectedDepartment}
                    onClose={() => setSelectedDepartment(null)}
                    department={selectedDepartment}
                />
            )}
            {editDepartment && (
                <EditDepartmentModal
                    isOpen={!!editDepartment}
                    onClose={() => setEditDepartment(null)}
                    department={editDepartment}
                    onSave={onEdit}
                />
            )}
            {deleteDepartmentVisible && (
                <DeleteConfirmationModal
                    visible={deleteDepartmentVisible}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteDepartmentVisible(false)}
                />
            )}
        </>
    );
}

export default DepartmentList;