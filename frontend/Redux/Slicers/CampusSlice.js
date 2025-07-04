import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/utils/axiosinstance'; 

// Create campus
export const createCampus = createAsyncThunk(
  'campus/createCampus',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post('/campus', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating campus");
    }
  }
);

// Fetch all campuses
export const fetchCampus = createAsyncThunk(
  'campus/fetchCampus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/campus');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update campus contact
export const updateCampusContact = createAsyncThunk(
  'campus/updateCampusContact',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/campus/contact/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update campus image
export const updateCampusImage = createAsyncThunk(
  'campus/updateCampusImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/campus/image/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Upsert campus banner video
export const upsertCampusBannerVideo = createAsyncThunk(
  'campus/upsertCampusBannerVideo',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/campus/banner/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update campus data
export const updateCampusData = createAsyncThunk(
  'campus/updateCampusData',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/campus/data/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create faculty
export const createFaculty = createAsyncThunk(
  'campus/createFaculty',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/campus/faculty/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete campus
export const deleteCampus = createAsyncThunk(
  'campus/deleteCampus',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/campus/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Campus slice
const campusSlice = createSlice({
  name: 'campus',
  initialState: {
    campuses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCampus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCampus.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.campuses)) {
          state.campuses = []; 
        }
        state.campuses.push(action.payload);
      })
      .addCase(createCampus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCampus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampus.fulfilled, (state, action) => {
        state.loading = false;
        state.campuses = Array.isArray(action.payload.data) ? action.payload.data : [];
      })
      .addCase(fetchCampus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCampusContact.fulfilled, (state, action) => {
        if (!Array.isArray(state.campuses)) state.campuses = [];
        const index = state.campuses.findIndex((campus) => campus.id === action.meta.arg.id);
        if (index !== -1) {
          state.campuses[index] = { ...state.campuses[index], ...action.payload };
        }
      })
      .addCase(updateCampusImage.fulfilled, (state, action) => {
        const index = state.campuses.findIndex((campus) => campus.id === action.meta.arg.id);
        if (index !== -1) {
          state.campuses[index] = { ...state.campuses[index], ...action.payload };
        }
      })
      .addCase(upsertCampusBannerVideo.fulfilled, (state, action) => {
        const index = state.campuses.findIndex((campus) => campus.id === action.meta.arg.id);
        if (index !== -1) {
          state.campuses[index] = { ...state.campuses[index], ...action.payload };
        }
      })
      .addCase(updateCampusData.fulfilled, (state, action) => {
        const index = state.campuses.findIndex((campus) => campus.id === action.meta.arg.id);
        if (index !== -1) {
          state.campuses[index] = { ...state.campuses[index], ...action.payload };
        }
      })
      .addCase(createFaculty.fulfilled, (state, action) => {
        const index = state.campuses.findIndex((campus) => campus.id === action.meta.arg.id);
        if (index !== -1) {
          if (!state.campuses[index].faculties) {
            state.campuses[index].faculties = [];
          }
          state.campuses[index].faculties.push(action.payload);
        }
      })
      .addCase(deleteCampus.fulfilled, (state, action) => {
        state.campuses = state.campuses.filter((campus) => campus.id !== action.meta.arg);
      });
  },
});

export default campusSlice.reducer;
