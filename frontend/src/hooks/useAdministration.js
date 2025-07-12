import { useQuery } from "@tanstack/react-query";
import API from "../utils/axiosinstance";
import { onFailure } from "../utils/notifications/OnFailure";
import { extractErrorMessage } from "../utils/formmaters";

/**
 * Custom hook to fetch university administration and principal officers
 */
const useAdministration = () => {
    const useAdminList = useQuery({
        queryKey: ["administration"],
        queryFn: async () => {
            try {
                const { data } = await API.get("/administration");
                return data?.data || [];
            } catch (error) {
                onFailure({
                    message: "Failed to fetch administration list",
                    error: extractErrorMessage(error),
                });
                throw error;
            }
        },
    });

    const usePrincipalOfficers = useQuery({
        queryKey: ["principal-officers"],
        queryFn: async () => {
            try {
                const { data } = await API.get("/principal");
                return data?.data || [];
            } catch (error) {
                onFailure({
                    message: "Failed to fetch principal officers",
                    error: extractErrorMessage(error),
                });
                throw error;
            }
        },
    });

    return { useAdminList, usePrincipalOfficers };
};

export default useAdministration;
