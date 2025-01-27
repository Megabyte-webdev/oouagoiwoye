import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/utils/axiosinstance'; 

// Fetch all principal officers
export const fetchPrincipalOfficers = createAsyncThunk(
  'principalOfficers/fetchPrincipalOfficers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/principal');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a principal officer
export const createPrincipalOfficer = createAsyncThunk(
  'principalOfficers/createPrincipalOfficer',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post('/principal', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update principal officer data
export const updatePrincipalOfficerData = createAsyncThunk(
  'principalOfficers/updatePrincipalOfficerData',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/principal/data/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update principal officer image
export const updatePrincipalOfficerImage = createAsyncThunk(
  'principalOfficers/updatePrincipalOfficerImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/principal/image/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a principal officer
export const deletePrincipalOfficer = createAsyncThunk(
  'principalOfficers/deletePrincipalOfficer',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/principal/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Principal Officers slice
const principalOfficersSlice = createSlice({
  name: 'principalOfficers',
  initialState: {
    officers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrincipalOfficers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrincipalOfficers.fulfilled, (state, action) => {
        state.loading = false;
        state.officers = action.payload;
      })
      .addCase(fetchPrincipalOfficers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPrincipalOfficer.fulfilled, (state, action) => {
        state.officers.push(action.payload);
      })
      .addCase(updatePrincipalOfficerData.fulfilled, (state, action) => {
        const index = state.officers.findIndex((officer) => officer.id === action.meta.arg.id);
        if (index !== -1) {
          state.officers[index] = { ...state.officers[index], ...action.payload };
        }
      })
      .addCase(updatePrincipalOfficerImage.fulfilled, (state, action) => {
        const index = state.officers.findIndex((officer) => officer.id === action.meta.arg.id);
        if (index !== -1) {
          state.officers[index].image = action.payload.image;
        }
      })
      .addCase(deletePrincipalOfficer.fulfilled, (state, action) => {
        state.officers = state.officers.filter((officer) => officer.id !== action.meta.arg);
      });
  },
});

export default principalOfficersSlice.reducer;