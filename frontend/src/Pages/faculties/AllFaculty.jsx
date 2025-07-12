import assets from "../../assets/assets";
import CustomButton from "../../Components/CustomButton";
import { useNavigate } from "react-router-dom";

// mui components
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";

import { MetaHelmet } from "../../Components/PageAttributes";
import useCampus from "../../hooks/useCampus";
import { FaSpinner } from "react-icons/fa";

export default function AllFaculty() {
    const { useFaculties } = useCampus();
    const { data: faculties, isLoading, isError, error } = useFaculties;

    const navigate = useNavigate();

    const breadcrumbs = [
        <p key={1} className="text-slate-500 font-semibold">
            Services
        </p>,
        <Link
            key={2}
            className="text-blue-700 font-semibold"
            href="/faculties"
            onClick={(e) => e.preventDefault()}
        >
            Faculties
        </Link>,
    ];

    return (
        <>
            <MetaHelmet title="Faculties" />

            <div className="w-full h-auto lg:h-auto lg:min-h-screen px-2">
                <div className="p-2 px-4 bg-white">
                    {/* breadcrumbs */}
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
                            Faculties
                        </h2>
                    </div>
                </div>

                <div className="p-2 px-4">
                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex justify-center items-center py-20">
                            <FaSpinner className="animate-spin text-blue-600 text-4xl mr-2" />
                            <span className="text-blue-600 text-lg font-medium">
                                Loading faculties...
                            </span>
                        </div>
                    )}

                    {/* Error State */}
                    {isError && (
                        <div className="text-center py-10 text-red-500 font-medium">
                            Failed to load faculties. Please try again later.
                            <br />
                            <span className="text-sm text-gray-500">
                                {error?.message}
                            </span>
                        </div>
                    )}

                    {/* Data Display */}
                    {!isLoading &&
                        !isError &&
                        faculties?.map((item, index) => (
                            <div
                                key={index}
                                className="w-full bg-white even:bg-blue-50 h-auto border-blue-900 border-t-2 last:border-b-2 p-2 flex items-center justify-between"
                            >
                                <div className="bg-blue-600 relative w-1/3 lg:w-2/12 h-auto flex items-center justify-center">
                                    <div className="bg-yellow-400 w-20 lg:w-40 h-16 lg:h-36 absolute top-0 left-0"></div>
                                    <figure className="m-1 lg:m-3 relative">
                                        <img
                                            src={assets.ooupics}
                                            alt="Faculty"
                                        />
                                    </figure>
                                </div>
                                <div className="w-10/12 h-full p-3 pl-5 lg:pl-10">
                                    <h1 className="text-black text-xl md:text-2xl font-bold">
                                        {item?.title}
                                    </h1>
                                    <p className="flex items-center text-sm md:text-xl text-royal font-semibold mt-2 mb-3 lg:mb-8">
                                        {item?.departments?.length > 0 &&
                                            `${item?.departments?.length} Departments`}
                                    </p>
                                    <CustomButton
                                        handleClick={() => {
                                            navigate(
                                                `/services/faculty/${item?.id}`
                                            );
                                            scrollTo(0, 0);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
