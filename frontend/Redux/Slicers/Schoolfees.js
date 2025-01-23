import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/utils/axiosinstance';

// Fetch all school fees
export const fetchSchoolFees = createAsyncThunk(
  'schoolFees/fetchSchoolFees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/schoolfee');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Edit a school fee
export const editSchoolFee = createAsyncThunk(
  'schoolFees/editSchoolFee',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/schoolfee/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a school fee
export const deleteSchoolFee = createAsyncThunk(
  'schoolFees/deleteSchoolFee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/schoolfee/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// School Fees slice
const schoolFeesSlice = createSlice({
  name: 'schoolFees',
  initialState: {
    fees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchoolFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolFees.fulfilled, (state, action) => {
        state.loading = false;
        state.fees = action.payload;
      })
      .addCase(fetchSchoolFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editSchoolFee.fulfilled, (state, action) => {
        const index = state.fees.findIndex((fee) => fee.id === action.meta.arg.id);
        if (index !== -1) {
          state.fees[index] = { ...state.fees[index], ...action.payload };
        }
      })
      .addCase(deleteSchoolFee.fulfilled, (state, action) => {
        state.fees = state.fees.filter((fee) => fee.id !== action.meta.arg);
      });
  },
});

export default schoolFeesSlice.reducer;
