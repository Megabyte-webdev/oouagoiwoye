import React from "react";

const PrimarySkeletonLoader = () => {
    return (
        <div className="w-full bg-white even:bg-blue-50 border-blue-900 border-t-2 last:border-b-2 p-2 flex items-center justify-between animate-pulse">
            {/* Left Image Block */}
            <div className="relative bg-gray-300 w-1/3 lg:w-2/12 h-44 flex items-center justify-center"></div>

            {/* Right Info Block */}
            <div className="w-10/12 h-full p-3 pl-5 lg:pl-10 space-y-4">
                <div className="bg-gray-300 h-6 w-3/4 rounded" />
                <div className="bg-gray-300 h-5 w-1/2 rounded" />
                <div className="bg-gray-300 h-10 w-32 rounded-md" />
            </div>
        </div>
    );
};

export default PrimarySkeletonLoader;
