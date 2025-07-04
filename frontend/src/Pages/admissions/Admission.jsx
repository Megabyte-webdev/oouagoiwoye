import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { admissionData } from "../../Data/admission";
import { lecturerData } from "../../Data/lecturers";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import SliderComponent from "../../Components/SliderComponent";
import assets from "../../assets/assets";
import FacultyRequirements from "../../Pages/FacultyRequirements";
import { facultyData } from "../../Data/faculty";
import { departmentData } from "../../Data/departments";
import { data } from "../../Data/news";
import { FaSearch } from 'react-icons/fa';
import { facultyRequirements, feeRequirements } from '../../Data/facultyRequirements'
import { postgraduateData } from '../../Data/postgraduate'


import FAQ from './FAQ'
import { MetaHelmet } from "../../Components/PageAttributes";
const columns = [
    { header: "S/N", field: "serialNo" },
    { header: "Course/Program", field: "course" },
    { header: "UTME Requirements", field: "utmeRequirements" },
    { header: "O Level Requirements", field: "oLevelRequirements" },
    { header: "Direct Entry Requirements", field: "directEntryRequirements" },
];
const feeColumns = [
    { header: "S/N", field: "serialNo" },
    { header: "Course/Program", field: "course" },
    { header: "Acceptance Fee", field: "acceptancefee" },
    { header: "School Fee (Admission)", field: "schoolfeeadmission" },
    { header: "School Fee (Returning)", field: "schoolfeereturning" },
    { header: "Loan", field: "loan" },
];

