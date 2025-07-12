import React, { useEffect, useState } from "react";
import { FaAsterisk, FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";

import assets from "../../assets/assets";
import SliderComponent from "../../Components/SliderComponent";
import { facultyData } from "../../Data/faculty";
import { availableCoursesData } from "../../Data/availableCourses";
import { MetaHelmet } from "../../Components/PageAttributes";
import useAcademic from "../../hooks/useAcademic";
import ImageBadgeCard from "../../Components/ImageBadgeCard";

export default function ContinuingEducationElement() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { useEducation } = useAcademic();
    const { data: educationList, isLoading, isError } = useEducation;
    const [data, setData] = useState(null);

    function handleClick(event) {
        event.preventDefault();
        navigate("/services/continuing");
    }

    useEffect(() => {
        if (educationList?.length) {
            const match = educationList.find((item) => item?.id === id);
            if (match) {
                setData(match);
            } else {
                navigate("/notfound");
            }
        }
    }, [educationList, id]);

    const breadcrumbs = [
        <p key={1} className="text-slate-500">
            Services
        </p>,
        <a
            className="text-slate-500 cursor-pointer"
            key={2}
            onClick={handleClick}
        >
            Continuing Education
        </a>,
        <p key={3} className="text-blue-500">
            {data?.program}
        </p>,
    ];

    if (isLoading)
        return (
            <div className="text-center py-20 text-blue-600 font-medium">
                Loading...
            </div>
        );
    if (isError)
        return (
            <div className="text-center py-20 text-red-600 font-medium">
                Failed to fetch data.
            </div>
        );

    return (
        <>
            <MetaHelmet title={data?.title || "Continuing Education"} />

            {data && (
                <div className="w-full h-auto lg:min-h-screen px-2">
                    <div className="p-2 px-4 bg-white">
                        <Stack spacing={1}>
                            <Breadcrumbs
                                separator={
                                    <NavigateNextIcon fontSize="small" />
                                }
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
                                {data.program}
                            </h2>
                        </div>
                    </div>

                    <div className="mx-4">
                        <img
                            src={data?.image}
                            className="w-full mb-2 h-[377px] object-cover"
                            alt=""
                        />
                    </div>

                    <div className="mx-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="w-full">
                            <Section
                                title={data?.headline}
                                content={data?.overview}
                            />

                            <Section
                                title="Requirements"
                                content={data?.requirements}
                                isList
                            />

                            <Section
                                title="Benefits"
                                content={data?.benefits}
                                isList
                            />

                            <div className="w-full">
                                <h2 className="text-blue-800 font-bold text-lg lg:text-2xl mt-2">
                                    Contact Information
                                </h2>
                                <div className="mt-1 mb-4">
                                    <div className="flex items-center justify-between w-2/5 lg:w-3/12">
                                        <a href="#">
                                            <IoLogoWhatsapp className="text-4xl text-green-500 border-green-500 p-2 border-thin rounded-full" />
                                        </a>
                                        <a href="#">
                                            <FaFacebookSquare className="text-4xl text-blue-700 border-blue-700 p-2 border-thin rounded-full" />
                                        </a>
                                        <a href="#">
                                            <FaYoutube className="text-4xl text-red-500 border-red-500 p-2 border-thin rounded-full" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ImageBadgeCard
                            className="w-full lg:w-9/12 aspect-square mx-auto"
                            height="h-auto"
                        />
                    </div>

                    <div className="mx-3 my-5">
                        <h2 className="text-blue-800 font-bold text-lg lg:text-2xl mt-2">
                            Recent News related to campus
                        </h2>
                        <SliderComponent data={availableCoursesData.items} />
                    </div>

                    <div
                        className="w-full flex items-center justify-center relative bg-cover bg-center h-[300px]"
                        style={{ backgroundImage: `url(${assets.altFooter})` }}
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <h2 className="font-bold mb-2 text-[25px]">
                                Do you want to apply for this program?
                            </h2>
                            <h2 className="text-[#0B35A2] font-bold mb-4 text-[25px]">
                                Application is open now.
                            </h2>
                            <div className="group w-28 h-12 font-bold p-1 relative">
                                <div className="w-11/12 h-4/5 bg-bgBlue group-hover:bg-yellow-500 duration-500 absolute right-0 bottom-0"></div>
                                <div className="w-11/12 h-4/5 bg-blue-800 group-hover:bg-gradient-to-r from-blue-700 to-bgBlue duration-500 absolute left-0 top-0 text-xs text-white flex flex-row items-center justify-center">
                                    Apply Here
                                    <i className="bx bx-right-arrow-alt ml-1"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const Section = ({ title, content, isList = false }) => {
    if (!title && !content) return null;

    return (
        <div className="w-full">
            <h2 className="text-blue-800 font-bold text-lg lg:text-2xl mt-4">
                {title}
            </h2>
            <div className="mt-2 text-sm">
                {isList && Array.isArray(content) ? (
                    content.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <FaAsterisk className="text-blue-900 text-xs" />
                            <span className="text-sm my-1 ml-2 text-slate-700 font-sans">
                                {item}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="leading-7 text-sm">{content}</p>
                )}
            </div>
        </div>
    );
};
