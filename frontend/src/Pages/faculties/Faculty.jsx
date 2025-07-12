import { useParams, Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import SliderComponent from "../../Components/SliderComponent";
import assets from "../../assets/assets";
import { communityData } from "../../Data/communities";
import { departmentData } from "../../Data/departments";
import { data } from "../../Data/news";
import { MetaHelmet } from "../../Components/PageAttributes";
import useCampus from "../../hooks/useCampus";
import { lecturerData } from "../../Data/lecturers";

export default function Faculty() {
    const { id } = useParams();
    const { useFacultyById } = useCampus();

    const { data: faculty, isLoading, isError, error } = useFacultyById(id);
    console.log(faculty);

    const breadcrumbs = [
        <p key={1} className="text-slate-500">
            Services
        </p>,
        <Link
            to="/services/faculty"
            className="text-slate-500 cursor-pointer"
            key={2}
        >
            Faculties
        </Link>,
        <p key={3} className="text-blue-500">
            {faculty?.title}
        </p>,
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center mt-10 min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-xl text-gray-600">
                    {error.message || "Faculty not found."}
                </p>
            </div>
        );
    }

    return (
        <>
            <MetaHelmet title={faculty?.title || "Faculty"} />
            <div className="w-full h-auto md:min-h-screen px-2">
                <div className="p-2 px-4 bg-white">
                    <Stack spacing={1}>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>

                    <div className="relative w-full flex items-center justify-center min-h-20">
                        <img
                            src={assets.wireframe}
                            alt="Background"
                            className="absolute w-full h-full z-0 object-cover"
                        />
                        <h2 className="relative text-blue-700 text-lg sm:text-xl lg:text-2xl xl:text-4xl font-semibold z-10 text-center px-4">
                            {faculty.title}
                        </h2>
                    </div>
                </div>

                <div className="mx-4 h-60 md:h-80">
                    <img
                        src={faculty.image}
                        className="w-full h-full mb-2 object-cover"
                        alt=""
                    />
                </div>

                {/* Faculty Intro */}
                <div className="flex flex-col gap-4 md:flex-row justify-between w-full px-4 my-6">
                    <div className="flex-1 w-full md:w-1/2">
                        <h4 className="text-2xl md:text-3xl text-royal font-medium w-2/3 md:w-1/2 py-5">
                            Welcome to {faculty.title}
                        </h4>
                        <p className="text-sm md:text-xl text-gray-600">
                            {faculty.body}
                        </p>
                        <div className="my-5">
                            <h2 className="capitalize text-blue-900 font-bold text-xl lg:text-2xl my-3">
                                Contact information
                            </h2>
                            <section className="w-max grid grid-cols-3 gap-10">
                                <a>
                                    <i className="bx bxl-whatsapp text-green-700 text-2xl border-2 border-green-700 p-2 py-1 rounded-full"></i>
                                </a>
                                <a>
                                    <i className="bx bxl-facebook-square text-blue-700 text-2xl border-2 border-blue-700 p-2 py-1 rounded-full"></i>
                                </a>
                                <a>
                                    <i className="bx bxl-youtube text-red-700 text-2xl border-2 border-red-700 p-2 py-1 rounded-full"></i>
                                </a>
                            </section>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end w-full md:w-[40%]">
                        <img
                            className="w-[80%]"
                            src={`{faculty?.deanImage}`}
                            alt=""
                        />
                        <p className="capitalize w-[80%] text-2xl font-semibold py-2">
                            {faculty.deanName || "Honourable"}
                        </p>
                        <p className="w-[80%] text-xl text-blue-900 font-semibold py-2">
                            Faculty Dean
                        </p>
                    </div>
                </div>

                {/* DEPARTMENTS */}
                <div className="mx-3 my-3">
                    <h2 className="capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8">
                        All Departments
                    </h2>
                    {faculty?.departments ? (
                        <SliderComponent
                            design="department"
                            data={faculty?.departments}
                        />
                    ) : (
                        <div className="flex justify-center items-center mt-10 min-h-80 bg-gray-100">
                            <div className="text-gray-800 text-xl">
                                No data Available for now
                            </div>
                        </div>
                    )}
                </div>

                {/* LECTURERS */}
                <div className="mx-3 my-3">
                    <h2 className="capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8">
                        Faculty Lecturers
                    </h2>
                    {faculty?.facultyLecturers ? (
                        <SliderComponent
                            design="lecturer"
                            data={faculty?.facultyLecturers?.map(
                                (lecturer) => ({
                                    ...lecturer,
                                    title: lecturer.name,
                                })
                            )}
                        />
                    ) : (
                        <div className="flex justify-center items-center mt-10 min-h-80 bg-gray-100">
                            <div className="text-gray-800 text-xl">
                                No data Available for now
                            </div>
                        </div>
                    )}
                </div>

                {/* COMMUNITIES */}
                <div className="mx-3 my-3">
                    <h2 className="capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8">
                        Associations/Communities in the Faculty
                    </h2>
                    <SliderComponent
                        address="community"
                        hideBtn={true}
                        data={communityData.items}
                    />
                </div>

                {/* NEWS */}
                <div className="mx-3 my-3">
                    <h2 className="capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8">
                        Recent News Related to the Faculty
                    </h2>
                    <SliderComponent
                        address="news"
                        btnDesc="Read More"
                        data={data.items}
                    />
                </div>
            </div>
        </>
    );
}
