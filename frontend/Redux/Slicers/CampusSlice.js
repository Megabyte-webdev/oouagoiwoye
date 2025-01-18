import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../AxiosInstance/axiosinstance";

// Thunks for API actions
export const fetchCampuses = createAsyncThunk("campus/fetch", async () => {
  const response = await axios.get("/campus");
  return response.data.data;
});

export const createCampus = createAsyncThunk("campus/create", async (formData) => {
  const response = await axios.post("/campus", formData);
  return response.data.data;
});

export const deleteCampus = createAsyncThunk("campus/delete", async (id) => {
  await axios.delete(`/campus/${id}`);
  return id;
});

export const updateCampus = createAsyncThunk("campus/update", async ({ id, data }) => {
  const response = await axios.patch(`/campus/data/${id}`, data);
  return response.data.data;
});

// Slice
const campusSlice = createSlice({
  name: "campus",
  initialState: {
    campuses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampuses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampuses.fulfilled, (state, action) => {
        state.loading = false;
        state.campuses = action.payload;
      })
      .addCase(fetchCampuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCampus.fulfilled, (state, action) => {
        state.campuses.push(action.payload);
      })
      .addCase(deleteCampus.fulfilled, (state, action) => {
        state.campuses = state.campuses.filter((campus) => campus.id !== action.payload);
      })
      .addCase(updateCampus.fulfilled, (state, action) => {
        const index = state.campuses.findIndex((campus) => campus.id === action.payload.id);
        if (index !== -1) {
          state.campuses[index] = action.payload;
        }
      });
  },
});

export default campusSlice.reducer;
