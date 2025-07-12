import React from "react";
import CustomButton from "./CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "./swipe.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link, useNavigate } from "react-router-dom";
import TextTruncator from "./TextTruncator";

export default function SliderComponent({
    data = [],
    design = "",
    hideBtn = false,
    btnDesc,
    address,
    loading = false,
    error = null,
}) {
    const navigate = useNavigate();

    // Loading state UI
    if (loading) {
        return (
            <div className="flex justify-center items-center h-40 text-blue-700 font-semibold">
                Loading content...
            </div>
        );
    }

    // Error state UI
    if (error) {
        return (
            <div className="flex justify-center items-center h-40 text-red-600 font-semibold">
                {typeof error === "string" ? error : "Something went wrong!"}
            </div>
        );
    }

    // No data fallback
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="flex justify-center items-center h-40 bg-gray-100 text-gray-500 font-medium">
                No items to display.
            </div>
        );
    }

    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={40}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 3, spaceBetween: 50 },
                }}
                navigation
                pagination={{ clickable: true }}
            >
                {data.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        className={`p-5 mb-10 min-h-80 ${
                            design === "department"
                                ? "bg-[#f0f8ff]"
                                : design === "lecturer"
                                ? "bg-[#f8f6f6]"
                                : "bg-[#FFF]"
                        }`}
                    >
                        <img
                            src={`${import.meta.env.VITE_BASE_URL}/${
                                item?.image
                            }`}
                            alt="slide"
                            className="w-full object-cover h-48"
                        />
                        <div>
                            <h2 className="capitalize text-lg lg:text-xl font-semibold my-2 mb-0 text-blue-900">
                                {item?.title}
                            </h2>
                            {item?.designation && (
                                <h2 className="text-sm font-semibold mt-0 my-2 text-blue-600">
                                    {item?.designation}
                                </h2>
                            )}
                            {item?.body && <TextTruncator text={item?.body} />}
                            {item?.author && (
                                <h2 className="text-xs font-medium mt-0 my-2 text-blue-600">
                                    {item?.author}
                                </h2>
                            )}
                            {design === "lecturer" && item?.socials && (
                                <div className="flex gap-3">
                                    {Object.entries(item?.socials).map(
                                        ([key, value], i) => (
                                            <Link
                                                to={value}
                                                key={i}
                                                className={`${
                                                    key === "linkedin"
                                                        ? "bx bxl-linkedin-square text-blue-700 text-3xl"
                                                        : key === "twitter"
                                                        ? "bx bxl-twitter text-blue-700 text-3xl"
                                                        : ""
                                                } cursor-pointer`}
                                            />
                                        )
                                    )}
                                </div>
                            )}
                            {!hideBtn && address && (
                                <CustomButton
                                    handleClick={() => {
                                        navigate(`${address}/${item?.id}`);
                                        scrollTo(0, 0);
                                    }}
                                    text={btnDesc || "Learn More"}
                                />
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
