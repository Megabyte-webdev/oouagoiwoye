import { use } from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchCampus } from "../../../../Redux/Slicers/CampusSlice";
import { fetchFaculty } from "../../../../Redux/Slicers/FacultySlice";
import DepartmentList from "./DepartmentList";
import CreateDepartmentForm from "./createDepartmentForm";


const Department = () => {

  const dispatch = useDispatch()

  const { campuses, loading: campusLoading } = useSelector((state) => state.campus)
  const [selectedCampus, setselectedCampus] = useState(null)
  const { faculties, loading } = useSelector((state) => state.faculty)


  const faculty = !loading && faculties?.filter((f) => f.campusId === selectedCampus?.id)

  const [selectedFaculty, setSelectedFaculty] = useState(null)

  useEffect(() => {
    dispatch(fetchCampus())
    dispatch(fetchFaculty())
  }, [dispatch])


  function handleCampusChange(e) {
    const selectedId = e.target.value
    const campus = campuses.find((c) => c.id === selectedId)
    setselectedCampus(campus || null)
    setSelectedFaculty(null)
  }

  function handleFacultyChange(e) {
    const selectedid = e.target.value
    const facult = faculty?.find((f) => f.id === selectedid)
    setSelectedFaculty(facult || null)
  }

  const handleSave = async () => {
    const resultAction = await dispatch(fetchFaculty());

    if (fetchFaculty.fulfilled.match(resultAction)) {
      const updatedFaculties = resultAction.payload;
      const updatedFaculty = updatedFaculties.find(f => f.id === selectedFaculty?.id);
      if (updatedFaculty) {
        setSelectedFaculty(updatedFaculty);
      }
    }
  };


  return (
    <div className='container w-full max-h-[90vh] overflow-y-auto bg-gray-100 mx-auto p-5 grid gap-6 lg:grid-cols-2'>
      <div className='bg-white p-6 shadow-lg rounded-lg'>
        <h2 className='font-bold text-2xl text-center mb-4'>Select Campus</h2>
        <select
          className='w-full p-2 border rounded-md shadow-lg mb-4'
          value={selectedCampus?.id || ""}
          onChange={handleCampusChange}
          disabled={campusLoading}
        >
          <option value="" disabled>{campusLoading ? "Loading...." : "Select a Campus"}</option>

          {campuses.length > 0 ? (
            campuses?.map((campus) => {
              return (
                <option key={campus.id} value={campus.id}>
                  {campus.title}
                </option>)
            })
          ) : (
            <option disabled> No campuses Available </option>
          )}
        </select>

        {selectedCampus && (
          <div className="w-full mt-4">
            <h2 className='font-bold text-xl text-center mb-4'>Select Faculty</h2>
            <select
              className='w-full p-2 border rounded-md shadow-lg'
              value={selectedFaculty?.id || ""}
              onChange={handleFacultyChange}
            >
              <option value="" disabled>Select a faculty</option>

              {faculty.length > 0 ? faculty?.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.title}
                </option>
              )) : (
                <option disabled>No faculties available</option>
              )
              }
            </select>
          </div>
        )}
      </div>

      {selectedFaculty &&
        <>
          <div className='bg-white p-6 shadow-lg rounded-lg'>
            <h2 className="font-bold text-center text-md md:text-xl">List of Departments </h2>
            <DepartmentList departments={selectedFaculty.departments} onEdit={handleSave} />
          </div>
          <div className='bg-white p-6 shadow-lg rounded-lg'>
            <h2 className="font-bold text-center text-md md:text-xl">Create Department</h2>
            <CreateDepartmentForm facultyId={selectedFaculty.id} onCreate={handleSave} />
          </div>

        </>}


    </div>
  )
}

export default Department;