export default function Admission() {
    const { id } = useParams();
    const [admissions, setAdmissions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selected, setSelected] = useState(1);
    const navigate = useNavigate();

    const check = admissionData?.items.find((item) => item?.href === id);
    useEffect(() => {
        console.log("ID from useParams:", id);
        console.log("Matching admissions Data:", check);

        try {
            setLoading(true);
            if (check) {
                setAdmissions(check);
                console.log("admissions found:", check);
            } else {
                setError("admissions not found");
                navigate("/notfound");
                console.log("admissions not found.");
            }
        } catch (err) {
            setError(err.message);
            console.log("Error:", err.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-10 min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-xl text-gray-600">{error} admissions not found.</p>
            </div>
        );
    }

    const breadcrumbs = [
        <p key={1} className="text-slate-500">Home</p>,
        <Link to="/admissions" className="text-slate-500 cursor-pointer" key={2}>Admissions</Link>,
        <p key={3} className="text-blue-500">{admissions?.href}</p>,
    ];

    return (
        <>
        <MetaHelmet title={admissions.title || "Admissions"} />
       { admissions && (
            <div className="w-full h-auto md:min-h-screen px-4">
                <div className="p-2 px-2 bg-white">
                    <Stack spacing={1}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>

                    <div className="relative w-full flex items-center justify-center min-h-20">
                        <img src={assets.wireframe} alt="Background" className="absolute w-full h-full z-0 object-cover" />
                        <h2 className="relative text-blue-700 text-lg sm:text-xl lg:text-2xl xl:text-4xl font-semibold z-10 text-center px-4 capitalize">
                            {admissions.title}
                        </h2>
                    </div>
                </div>
                <div className="h-60 md:h-80">
                    <img src={admissions.image} className="w-full h-full mb-2 object-cover" alt="" />
                </div>

                <div className="flex space-x-4 my-10 border-b-[1px] border-b-gray-400 overflow-x-auto">
                    {admissions?.programs?.map((item) => (
                        <button key={item?.id} onClick={() => setSelected(item?.id)} className={`capitalize text-sm px-6 w-full whitespace-nowrap py-2 ${selected === item?.id ? "text-blue-600 border-b-[2px] border-b-blue-600" : "text-gray-700"} font-bold`}>
                            {item?.title}
                        </button>
                    ))}
                </div>

                {selected !== 4 && <div>
                    <h3 className="font-bold text-xl md:text-2xl mb-2">Select Program</h3>
                    <div className="relative w-full mb-2">
                        <input type="text" className="w-full px-10 py-2 h-10 md:h-12 border bg-gray-100 text-sm md:text-xl" placeholder="Search here" />
                        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                    </div>
                </div>}

                {
                    id === "postgraduate" &&
                    <>
                       { (selected === 1 &&
                        <div className="max-w-6xl mx-auto px-6 py-10">
                            {/* <h1 className="text-4xl font-bold text-center mb-8">Postgraduate Programs</h1> */}
                            {postgraduateData?.map((program, index) => (
                                <div key={index} className="border-b border-gray-300 pb-6 mb-6">
                                    <h2 className="text-2xl font-semibold mb-4 text-blue-800 text-center">{program.title}</h2>
                                    <div className="text-gray-700 mb-4">
                                        <h3 className="text-xl font-medium text-black mb-2">Programme Outline:</h3>
                                        <p>{program.programOutline}</p>
                                    </div>
                                    <div className="text-gray-700 mb-4">
                                        <h3 className="text-xl font-medium text-black mb-2">Duration:</h3>
                                        <p>{program.duration}</p>
                                    </div>
                                    <div className="text-gray-700 mb-4">
                                        <h3 className="text-xl font-medium text-black mb-2">Entry Requirements:</h3>
                                        <ul className="list-disc list-inside">
                                            {program?.entryRequirements?.map((requirement, reqIndex) => (
                                                <li key={reqIndex}>{requirement}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="text-gray-700 mb-4">
                                        <h3 className="text-xl font-medium text-black mb-2">School Fees:</h3>
                                        <p>{program.fees}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        )}
                        {selected === 2 &&
                            <FAQ />

                        }
                    </>
                }

                {
                    id === "undergraduate" &&
                    <>

                        {selected === 1 &&
                            facultyData?.items?.map(faculty => (
                                <div key={faculty?.id} className="my-5">
                                    <FacultyRequirements
                                        data={facultyRequirements}
                                        columns={columns}
                                        title={faculty?.title}
                                    />
                                </div>
                            ))
                        }
                        {selected === 2 && facultyData?.items?.map((faculty) => (
                            <div key={faculty?.id} className="mx-3 my-3">
                                <h2 className="capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8">{faculty?.title}</h2>
                                {departmentData?.find((item) => item?.faculty?.toLowerCase() === faculty?.href?.toLowerCase()) ? (
                                    <SliderComponent
                                        design="department"
                                        data={departmentData?.filter((item) => item?.faculty?.toLowerCase() === faculty?.href?.toLowerCase())}
                                    />
                                ) : (
                                    <div className="flex justify-center items-center mt-10 min-h-80 bg-gray-100">
                                        <div className="text-gray-800 text-xl">No data Available for now</div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {selected === 3 &&
                            facultyData?.items?.map(faculty => (
                                <div key={faculty?.id} className="my-5">
                                    <FacultyRequirements
                                        data={feeRequirements}
                                        columns={feeColumns}
                                        title={faculty?.title}
                                    />
                                </div>
                            ))
                        }

                        {selected === 4 &&
                            <FAQ />

                        }
                    </>
                }
                <div className="w-full flex items-center justify-center relative bg-cover bg-center h-[300px]" style={{ backgroundImage: `url(${assets.altFooter})` }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h2 className="font-bold mb-2 text-[25px]">Do you want to apply for this program?</h2>
                        <h2 className="text-[#0B35A2] font-bold mb-4 text-[25px]">Application is open now.</h2>

                        <div className="group w-28 h-12 font-bold p-1 relative">
                            <div className="w-11/12 h-4/5 bg-bgBlue group-hover:bg-yellow-500 duration-500 absolute right-0 bottom-0"></div>
                            <div className="w-11/12 h-4/5 bg-blue-800 group-hover:bg-gradient-to-r from-blue-700 to-bgBlue duration-500 absolute left-0 top-0 text-xs text-white flex flex-row items-center justify-center">
                                Apply Here<i className="bx bx-right-arrow-alt ml-1"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
