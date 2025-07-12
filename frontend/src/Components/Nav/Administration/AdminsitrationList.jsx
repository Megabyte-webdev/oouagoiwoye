import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavContext } from "../useContext";

const AdministrationList = ({ value = [], address, headerTitle }) => {
    const navigate = useNavigate();
    const { setMenu, setAdministration } = useContext(NavContext);

    const visibleItems = value.slice(0, 5);

    return (
        <div className="flex">
            <div className="w-full">
                <ul className="flex flex-col gap-6 pt-7 max-lg:px-0 max-lg:pt-3.5 font-500">
                    <div>
                        <Link
                            to={address}
                            onClick={() => {
                                setMenu(false);
                                setAdministration(false);
                            }}
                            className="font-bold text-blue-800 text-md text-secondaryBlue"
                        >
                            {headerTitle}
                        </Link>
                    </div>

                    {visibleItems.map(({ name, id }, index) => (
                        <NavLink
                            to={`${address}/${id}`}
                            onClick={() => {
                                setMenu(false);
                                setAdministration(false);
                            }}
                            className="[&.active]:font-medium [&.active]:text-blue-900 cursor-pointer font-thin hover:opacity-[.77] w-full"
                            key={index}
                        >
                            {name}
                        </NavLink>
                    ))}

                    {value.length > 5 && (
                        <button
                            onClick={() => {
                                setMenu(false);
                                setAdministration(false);
                                navigate(address);
                            }}
                            className="mt-5 px-6 py-2 bg-blue-700 text-sm self-start text-white font-semibold rounded-md hover:bg-blue-800 transition"
                        >
                            See All
                        </button>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdministrationList;
