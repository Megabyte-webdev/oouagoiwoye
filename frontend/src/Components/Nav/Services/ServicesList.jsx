import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NavContext } from "../useContext";

const ServicesList = ({ value = [], address, headerTitle }) => {
    const navigate = useNavigate();
    const { setMenu, setServices, setFaculty } = useContext(NavContext);

    const displayLimit = 5;
    const showViewMore = value.length > displayLimit;

    // Determine what to display (first 5 or all if less)
    const displayItems = showViewMore ? value.slice(0, displayLimit) : value;

    // Determine label key: support title, name, office, program, etc.
    const getLabel = (item) =>
        item?.title ||
        item?.name ||
        item?.office ||
        item?.program ||
        "Untitled";

    return (
        <div className="flex">
            <div className="w-full">
                <ul className="flex flex-col gap-6 pt-7 max-lg:px-0 max-lg:pt-3.5 font-500">
                    {/* Section Header Link */}
                    {!address.match("faculty") && (
                        <div>
                            <Link
                                to={address}
                                onClick={() => {
                                    setServices(false);
                                    setFaculty(false);
                                    setMenu(false);
                                }}
                                className="font-bold text-blue-800 text-md text-secondaryBlue"
                            >
                                {headerTitle}
                            </Link>
                        </div>
                    )}

                    {/* Items */}
                    {displayItems.map((item, index) => (
                        <NavLink
                            to={`${address}/${item.id}`}
                            key={index}
                            onClick={() => {
                                setMenu(false);
                                setServices(false);
                                setFaculty(false);
                            }}
                            className="[&.active]:font-medium [&.active]:text-blue-900 cursor-pointer font-thin hover:opacity-[.77] w-full"
                        >
                            {getLabel(item)}
                        </NavLink>
                    ))}
                </ul>

                {/* View More Button (for all categories) */}
                {showViewMore && (
                    <button
                        onClick={() => {
                            navigate(address);
                            setMenu(false);
                            setServices(false);
                            setFaculty(false);
                        }}
                        className="mt-5 px-6 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition"
                    >
                        View More
                    </button>
                )}
            </div>
        </div>
    );
};

export default ServicesList;
