import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/utils/axiosinstance'; 

// Fetch all directorates
export const fetchDirectorates = createAsyncThunk(
  'directorates/fetchDirectorates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/directorates');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create directorate member
export const createDirectorateMember = createAsyncThunk(
  'directorates/createDirectorateMember',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post('/directorates', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update directorates image
export const updateDirectoratesImage = createAsyncThunk(
  'directorates/updateDirectoratesImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/directorates/image/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update directorates data
export const updateDirectoratesData = createAsyncThunk(
  'directorates/updateDirectoratesData',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/directorates/data/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete directorates data
export const deleteDirectoratesData = createAsyncThunk(
  'directorates/deleteDirectoratesData',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/directorates/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Directorate slice
const directorateSlice = createSlice({
  name: 'directorates',
  initialState: {
    directorates: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectorates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDirectorates.fulfilled, (state, action) => {
        state.loading = false;
        state.directorates = action.payload;
      })
      .addCase(fetchDirectorates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDirectorateMember.fulfilled, (state, action) => {
        state.directorates.push(action.payload);
      })
      .addCase(updateDirectoratesImage.fulfilled, (state, action) => {
        const index = state.directorates.findIndex((directorate) => directorate.id === action.meta.arg.id);
        if (index !== -1) {
          state.directorates[index] = { ...state.directorates[index], ...action.payload };
        }
      })
      .addCase(updateDirectoratesData.fulfilled, (state, action) => {
        const index = state.directorates.findIndex((directorate) => directorate.id === action.meta.arg.id);
        if (index !== -1) {
          state.directorates[index] = { ...state.directorates[index], ...action.payload };
        }
      })
      .addCase(deleteDirectoratesData.fulfilled, (state, action) => {
        state.directorates = state.directorates.filter((directorate) => directorate.id !== action.meta.arg);
      });
  },
});

export default directorateSlice.reducer;
