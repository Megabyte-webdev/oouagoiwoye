import React, { useState } from "react";

const TextTruncator = ({ text = "", length = 300 }) => {
    const [isTruncated, setIsTruncated] = useState(true);

    const truncatedText = text?.slice(0, length);

    return (
        <p className="text-xs mt-0 my-2">
            {isTruncated ? truncatedText + "..." : text}
            {/* Uncomment below to allow toggling */}
            {/* 
            <small
                className="cursor-pointer text-sm font-semibold ml-2"
                onClick={() => setIsTruncated(!isTruncated)}
            >
                {isTruncated ? "Read More" : "Read Less"}
            </small> 
            */}
        </p>
    );
};

export default TextTruncator;
