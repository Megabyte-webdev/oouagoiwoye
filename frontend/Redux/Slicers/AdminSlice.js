import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../src/utils/axiosinstance";

// Thunks for async operations
export const createAdminAccount = createAsyncThunk(
    "admin/createAdminAccount",
    async (adminData, { rejectWithValue }) => {
        try {
            const response = await API.post("/admin/signup", adminData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const loginAdmin = createAsyncThunk(
    "admin/loginAdmin",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await API.post("/admin/login", credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchAllAdmins = createAsyncThunk(
    "admin/fetchAllAdmins",
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get("/admin/");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateAdminDetails = createAsyncThunk(
    "admin/updateAdminDetails",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await API.patch(`/admin/${id}`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteAdminDetails = createAsyncThunk(
    "admin/deleteAdminDetails",
    async (id, { rejectWithValue }) => {
        try {
            await API.delete(`/admin/${id}`);
            return id; // Return the deleted admin ID
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Initial state
const initialState = {
    currentAdmin: null,
    loading: false,
    error: null,
    admins: [],
};

// Slice    
const adminSlice = createSlice({
    name: "admin",
    initialState,
        reducers: {
        logoutAdmin: (state) => {
            state.currentAdmin = null;
        },
        resetAdminState: (state) => {
            state.currentAdmin = null; 
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Admin Account
            .addCase(createAdminAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAdminAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.admins.push(action.payload);
            })
            .addCase(createAdminAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // Login Admin
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.currentAdmin = action.payload;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // Fetch All Admins
            .addCase(fetchAllAdmins.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllAdmins.fulfilled, (state, action) => {
                state.loading = false;
                state.admins = action.payload;
            })
            .addCase(fetchAllAdmins.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // Update Admin Details
            .addCase(updateAdminDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAdminDetails.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.admins.findIndex(
                    (admin) => admin.id === action.payload.id
                );
                if (index !== -1) {
                    state.admins[index] = action.payload;
                }
            })
            .addCase(updateAdminDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            
            // Delete Admin Details
            .addCase(deleteAdminDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAdminDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.admins = state.admins.filter(
                    (admin) => admin.id !== action.payload
                );
            })
            .addCase(deleteAdminDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logoutAdmin, resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;
