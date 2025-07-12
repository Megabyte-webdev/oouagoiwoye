import React, { useEffect, useState } from "react";
import { FaAsterisk, FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";

import assets from "../../assets/assets";
import { MetaHelmet } from "../../Components/PageAttributes";
import SliderComponent from "../../Components/SliderComponent";
import { availableCoursesData } from "../../Data/availableCourses";
import useAcademic from "../../hooks/useAcademic";
import ImageBadgeCard from "../../Components/ImageBadgeCard";

const DirectoratesElement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { useDirectorate } = useAcademic();
    const { data: directorates, isLoading } = useDirectorate; // ✅ fetch all
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!isLoading && directorates?.length) {
            const item = directorates.find((d) => d.id === id);
            if (item) {
                setData(item);
            } else {
                navigate("/notfound");
            }
        }
    }, [id, directorates, isLoading]);

    const breadcrumbs = [
        <p key={1} className="text-slate-500">
            Services
        </p>,
        <a
            key={2}
            className="text-slate-500 cursor-pointer"
            onClick={() => navigate("/services/directorate")}
        >
            Directorates
        </a>,
        <p key={3} className="text-blue-500">
            {data?.office}
        </p>,
    ];

    return (
        <>
            <MetaHelmet title={data?.title || "Directorate"} />

            {data && (
                <div className="w-full h-auto lg:h-auto lg:min-h-screen px-2">
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
                                {data?.office}
                            </h2>
                        </div>
                    </div>

                    <div className="mx-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="w-full">
                            <h2 className="text-black font-bold text-lg lg:text-2xl mt-2">
                                History of Academic Planning
                            </h2>
                            <p className="mt-2 leading-7 text-sm">
                                {data?.headline}
                            </p>
                            <h2 className="text-blue-800 font-bold text-lg lg:text-2xl mt-2">
                                Overview
                            </h2>
                            <p className="mt-2 leading-7 text-sm">
                                {data?.history}
                            </p>

                            <h2 className="text-blue-800 font-bold text-lg lg:text-2xl mt-2">
                                Requirements
                            </h2>
                            <div className="mt-1 text-sm">
                                {data?.admisionRequirements?.content?.map(
                                    (ele, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <FaAsterisk className="text-blue-900 text-xs" />
                                            <span className="text-sm my-1 ml-2 text-slate-700 font-sans">
                                                {ele}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>

                            <h2 className="text-blue-800 font-bold text-lg lg:text-2xl mt-2">
                                Benefits
                            </h2>
                            <div className="mt-1 text-sm">
                                {data?.benefits?.content?.map((ele, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <FaAsterisk className="text-blue-900 text-xs" />
                                        <span className="text-sm my-1 ml-2 text-slate-700 font-sans">
                                            {ele}
                                        </span>
                                    </div>
                                ))}
                            </div>

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
};

export default DirectoratesElement;
