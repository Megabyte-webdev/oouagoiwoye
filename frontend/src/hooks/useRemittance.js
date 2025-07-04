import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // Ensure this is from @tanstack/react-query
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContext";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { extractErrorMessage } from "../utils/formmaters";

const useRemittance = () => {
    const navigate = useNavigate();
    const { authDetails } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const client = axiosClient(authDetails?.token?.token);

    const fetchRemittanceDashboard = () => {
        return useQuery({
            queryKey: ["remit-dashboard"],
            queryFn: async () => {
                const { data } = await client.get("/remittance-dashboard"); // Replace with actual API URL
                return data?.data; // Ensure API returns an array of { id, name }
            },
        });
    };


    // Bank resources
    const fetchBankList = () => {
        return useQuery({
            queryKey: ["bankList"],
            queryFn: async () => {
                const { data } = await client.get("/list-banks"); // Replace with actual API URL
                return data?.data?.banks; // Ensure API returns an array of { id, name }
            },
        });
    };

    const resolveAccount = (accountNo, bankCode) => { 
        return useQuery({
            queryKey: ["resolveAccount", accountNo, bankCode], 
            queryFn: async () => {
                const { data } = await client.get(`/resolve-account?accountNumber=${accountNo}&bankCode=${bankCode}`); 
                return data?.data; 
            },
            enabled: accountNo?.length === 10 && !!bankCode, // Only run query when accountNo is exactly 10 digits & bankCode is present
        });
    };
    
    

    const addBank = useMutation({
        mutationFn: async (details) => {
            const { data } = await client.post(
                `/bank-accounts`, // Adjust the endpoint based on your API
                details, // Event data payload
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            if (!data?.success) {
                throw new Error(data?.message || "Error adding bank account");
            }
            return data.data;
        },
        onSuccess: (newBankAccount) => {
            queryClient.invalidateQueries(["remit-dashboard"]);
            onSuccess({
                message: "Account Added",
                success: "Bank account added successfully!",
            });
            // You can update the bank account list here if needed
        },
        onError: (err) => {
            onFailure({
                message: "Failed to add bank account",
                error: extractErrorMessage(err),
            });
        },
    });
    const updateBank = useMutation({
        mutationFn: async ({details, accountId}) => {
            const { data } = await client.put(
                `/bank-accounts/${accountId}`, // Adjust the endpoint based on your API
                details, // Event data payload
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            if (!data?.success) {
                throw new Error(data?.message || "Error updating bank account");
            }
            return data.data;
        },
        onSuccess: (newBankAccount) => {
            queryClient.invalidateQueries(["remit-dashboard"]);
            onSuccess({
                message: "Account Updated",
                success: "Bank account updated successfully!",
            });
            // You can update the bank account list here if needed
        },
        onError: (err) => {
            onFailure({
                message: "Failed to update bank account",
                error: extractErrorMessage(err),
            });
        },
    });

    const deleteBank = useMutation({
        mutationFn: async (bankId) => {
          const { data } = await client.delete(`/bank-accounts/${bankId}`);
          if (!data?.success) {
            throw new Error(data?.message || "Error deleting bank account");
          }
          return data.data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries(["remit-dashboard"]);
          onSuccess({
            message: "Bank Account Deleted",
            success: "Bank account deleted successfully!",
          });
        },
        onError: (err) => {
          onFailure({
            message: "Failed to delete bank account",
            error: err.message,
          });
        },
      });
    

    return {
        addBank:addBank,
        updateBank:updateBank,
        fetchBankList:fetchBankList,
        deleteBank:deleteBank,
        resolveAccount:resolveAccount,
        getRemittanceDashTools:fetchRemittanceDashboard,
    };
};

export default useRemittance;
