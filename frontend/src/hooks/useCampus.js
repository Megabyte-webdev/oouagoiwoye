import { useQuery } from "@tanstack/react-query";
import API from "../utils/axiosinstance";
import { onFailure } from "../utils/notifications/OnFailure";
import { extractErrorMessage } from "../utils/formmaters";

const useCampus = () => {
    const useFaculties = () => {
        return useQuery({
            queryKey: ["faculties"],
            queryFn: async () => {
                try {
                    const { data } = await API.get("/faculty");
                    return data?.data || [];
                } catch (error) {
                    onFailure({
                        message: "Failed to fetch faculties",
                        error: extractErrorMessage(error),
                    });
                    throw error;
                }
            },
        });
    };

    const useDepartments = () => {
        return useQuery({
            queryKey: ["departments"],
            queryFn: async () => {
                try {
                    const { data } = await API.get("/departments");
                    return data?.data || [];
                } catch (error) {
                    onFailure({
                        message: "Failed to fetch departments",
                        error: extractErrorMessage(error),
                    });
                    throw error;
                }
            },
        });
    };

    const useLecturers = () => {
        return useQuery({
            queryKey: ["lecturers"],
            queryFn: async () => {
                try {
                    const { data } = await client.get("/lecturers");
                    return data?.data || [];
                } catch (error) {
                    onFailure({
                        message: "Failed to fetch lecturers",
                        error: extractErrorMessage(error),
                    });
                    throw error;
                }
            },
        });
    };
    return { useFaculties, useDepartments, useLecturers };
};

export default useCampus;
