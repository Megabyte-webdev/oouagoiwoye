import React from "react";
import { FaUserAlt } from "react-icons/fa";

const ImageBadgeCard = ({
    image,
    alt = "Image",
    badgeColor = "bg-yellow-400",
    containerBg = "bg-blue-600",
    className = "w-1/3 lg:w-2/12",
    height = "h-40", // 👈 default height but can be overridden
}) => {
    const hasImage = Boolean(image);

    return (
        <div
            className={`relative ${containerBg} flex items-center justify-center overflow-hidden shadow-sm ${className}`}
        >
            {/* Decorative Badge */}
            <div
                className={`${badgeColor} w-20 lg:w-32 h-16 lg:h-28 absolute top-0 left-0 z-10 rounded-br-2xl`}
            />

            {/* Image or Placeholder */}
            <figure
                className={`relative z-20 p-2 w-full ${height} flex items-center justify-center`}
            >
                {hasImage ? (
                    <img
                        src={image}
                        alt={alt}
                        className="w-full h-full object-cover rounded-md"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
                        <FaUserAlt className="text-gray-500 text-3xl" />
                    </div>
                )}
            </figure>
        </div>
    );
};

export default ImageBadgeCard;
