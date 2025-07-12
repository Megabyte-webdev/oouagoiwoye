import { useContext } from "react";
import { FaCaretDown, FaCaretUp, FaAsterisk } from "react-icons/fa";
import AdministrationList from "./Administration/AdminsitrationList";
import { NavContext } from "./useContext";
import useAdministration from "../../hooks/useAdministration";

const Administration = () => {
    const {
        setAbout,
        administration,
        setAdministration,
        setAdmission,
        setServices,
        setFaculty,
        setLogin,
    } = useContext(NavContext);

    const { useAdminList, usePrincipalOfficers } = useAdministration();
    const { data: adminData, isLoading: adminLoading } = useAdminList;
    const { data: principalData, isLoading: principalLoading } =
        usePrincipalOfficers;

    const toggleBtn = () => {
        setAbout(false);
        setAdministration(!administration);
        setAdmission(false);
        setFaculty(false);
        setServices(false);
        setLogin(false);
    };

    return (
        <div className="max-lg:w-full">
            <div
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
                        <h1>Administration</h1>
                    </div>
                    <div>
                        {administration ? <FaCaretUp /> : <FaCaretDown />}
                    </div>
                </div>

                {administration && (
                    <div className="max-lg:w-full max-lg:overflow-scroll">
                        <div className="w-[400%] bg-white text-[#010035] font-light z-50 py-8 text-md absolute px-8 left-[50%] translate-x-[-50%] top-[55px] group-hover:block max-lg:top-[0%] max-lg:left-[0%] max-lg:translate-x-[0%] max-lg:translate-y-[0%] max-lg:static max-lg:py-0 max-lg:w-[100%]">
                            <div className="hidden lg:block w-5 h-5 -rotate-45 bg-white absolute -top-2 right-1/2 translate-x-1/2" />
                            <div className="w-full max-lg:hidden flex gap-2 items-center pb-3 border-b-[3px]">
                                <div>
                                    <FaAsterisk />
                                </div>
                                <h1 className="text-xl font-bold">
                                    Administration
                                </h1>
                            </div>
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                                <AdministrationList
                                    value={adminLoading ? [] : adminData}
                                    address="administration/admin"
                                    headerTitle="Administrations"
                                />
                                <AdministrationList
                                    value={
                                        principalLoading ? [] : principalData
                                    }
                                    address="administration/principal-officers"
                                    headerTitle="Principal Officers"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Administration;
