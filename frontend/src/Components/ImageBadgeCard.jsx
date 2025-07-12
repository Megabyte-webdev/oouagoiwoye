import React from "react";
import { FaUserAlt } from "react-icons/fa";

const ImageBadgeCard = ({
    image,
    alt = "Image",
    className = "w-1/3 lg:w-2/12",
    height = "h-48",
}) => {
    const hasImage = Boolean(image);

    return (
        <div className={`relative overflow-hidden ${className} ${height}`}>
            {/* Angular background */}
            <div className="absolute inset-0 z-0">
                {/* Yellow Triangle */}
                <div
                    className="absolute w-full h-full bg-yellow-400"
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 0 100%)",
                    }}
                />
                {/* Blue Triangle */}
                <div
                    className="absolute w-full h-full bg-blue-600"
                    style={{
                        clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                    }}
                />
            </div>

            {/* Foreground image */}
            <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
                <figure className="w-full h-full">
                    {hasImage ? (
                        <img
                            src={image}
                            alt={alt}
                            className="w-full h-full object-cover object-top rounded-md"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <FaUserAlt className="text-gray-500 text-3xl" />
                        </div>
                    )}
                </figure>
            </div>
        </div>
    );
};

export default ImageBadgeCard;
