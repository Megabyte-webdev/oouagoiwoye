import React, { useState } from "react";
import { useNavigate, useLocation, Routes, Route, Navigate } from "react-router-dom";
import { FaUserCircle, FaBuilding } from "react-icons/fa";
import { IoSchool, IoSettings, IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { RiAdminFill, RiLogoutBoxFill } from "react-icons/ri";
import { HiMiniNewspaper } from "react-icons/hi2";
import { FcDepartment } from "react-icons/fc";
import { GiTeacher } from "react-icons/gi";

// Components
import Dashboard from "./components/Dashboard";
import Campuses from "./components/campus/Campuses";

import Faculty from "./components/Faculty/Faculty";
import Administration from "./components/Admin/Administration";
// import Administration from "./components/Administration";
import Facility from "./components/Facility";
import Issues from "./components/Issues";
import News from "./components/News";

import Department from "./components/departments/Department";

// import FacultyPage from './components/Faculty/FacultyPage';
// import Faculties from './components/Faculty/FacultyPage';
// import Campuses1 from './components/Faculty/FacultyPage';


export default function AdminDash() {
  const navigate = useNavigate();
  const location = useLocation();
  const [control, setControl] = useState(false);

  const sidebar = [
    {
      title: "Dashboard",
      path: "dashboard",
      icon: FaUserCircle,
    },
    {
      title: "Campuses",
      path: "campus",
      icon: IoSchool,
    },
    {
      title: "Faculties",
      path: "faculty",
      icon: MdGroups,
    },
    {
      title: "Department",
      path: "department",
      icon: FcDepartment,
    },
    {
      title: "Lecturers",
      path: "lecturer",
      icon: GiTeacher,
    },
    {
      title: "Administration",
      path: "admin",
      icon: RiAdminFill,
    },
    {
      title: "Facilities",
      path: "facility",
      icon: FaBuilding,
    },
    {
      title: "Issues/Complain",
      path: "issues",
      icon: IoSettings,
    },
    {
      title: "News & Events",
      path: "news",
      icon: HiMiniNewspaper,
    },
  ];

  // Get the current path to highlight the active sidebar item
  const currentPath = location.pathname.split("/").pop() || "dashboard";

  // Handle sidebar navigation
  const handleNavigation = (path) => {
    navigate(`/admin-ict/oouagoiwoye-9g4c4h8sh/${path}`);
    setControl(false); // Close mobile sidebar
  };

  return (
    <div className="w-full h-auto">
      <div className="p-3 px-5 border-b-thin border-slate-300">
        <h1 className="text-lg lg:text-3xl font-black flex flex-row items-center justify-between">
          <span className="text-emerald-600">
            OOU Website <span className="text-orange-600"> C-Panel</span>
          </span>
          {!control && (
            <IoMenu
              onClick={() => setControl(!control)}
              className="text-4xl cursor-pointer lg:hidden"
            />
          )}
          {control && (
            <IoMdClose
              onClick={() => setControl(!control)}
              className="text-4xl cursor-auto lg:hidden"
            />
          )}
        </h1>
      </div>
      <div className="w-full h-full flex flex-row items-start relative">
        <div
          className={
            control
              ? "w-3/5 lg:w-2/12 h-full lg:h-screen absolute left-0 lg:top-0 lg:left-0 lg:relative font-light font-sans bg-white duration-1000 shadow-2xl pr-5"
              : "w-3/5 lg:w-2/12 h-full lg:h-screen absolute -left-96 lg:top-0 lg:left-0 lg:relative font-light font-sans bg-white duration-1000 shadow-2xl pr-5"
          }
        >
          <div className="w-full ml-2">
            {sidebar.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`w-full py-3 my-2 px-4 text-deep flex flex-row items-center justify-start rounded-lg shadow-lg hover:bg-bgBlue hover:text-white duration-500 ${
                  currentPath === item.path ? "bg-bgBlue text-white" : ""
                }`}
              >
                <item.icon className="text-2xl mr-4" />
                <h2>{item.title}</h2>
              </button>
            ))}
            <button
              onClick={() => navigate("/admin/auth")}
              className="w-full ml-2 py-3 my-2 px-4 text-deep flex flex-row items-center justify-start rounded-lg shadow-xl hover:bg-bgBlue hover:text-white duration-500"
            >
              <RiLogoutBoxFill className="text-2xl mr-4" />
              Log Out
            </button>
          </div>
        </div>

        <div className="w-full h-screen lg:w-10/12 lg:ml-0 bg-white p-5">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="campus" element={<Campuses />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="department" element={<Department />} />
            <Route path="lecturer" element={<Faculty />} /> {/* Assuming lecturer uses Faculty for now */}
            <Route path="admin" element={<Administration />} />
            <Route path="facility" element={<Facility />} />
            <Route path="issues" element={<Issues />} />
            <Route path="news" element={<News />} />
            <Route path="/" element={<Navigate to="dashboard" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}