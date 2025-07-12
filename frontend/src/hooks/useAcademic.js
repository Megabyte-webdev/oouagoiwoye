import { useQuery } from "@tanstack/react-query";
import API from "../utils/axiosinstance";
import { onFailure } from "../utils/notifications/OnFailure";
import { extractErrorMessage } from "../utils/formmaters";

/**
 * Custom hook to fetch university administration and principal officers
 */
const useAcademic = () => {
    const useEducation = useQuery({
        queryKey: ["continuing-education"],
        queryFn: async () => {
            try {
                const { data } = await API.get("/ceducation");
                return data?.data || [];
            } catch (error) {
                throw error;
            }
        },
    });

    const useDirectorate = useQuery({
        queryKey: ["directorates"],
        queryFn: async () => {
            try {
                const { data } = await API.get("/directorates");
                return data?.data || [];
            } catch (error) {
                throw error;
            }
        },
    });

    return { useEducation, useDirectorate };
};

export default useAcademic;
