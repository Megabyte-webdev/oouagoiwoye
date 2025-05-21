import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../Slicers/AdminSlice";
import administrationReducer from "../Slicers/Adminstration";
import campusReducer from "../Slicers/CampusSlice";
import admissionRequirementsReducer from "../Slicers/AdmissionRequirement";
import continuousEducationReducer from "../Slicers/ContinousEducation";
import departmentReducer from "../Slicers/DepartmentSlice";
import directorateReducer from "../Slicers/DirectorateSlice";
import facultyReducer from "../Slicers/FacultySlice";
import lecturerReducer from "../Slicers/LecturerSlice";
import newsReducer from "../Slicers/News";
import principalOfficersReducer from "../Slicers/PrincipalOfficers";
import schoolFeeReducer from "../Slicers/Schoolfees";
import communitiesReducer from "../Slicers/Communities";


const store = configureStore({
  reducer: {
    admin: adminReducer,
    administration: administrationReducer,
    campus: campusReducer,
    admissionRequirements: admissionRequirementsReducer,
    continuousEducation: continuousEducationReducer,
    department: departmentReducer,
    directorates: directorateReducer,
    faculty: facultyReducer,
    lecturers: lecturerReducer,
    news: newsReducer,
    principalOfficers: principalOfficersReducer,
    schoolFees: schoolFeeReducer,
    communities: communitiesReducer,
  },
});

export default store;
