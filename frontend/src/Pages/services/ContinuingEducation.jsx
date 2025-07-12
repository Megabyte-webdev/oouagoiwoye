import React from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import { IoLocationOutline } from "react-icons/io5";

import assets from "../../assets/assets";
import CustomButton from "../../Components/CustomButton";
import { MetaHelmet } from "../../Components/PageAttributes";

import useAcademic from "../../hooks/useAcademic";
import ImageBadgeCard from "../../Components/ImageBadgeCard";
import PrimarySkeletonLoader from "../../Components/PrimarySkeletonLoader";

function ContinuingEducation() {
    const navigate = useNavigate();
    const { useEducation } = useAcademic();
    const { data: educationData = [], isLoading, isError } = useEducation;

    const handleClick = (event) => {
        event.preventDefault();
    };

    const breadcrumbs = [
        <p key={1} className="text-slate-500">
            Services
        </p>,
        <Link
            key={2}
            className="text-blue-500"
            href="/services/continuing"
            onClick={handleClick}
        >
            Continuing Education
        </Link>,
    ];

    return (
        <>
            <MetaHelmet title="Continuing Education" />

            <div className="w-full h-auto lg:h-auto lg:min-h-screen px-2">
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
                            Continuing Education
                        </h2>
                    </div>
                </div>

                <div className="p-2 px-4">
                    {isLoading ? (
                        <div className="p-2 px-4 space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <PrimarySkeletonLoader key={i} />
                            ))}
                        </div>
                    ) : isError ? (
                        <div className="text-red-600">
                            Failed to load education programs.
                        </div>
                    ) : (
                        educationData?.map((item, index) => (
                            <div
                                key={index}
                                className="w-full bg-white even:bg-blue-50 h-auto border-blue-900 border-t-2 last:border-b-2 p-2 flex items-center justify-between"
                            >
                                <ImageBadgeCard image={item?.image} />
                                <div className="w-10/12 h-full p-3 pl-5 lg:pl-10">
                                    <h1 className="text-royal text-xl lg:text-2xl font-bold">
                                        {item?.program}
                                    </h1>
                                    <p className="flex items-center text-xs lg:text-[16px] mt-2 mb-3 lg:mb-8">
                                        {item?.headline ||
                                            "No description provided."}
                                    </p>
                                    <CustomButton
                                        handleClick={() =>
                                            navigate(
                                                `/services/continuing/${item?.id}`
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default ContinuingEducation;
