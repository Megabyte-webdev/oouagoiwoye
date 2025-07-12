import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";

import { IoLogoWhatsapp } from "react-icons/io5";
import { FaAsterisk, FaFacebookSquare, FaYoutube } from "react-icons/fa";

import { MetaHelmet } from "../../Components/PageAttributes";
import assets from "../../assets/assets";
import useAdministration from "../../hooks/useAdministration";
import ImageBadgeCard from "../../Components/ImageBadgeCard";

const AAdministration = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { useAdminList } = useAdministration();
    const { data: admins = [], isLoading, isError } = useAdminList;

    const [data, setData] = useState(null);

    useEffect(() => {
        const selected = admins.find((item) => item.id === id);
        if (selected) {
            setData(selected);
        } else if (!isLoading) {
            navigate("/notfound");
        }
    }, [id, admins, isLoading, navigate]);

    const breadcrumbs = [
        <p key={1} className="text-slate-500 text-xs lg:text-base">
            Administration
        </p>,
        <a
            className="text-slate-500 cursor-pointer text-xs lg:text-base"
            key={2}
            onClick={(e) => {
                e.preventDefault();
                navigate("/administration/admin");
            }}
        >
            Admin
        </a>,
        <p key={3} className="text-blue-500 text-xs lg:text-base">
            {data?.designation}
        </p>,
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600" />
            </div>
        );
    }

    return (
        <>
            <MetaHelmet title={data?.designation || "Admin"} />
            {data && (
                <div className="w-full h-auto lg:min-h-[calc(100vh-150.39px)] font-sans pb-5">
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
                                {data.designation}
                            </h2>
                        </div>
                    </div>

                    <div className="mx-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 relative">
                        {/* BIOGRAPHY AND RESPONSIBILITIES */}
                        <div className="w-full lg:col-span-3 md:col-span-2">
                            <h2 className="text-blue-800 font-bold text-lg lg:text-2xl mt-2">
                                Brief Biography
                            </h2>
                            <p className="mt-2 leading-7 text-sm">
                                {data.biography}
                            </p>

                            <h2 className="text-blue-800 font-bold text-lg lg:text-2xl mt-6">
                                Role and Responsibilities
                            </h2>
                            <div className="mt-1 text-sm">
                                {(data.responsibilities?.split("#") || []).map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <FaAsterisk className="text-blue-900 text-sm mt-2" />
                                            <span className="text-sm my-1 ml-2 text-slate-700">
                                                {item.trim()}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>

                            <h2 className="text-blue-800 font-bold text-lg lg:text-2xl mt-6">
                                Contact Information
                            </h2>
                            <div className="mt-1 mb-4 flex items-center gap-5 w-fit">
                                <a href={data?.contact?.whatsapp || "#"}>
                                    <IoLogoWhatsapp className="text-4xl text-green-500 border-green-500 p-2 border rounded-full" />
                                </a>
                                <a href={data?.contact?.facebook || "#"}>
                                    <FaFacebookSquare className="text-4xl text-blue-700 border-blue-700 p-2 border rounded-full" />
                                </a>
                                <a href={data?.contact?.youtube || "#"}>
                                    <FaYoutube className="text-4xl text-red-500 border-red-500 p-2 border rounded-full" />
                                </a>
                            </div>
                        </div>

                        {/* IMAGE + NAME */}
                        <div className="w-full lg:col-span-2 md:col-span-1 order-first lg:order-last text-center">
                            <ImageBadgeCard
                                image={data?.image}
                                alt={data?.name}
                                className="mx-auto w-60 my-3"
                                height="h-40"
                            />
                            <h2 className="text-neutral-700 font-bold text-xl w-2/3 mx-auto">
                                {data.name}
                            </h2>
                            <h2 className="text-blue-700 font-bold text-sm lg:text-lg mx-auto">
                                {data.designation}
                            </h2>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AAdministration;
