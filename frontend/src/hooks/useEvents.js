import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // Ensure this is from @tanstack/react-query
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContext";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { extractErrorMessage } from "../utils/formmaters";
const useEvents = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { authDetails, updateAuth } = useContext(AuthContext);
    const userId = authDetails?.user?.id;
    const client = axiosClient(authDetails?.token?.token);
    const createEvent = useMutation({
        mutationFn: async (eventData) => {
            const { data } = await client.post(
                `/event`, // Adjust the endpoint based on your API
                eventData, // Event data payload
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (!data?.success) {
                throw new Error(data?.message || "Error creating event");
            }
            return data.data;
        },
        onSuccess: (newEvent) => {
            navigate("/promoter/events")
            onSuccess({
                message: "Event Created",
                success: "Event created successfully!",
            });
            // You can update the event list here if needed
        },
        onError: (err) => {
            onFailure({
                message: "Failed to create event",
                error: extractErrorMessage(err),
            });
        },
    });

    const updateEvent = useMutation({
        mutationFn: async ({ eventId, formData }) => {
            const { data } = await client.put(
                `/event/${eventId}`, // Adjust the endpoint based on your API
                formData, // Event data payload
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (!data?.success) {
                throw new Error(data?.message || "Error updating event");
            }
            return data.data;
        },
        onSuccess: (newEvent) => {
            navigate("/promoter/events")
            onSuccess({
                message: "Event Updated",
                success: "Event updated successfully!",
            });
            // You can update the event list here if needed
        },
        onError: (err) => {
            onFailure({
                message: "Failed to update event",
                error: extractErrorMessage(err),
            });
        },
    });

    const saveTicket = useMutation({
        mutationFn: async (ticket) => {
            const isEdit = !!ticket?.id;
            const endpoint = isEdit ? `/tickets/${ticket.id}` : `/tickets`;
            const method = isEdit ? client.put : client.post;
    
            const { data } = await method(endpoint, ticket);
    
            if (!data?.success) {
                throw new Error(data?.message || "Error saving ticket");
            }
            return data.data; // This is what onSuccess receives as the first argument
        },
        onSuccess: (savedTicket, variables) => {
            const eventId = savedTicket?.eventId;
    
            if (eventId) {
                queryClient.invalidateQueries(["event", eventId]);
            }
    
            onSuccess({
                message: variables?.id ? "Ticket Updated" : "Ticket Created",
                success: variables?.id ? "Ticket updated successfully!" : "Ticket created successfully!",
            });
        },
        onError: (err) => {
            onFailure({
                message: "Failed to save ticket",
                error: extractErrorMessage(err),
            });
        },
    });
    
    



    const useEventCategories = () => {
        return useQuery({
            queryKey: ["eventCategories"],
            queryFn: async () => {
                const { data } = await client.get("/event-category"); // Replace with actual API URL
                return data?.data; // Ensure API returns an array of { id, name }
            },
        });
    };
    const fetchEvents = () => {
        return useQuery({
            queryKey: ["events"],
            queryFn: async () => {
                const { data } = await client.get("/event"); // Replace with actual API URL
                return data?.data; // Ensure API returns an array of { id, name }
            },
        });
    };

    const fetchEventById = (eventId) => {
        return useQuery({
            queryKey: ["event", eventId],
            queryFn: async () => {
                const { data } = await client.get(`/event/${eventId}?with_tickets=true`); // Replace with actual API URL
                return data?.data; // Ensure API returns an array of { id, name }
            },
            enabled: !!eventId
        });
    };

    const fetchTicketTypes = () => {
        return useQuery({
            queryKey: ["ticketTypes"],
            queryFn: async () => {
                const { data } = await client.get("/ticket-types"); // Replace with actual API URL
                return data?.data; // Ensure API returns an array of { id, name }
            },
        });
    };

    const fetchPromoterEvents = () => {
        if (!userId) return;
        return useQuery({
            queryKey: ["events", userId],
            queryFn: async () => {
                const { data } = await client.get(`/promoter-event/${userId}`); // Replace with actual API URL
                return data?.data; // Ensure API returns an array of { id, name }
            },
        });
    };

    const deleteEvent = useMutation({
        mutationFn: async (eventId) => {
            const { data } = await client.delete(`/event/${eventId}?hard=true`);
            if (!data?.success) {
                throw new Error(data?.message || "Error deleting event");
            }
            return data.data;
        },
        onSuccess: () => {
            
            navigate("/promoter/events")
            onSuccess({
                message: "Event Deleted",
                success: "Event deleted successfully!",
            });
        },
        onError: (err) => {
            onFailure({
                message: "Failed to delete event",
                error: extractErrorMessage(err),
            });
        },
    });

    const deleteTicket = useMutation({
        mutationFn: async ({ ticketID, eventID }) => {
            const { data } = await client.delete(`/tickets/${ticketID}`);

            if (!data?.success) {
                throw new Error(data?.message || "Error deleting ticket");
            }

            return { success: data.success, eventID }; // ✅ Return eventId for invalidation
        },
        onSuccess: (_, variables) => {  // ✅ Use variables to get eventId
            queryClient.invalidateQueries(["event", variables.eventID]); // ✅ Correct cache invalidation
            onSuccess({
                message: "Ticket Deleted",
                success: "Ticket deleted successfully!",
            });
        },
        onError: (err) => {
            onFailure({
                message: "Failed to delete ticket",
                error: extractErrorMessage(err),
            });
        },
    });



    // Check if any mutation is loading
    const isLoading = {
        createEvent: createEvent.isPending,
        updateEvent: updateEvent.isPending,
        saveTicket: saveTicket.isPending,
        deleteEvent: deleteEvent.isPending,
        deleteTicket: deleteTicket.isPending,
        overall:
            createEvent.isPending ||
            updateEvent.isPending ||
            saveTicket.isPending ||
            deleteEvent.isPending

    };

    return {
        createEvent: createEvent.mutate,
        updateEvent: updateEvent.mutate,
        saveTicket: saveTicket.mutateAsync,
        deleteTicket: deleteTicket.mutate,
        getTicketTypes: fetchTicketTypes,
        getEventCategories: useEventCategories,
        getEvents: fetchEvents,
        getEventById: fetchEventById,
        getPromoterEvents: fetchPromoterEvents,
        deleteEvent: deleteEvent.mutate, // Add deleteEvent here
        isLoading,
    };
};

export default useEvents;
