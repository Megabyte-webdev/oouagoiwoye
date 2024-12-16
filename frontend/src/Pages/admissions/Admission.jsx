import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { admissionData } from "../../Data/admission";
import { lecturerData } from "../../Data/lecturers";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import SliderComponent from "../../Components/SliderComponent";
import assets from "../../assets/assets";
import { communityData } from "../../Data/communities";
import { departmentData } from "../../Data/departments";
import { data } from "../../Data/news";
import { FaSearch } from 'react-icons/fa';

export default function Admission() {
    const { id } = useParams();
    const [admissions, setAdmissions] = useState(null);
    const [loading, setLoading] = useState(true); // Start loading as true by default
    const [error, setError] = useState("");
    const [selected, setSelected] = useState(1);
    const navigate = useNavigate();

    // Matching admissions based on the id
    const check = admissionData?.items.find((item) => item?.title === id);

    useEffect(() => {
        console.log("ID from useParams:", id);
        console.log("Matching admissions Data:", check);

        try {
            setLoading(true); // Ensure loading is true when fetching data
            if (check) {
                setAdmissions(check);  // Set the admissions data if found
                console.log("admissions found:", check);
            } else {
                setError("admissions not found");
                navigate("/notfound"); // Redirect if no admissions is found
                console.log("admissions not found.");
            }
        } catch (err) {
            setError(err.message); // Catch and set any errors
            console.log("Error:", err.message);
        } finally {
            setLoading(false); // End loading once data processing is done
        }
    }, [id]);

    // Show loading spinner when loading is true
    if (loading) {
        return (
            <div className="flex justify-center items-center mt-10 min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    // Show error message if an error occurred
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-xl text-gray-600">{error} admissions not found.</p>
            </div>
        );
    }

    const breadcrumbs = [
        <p key={1} className="text-slate-500">
            Services
        </p>,
        <Link to="/services/admissions" className="text-slate-500 cursor-pointer" key={2}>
            Faculties
        </Link>,
        <p key={3} className="text-blue-500">
            {admissions?.href}
        </p>,
    ];

    return (
        admissions && (
            <div className="w-full h-auto md:min-h-screen px-5">
                <div className="p-2 px-4 bg-white">
                    {/* Breadcrumbs */}
                    <Stack spacing={1}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>

                    <div className="relative w-full flex items-center justify-center min-h-20">
                        {/* Background Image */}
                        <img
                            src={assets.wireframe}
                            alt="Background"
                            className="absolute w-full h-full z-0 object-cover"
                        />
                        {/* Title */}
                        <h2 className="relative text-blue-700 text-lg sm:text-xl lg:text-2xl xl:text-4xl font-semibold z-10 text-center px-4">
                            {admissions.title}
                        </h2>
                    </div>
                </div>
                <div className="h-60 md:h-80">
                    <img src={admissions.image} className="w-full h-full mb-2 object-cover" alt="" />
                </div>
                {/* admission program tabs */}
                <div className="flex space-x-4 my-10 border-b-[1px] border-b-gray-400 overflow-x-auto">
                    {
                        admissions?.programs?.map((item) => (
                            <button key={item?.id} onClick={() => setSelected(item?.id)} className={`capitalize text-sm px-6 w-full whitespace-nowrap py-2 ${selected === item?.id ? "text-blue-600 border-b-[2px] border-b-blue-600" : "text-gray-700"} font-bold`}>
                                {item?.title}
                            </button>
                        ))
                    }
                </div>
                <div>
                    <h3 className="font-bold text-xl md:text-2xl mb-2">Select Program</h3>
                    {/* Search Input */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="w-full px-10 py-2 h-10 md:h-12 border bg-gray-100 text-sm md:text-xl"
                            placeholder="Search here"
                        />
                        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                <div className="my-3">
                    <h2 className="capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8">All Departments</h2>
                    {departmentData?.find(item => item?.faculty?.toLowerCase() === id) ?
                        <SliderComponent design="department" data={departmentData?.filter(item => item?.faculty.toLowerCase() === id)} />
                        : <div className="flex justify-center items-center mt-10 min-h-80 bg-gray-100">
                            <div className="text-gray-800 text-xl">No data Available for now</div>
                        </div>}
                </div>
                <div className="my-3">
                    <h2 className="capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8">admissions Lecturers</h2>
                    {lecturerData.items?.find(item => item?.faculty?.toLowerCase() === id) ?
                        <SliderComponent design="lecturer" data={lecturerData.items.filter(item => item?.faculty?.toLowerCase() === id)} />
                        : <div className="flex justify-center items-center mt-10 min-h-80 bg-gray-100">
                            <div className="text-gray-800 text-xl">No data Available for now</div>
                        </div>}
                </div>
                <div className="my-3">
                    <h2 className="capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8">Associations/Communities in the admissions</h2>
                    <SliderComponent address="community" hideBtn={true} data={communityData.items} />
                </div>
                <div className="my-3">
                    <h2 className="capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8">Recent News Related to the admissions</h2>
                    <SliderComponent address="news" btnDesc="Read More" data={data.items} />
                </div>


                <div className='w-full flex items-center justify-center relative bg-cover bg-center h-[300px]' style={{ backgroundImage: `url(${assets.altFooter})` }}>
                <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                    <h2 className='font-bold mb-2 text-[25px]'>Do you want to apply for this program?</h2>
                    <h2 className='text-[#0B35A2] font-bold mb-4 text-[25px]'>Application is open now.</h2>

                    <div className='group w-28 h-12 font-bold p-1 relative'>
                        <div className='w-11/12 h-4/5 bg-bgBlue group-hover:bg-yellow-500 duration-500 absolute right-0 bottom-0'></div>
                        <div className='w-11/12 h-4/5 bg-blue-800 group-hover:bg-gradient-to-r from-blue-700 to-bgBlue duration-500 absolute left-0 top-0 text-xs text-white flex flex-row items-center justify-center'>
                            Apply Here<i className='bx bx-right-arrow-alt ml-1'></i>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    );
}
