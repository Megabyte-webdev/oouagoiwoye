import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api'; // Import your Axios instance

// Create a program in continuous education
export const createProgram = createAsyncThunk(
  'continuousEducation/createProgram',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post('/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch all programs
export const fetchAllPrograms = createAsyncThunk(
  'continuousEducation/fetchAllPrograms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update continuous education data
export const updateCEdata = createAsyncThunk(
  'continuousEducation/updateCEdata',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/data/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update continuous education image
export const updateCEImage = createAsyncThunk(
  'continuousEducation/updateCEImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/image/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a continuous education program
export const deleteCE = createAsyncThunk(
  'continuousEducation/deleteCE',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Continuous Education slice
const continuousEducationSlice = createSlice({
  name: 'continuousEducation',
  initialState: {
    programs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.programs.push(action.payload);
      })
      .addCase(createProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = action.payload;
      })
      .addCase(fetchAllPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCEdata.fulfilled, (state, action) => {
        const index = state.programs.findIndex((program) => program.id === action.meta.arg.id);
        if (index !== -1) {
          state.programs[index] = { ...state.programs[index], ...action.payload };
        }
      })
      .addCase(updateCEImage.fulfilled, (state, action) => {
        const index = state.programs.findIndex((program) => program.id === action.meta.arg.id);
        if (index !== -1) {
          state.programs[index] = { ...state.programs[index], ...action.payload };
        }
      })
      .addCase(deleteCE.fulfilled, (state, action) => {
        state.programs = state.programs.filter((program) => program.id !== action.meta.arg);
      });
  },
});

export default continuousEducationSlice.reducer;
