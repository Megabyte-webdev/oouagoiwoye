import { useQuery } from "@tanstack/react-query";
import API from "../utils/axiosinstance";
import { onFailure } from "../utils/notifications/OnFailure";
import { extractErrorMessage } from "../utils/formmaters";

const useCampus = () => {
    // Fetch all faculties once
    const useFaculties = useQuery({
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

    // Fetch a single faculty by ID using already-cached faculties
    const useFacultyById = (id) => {
        return useQuery({
            queryKey: ["faculty", id],
            enabled: !!id,
            queryFn: async () => {
                if (!useFaculties.data)
                    throw new Error("Faculties not loaded yet");
                const match = useFaculties.data.find(
                    (item) => item.href === id || item.id === id
                );
                if (!match) throw new Error("Faculty not found");
                return match;
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
                    const { data } = await API.get("/lecturers");
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

    const useCampusList = useQuery({
        queryKey: ["campuses"],
        queryFn: async () => {
            try {
                const { data } = await API.get("/campus");
                return data?.data || [];
            } catch (error) {
                onFailure({
                    message: "Failed to fetch campuses",
                    error: extractErrorMessage(error),
                });
                throw error;
            }
        },
    });

    return {
        useFaculties,
        useFacultyById,
        useDepartments,
        useLecturers,
        useCampusList,
    };
};

export default useCampus;
