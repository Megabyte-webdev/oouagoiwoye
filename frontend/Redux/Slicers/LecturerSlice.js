import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/utils/axiosinstance';

// Fetch all lecturers
export const fetchLecturers = createAsyncThunk(
  'lecturers/fetchLecturers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/lecturer');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update lecturer info
export const editLecturers = createAsyncThunk(
  'lecturers/editLecturers',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/lecturer/data/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update lecturer image
export const editLecturerImage = createAsyncThunk(
  'lecturers/editLecturerImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/lecturer/image/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete lecturer
export const deleteLecturer = createAsyncThunk(
  'lecturers/deleteLecturer',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/lecturer/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Lecturers slice
const lecturersSlice = createSlice({
  name: 'lecturers',
  initialState: {
    lecturers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLecturers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLecturers.fulfilled, (state, action) => {
        state.loading = false;
        state.lecturers = action.payload;
      })
      .addCase(fetchLecturers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editLecturers.fulfilled, (state, action) => {
        const index = state.lecturers.findIndex((lecturer) => lecturer.id === action.meta.arg.id);
        if (index !== -1) {
          state.lecturers[index] = { ...state.lecturers[index], ...action.payload };
        }
      })
      .addCase(editLecturerImage.fulfilled, (state, action) => {
        const index = state.lecturers.findIndex((lecturer) => lecturer.id === action.meta.arg.id);
        if (index !== -1) {
          state.lecturers[index] = { ...state.lecturers[index], ...action.payload };
        }
      })
      .addCase(deleteLecturer.fulfilled, (state, action) => {
        state.lecturers = state.lecturers.filter((lecturer) => lecturer.id !== action.meta.arg);
      });
  },
});

export default lecturersSlice.reducer;
