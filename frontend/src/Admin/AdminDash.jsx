import React from 'react';
import { FaUserCircle, FaBuilding } from "react-icons/fa";
import { IoSchool, IoSettings, IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { HiMiniNewspaper } from "react-icons/hi2";
import { RiLogoutBoxFill } from "react-icons/ri";

//components
import Dashboard from "./components/Dashboard";
import Campuses from "./components/Campuses";
import Faculty from "./components/Faculty";
import Administration from "./components/Administration";
import Facility from "./components/Facility";
import Issues from "./components/Issues";
import News from "./components/News";

export default function AdminDash() {
    const sidebar = [
        {
            title: "Dashboard",
            view: "dashboard",
            icon: FaUserCircle,
        },
        {
            title: "Campuses",
            view: "campus",
            icon: IoSchool,
        },
        {
            title: "Faculties",
            view: "faculty",
            icon: MdGroups,
        },
        {
            title: "Administration",
            view: "admin",
            icon: RiAdminFill,
        },
        {
            title: "Facilities",
            view: "facility",
            icon: FaBuilding,
        },
        {
            title: "Issues/Complain",
            view: "issues",
            icon: IoSettings,
        },
        {
            title: "News & Events",
            view: "news",
            icon: HiMiniNewspaper,
        },

    ]
    const [view, setView] = React.useState("dashboard");
    const [control, setControl] = React.useState(false);
    console.log(control);
    
  return (
    <div className='w-full h-screen'>
        <div className='p-3 px-5 border-b-thin border-slate-300'>
            <h1 className='text-lg lg:text-3xl font-black flex flex-row items-center justify-between'>
                <span className='text-emerald-600'>
                    OOU Website 
                <span className='text-orange-600'> C-Panel</span></span>
                {!control && <IoMenu  onClick={()=>setControl(!control)} className=' text-4xl cursor-pointer lg:hidden'/>}
                {control && <IoMdClose  onClick={()=>setControl(!control)} className=' text-4xl cursor-auto lg:hidden'/>}
            </h1>
        </div>
        <div className='w-full h-full flex flex-row items-center relative '>
            <div className={control ? 'w-3/5 lg:w-2/12 h-full absolute left-0 lg:top-0 lg:left-0 lg:relative font-light font-sans bg-white duration-1000 shadow-2xl pr-5' : 'w-3/5 lg:w-2/12 h-full absolute -left-96 lg:top-0 lg:left-0 lg:relative font-light font-sans bg-white duration-1000 shadow-2xl pr-5'}>
                <div className='w-full ml-2'>
                    {sidebar.map((item, index)=>(
                        <button key={index} 
                        onClick={
                            ()=>{setView(item.view)
                            setControl(false)}
                        } 
                        className='w-full py-3 my-2 px-4 text-deep flex flex-row items-center justify-start rounded-lg shadow-lg hover:bg-bgBlue hover:text-white duration-500'>
                            <item.icon className='text-2xl mr-4'/>
                            <h2>{item.title}</h2>
                        </button>
                    ))}
                </div>
                <button onClick={""} className='w-full ml-2 py-3 my-2 px-4 text-deep flex flex-row items-center justify-start rounded-lg shadow-xl hover:bg-bgBlue hover:text-white duration-500'>
                    <RiLogoutBoxFill className='text-2xl mr-4'/>
                    Log Out
                </button>
            </div>
            <div className='w-full h-full lg:w-10/12 lg:ml-0 bg-white p-5'>
                {view === "dashboard" && <Dashboard/>}
                {view === "campus" && <Campuses/>}
                {view === "faculty" && <Faculty/>}
                {view === "admin" && <Administration/>}
                {view === "facility" && <Facility/>}
                {view === "issues" && <Issues/>}
                {view === "news" && <News/>}
            </div>
        </div>
    </div>
  )
}
