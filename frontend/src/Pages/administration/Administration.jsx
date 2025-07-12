import React from "react";
import assets from "../../assets/assets";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MetaHelmet } from "../../Components/PageAttributes";
import CustomButton from "../../Components/CustomButton";
import useAdministration from "../../hooks/useAdministration";
import ImageBadgeCard from "../../Components/ImageBadgeCard";

const Administration = () => {
    const navigate = useNavigate();
    const { useAdminList } = useAdministration();
    const { data: adminData = [], isLoading, isError } = useAdminList;
    const breadcrumbs = [
        <p key={1} className="text-slate-500">
            Home
        </p>,
        <Link key={2} className="text-blue-500" href="/administration/admin">
            Administration
        </Link>,
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                Failed to load administration data.
            </div>
        );
    }

    return (
        <div className="w-full h-auto lg:min-h-[calc(100vh-150.39px)] font-sans">
            <MetaHelmet title="Administrations" />
            <div className="p-2 px-4 bg-white">
                {/* Breadcrumbs */}
                <Stack spacing={1}>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        {breadcrumbs}
                    </Breadcrumbs>
                </Stack>

                {/* Title */}
                <div className="relative w-full flex items-center justify-center min-h-20">
                    <img
                        src={assets.wireframe}
                        alt="Background"
                        className="absolute w-full h-full z-0 object-cover"
                    />
                    <h2 className="relative text-blue-700 text-lg sm:text-xl lg:text-2xl xl:text-4xl font-semibold z-10 text-center px-4">
                        Administrations
                    </h2>
                </div>

                {/* Admin List */}
                <div className="p-2 px-4 font-sans">
                    {adminData.map((item, index) => (
                        <div
                            key={index}
                            className="w-full bg-white even:bg-blue-50 h-auto border-blue-900 border-t-2 last:border-b-2 p-2 flex items-center justify-between"
                        >
                            <ImageBadgeCard
                                image={`${
                                    import.meta.env.VITE_BASE_URL
                                }/uploads/${item?.image}`}
                                alt={item?.name}
                                className="w-1/3 lg:w-2/12"
                            />
                            <div className="w-10/12 h-full p-3 pl-5 lg:pl-10">
                                <h1 className="text-royal text-xl lg:text-2xl font-bold">
                                    {item?.name}
                                </h1>
                                <p className="text-xs text-neutral-500 lg:text-base font-semibold mt-2 mb-3 lg:mb-8">
                                    {item?.designation}
                                </p>
                                <CustomButton
                                    handleClick={() =>
                                        navigate(
                                            `/administration/admin/${item?.id}`
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Administration;
