import navListJson from "../../Json/navlist.json";
import { FaCaretDown, FaCaretUp, FaAsterisk } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { NavContext } from "./useContext";
import { useContext } from "react";
import ServicesList from "./Services/ServicesList";
import { facultyData } from "../../Data/faculty";

const Faculty = () => {
    const {
        setMenu,
        setAbout,
        setAdministration,
        faculty,
        setAdmission,
        setServices,
        setFaculty,
        setLogin,
    } = useContext(NavContext);

    const toggleBtn = () => {
        setAbout(false);
        setAdministration(false);
        setFaculty(!faculty);
        setServices(false);
        setLogin(false);
        setAdmission(false);
    };
    return (
        <div className="max-lg:w-full">
            <li
                className={`group flex flex-col items-center relative max-lg:items-start max-lg:px-0 max-lg:w-full`}
            >
                <div
                    className="flex gap-1 items-center max-lg:justify-between max-lg:px-8 max-lg:w-full max-md:px-7 max-lg:border-b-2 max-lg:py-7 z-[22]"
                    onClick={toggleBtn}
                >
                    <div className="max-lg:w-full max-lg:flex max-lg:gap-2 max-lg:items-center cursor-pointer">
                        <div className="lg:hidden">
                            <FaAsterisk />
                        </div>
                        <h1>Faculties</h1>
                    </div>
                    <div>{faculty ? <FaCaretUp /> : <FaCaretDown />}</div>
                </div>

                {faculty && (
                    <div
                        className={`bg-white text-[#010035]  font-light z-50 py-8 text-md absolute px-8 left-[50%] translate-x-[-50%] top-[55px] group-hover:block max-lg:top-[0%] max-lg:left-[0%] max-lg:translate-x-[0%] max-lg:translate-y-[0%] max-lg:static max-lg:py-0 min-w-80`}
                    >
                        <div className="hidden lg:block w-5 h-5 -rotate-45 bg-white absolute -top-2 right-1/2 translate-x-1/2 " />
                        <div className="flex gap-2 items-center pb-3 border-b-[3px] w-full max-lg:hidden">
                            <div>
                                <FaAsterisk />
                            </div>
                            <Link
                                to="/services/faculty"
                                onClick={() => {
                                    setMenu(false);
                                    setFaculty(false);
                                }}
                                className="text-xl font-bold"
                            >
                                Faculties
                            </Link>
                        </div>

                        <div>
                            <ServicesList
                                headerTitle="Faculties"
                                address="services/faculty"
                                value={facultyData?.items.slice(
                                    0,
                                    Math.round(facultyData?.items.length / 2)
                                )}
                            />
                        </div>
                    </div>
                )}
            </li>
        </div>
    );
};

export default Faculty;
