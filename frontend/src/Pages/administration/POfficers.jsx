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

const POfficers = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { usePrincipalOfficers } = useAdministration();
    const { data: principals = [], isLoading } = usePrincipalOfficers;

    const [data, setData] = useState(null);

    useEffect(() => {
        if (!principals.length) return;
        const selected = principals.find((item) => item.id === id);
        if (selected) {
            setData(selected);
        } else {
            navigate("/notfound");
        }
    }, [id, principals]);

    const breadcrumbs = [
        <p key={1} className="text-slate-500 text-xs lg:text-base">
            Administration
        </p>,
        <a
            key={2}
            onClick={() => navigate("/administration/principal-officers")}
            className="cursor-pointer text-slate-500 text-xs lg:text-base"
        >
            Principal Officers
        </a>,
        <p key={3} className="text-blue-500 text-xs lg:text-base">
            {data?.designation}
        </p>,
    ];

    if (isLoading || !data) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600" />
            </div>
        );
    }

    const roles = data?.responsibilities?.split("#").filter(Boolean) || [];
    const contact = data?.contact || {};
    const imageUrl = `${import.meta.env.VITE_BASE_URL}/uploads/${data?.image}`;

    return (
        <>
            <MetaHelmet title={data?.designation || "Principal Officer"} />
            <div className="w-full h-auto lg:min-h-[calc(100vh-150.39px)] font-sans pb-6">
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
                            {data?.designation}
                        </h2>
                    </div>
                </div>

                <div className="mx-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 relative mt-6">
                    {/* BIO & RESPONSIBILITIES */}
                    <div className="w-full lg:col-span-3 md:col-span-2">
                        <div className="mb-4">
                            <h2 className="text-blue-800 font-bold text-lg lg:text-2xl">
                                Brief Biography
                            </h2>
                            <p className="mt-2 leading-7 text-sm text-slate-700">
                                {data?.biography}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-blue-800 font-bold text-lg lg:text-2xl">
                                Roles and Responsibilities
                            </h2>
                            <div className="mt-2">
                                {roles.length ? (
                                    roles.map((role, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start"
                                        >
                                            <FaAsterisk className="text-blue-900 text-sm mt-2" />
                                            <span className="text-sm my-1 ml-2 text-slate-700">
                                                {role}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500 italic">
                                        No responsibilities listed.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-blue-800 font-bold text-lg lg:text-2xl">
                                Contact Information
                            </h2>
                            <div className="mt-2 flex gap-4">
                                {contact?.whatsapp && (
                                    <a href={contact.whatsapp}>
                                        <IoLogoWhatsapp className="text-4xl text-green-500 border-green-500 p-2 border rounded-full" />
                                    </a>
                                )}
                                {contact?.facebook && (
                                    <a href={contact.facebook}>
                                        <FaFacebookSquare className="text-4xl text-blue-700 border-blue-700 p-2 border rounded-full" />
                                    </a>
                                )}
                                {contact?.youtube && (
                                    <a href={contact.youtube}>
                                        <FaYoutube className="text-4xl text-red-500 border-red-500 p-2 border rounded-full" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* IMAGE + NAME */}
                    <div className="w-full lg:col-span-2 md:col-span-1 order-first lg:order-last text-center">
                        <ImageBadgeCard
                            image={data?.image && imageUrl}
                            alt={data?.name}
                            className="mx-auto w-3/5 lg:w-2/5 my-3"
                            height="h-40"
                        />
                        <h2 className="text-neutral-700 font-bold text-xl w-2/3 mx-auto">
                            {data?.name}
                        </h2>
                        <h2 className="text-blue-700 font-bold text-sm lg:text-lg mx-auto">
                            {data?.designation}
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default POfficers;
