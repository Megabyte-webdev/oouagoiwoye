import React from "react";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import Link from "@mui/material/Link";

import CustomButton from "../../Components/CustomButton";
import { MetaHelmet } from "../../Components/PageAttributes";
import assets from "../../assets/assets";
import useAdministration from "../../hooks/useAdministration";
import ImageBadgeCard from "../../Components/ImageBadgeCard";

const PrincipalOfficers = () => {
    const navigate = useNavigate();
    const { usePrincipalOfficers } = useAdministration();
    const {
        data: principalData = [],
        isLoading,
        isError,
    } = usePrincipalOfficers;

    function handleClick(event) {
        event.preventDefault();
    }

    const breadcrumbs = [
        <p key={1} className="text-slate-500">
            Administration
        </p>,
        <Link
            key={2}
            className="text-blue-500"
            href="/administration/principal-officers"
            onClick={handleClick}
        >
            Principal Officers
        </Link>,
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
            <MetaHelmet title="Principal Officers" />
            <div className="w-full h-auto lg:min-h-[calc(100vh-150.39px)]">
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
                            Principal Officers
                        </h2>
                    </div>
                </div>

                <div className="p-2 px-4 font-sans">
                    {principalData.map((item, index) => (
                        <div
                            key={index}
                            className="w-full bg-white even:bg-blue-50 h-auto border-blue-900 border-t-2 last:border-b-2 p-2 flex items-center justify-between"
                        >
                            <ImageBadgeCard
                                image={item?.image}
                                alt={item?.name}
                            />
                            <div className="w-10/12 h-full p-3 pl-5 lg:pl-10">
                                <h1 className="text-royal text-xl lg:text-2xl font-bold">
                                    {item.designation}
                                </h1>
                                <p className="flex items-center text-xs text-neutral-500 lg:text-base font-semibold mt-2 mb-3 lg:mb-8">
                                    {item.name}
                                </p>
                                <CustomButton
                                    handleClick={() =>
                                        navigate(
                                            `/administration/principal-officers/${item.id}`
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PrincipalOfficers;
