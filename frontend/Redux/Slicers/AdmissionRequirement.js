import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/utils/axiosinstance'; 

// Fetch all admission requirements
export const fetchAllRequirements = createAsyncThunk(
  'admissionRequirements/fetchAllRequirements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update admission requirements
export const updateRequirement = createAsyncThunk(
  'admissionRequirements/updateRequirement',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete an admission requirement
export const deleteRequirement = createAsyncThunk(
  'admissionRequirements/deleteRequirement',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Admission Requirements slice
const admissionRequirementsSlice = createSlice({
  name: 'admissionRequirements',
  initialState: {
    requirements: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRequirements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRequirements.fulfilled, (state, action) => {
        state.loading = false;
        state.requirements = action.payload;
      })
      .addCase(fetchAllRequirements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRequirement.fulfilled, (state, action) => {
        const index = state.requirements.findIndex((req) => req.id === action.meta.arg.id);
        if (index !== -1) {
          state.requirements[index] = { ...state.requirements[index], ...action.payload };
        }
      })
      .addCase(deleteRequirement.fulfilled, (state, action) => {
        state.requirements = state.requirements.filter((req) => req.id !== action.meta.arg);
      });
  },
});

export default admissionRequirementsSlice.reducer;
