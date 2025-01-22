import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/utils/axiosinstance'; 

// Fetch all departments
export const fetchAllDepartments = createAsyncThunk(
  'department/fetchAllDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Edit department info
export const editDepartment = createAsyncThunk(
  'department/editDepartment',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/data/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Edit department image
export const editDepartmentImage = createAsyncThunk(
  'department/editDepartmentImage',
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

// Delete department
export const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Department slice
const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    departments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchAllDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editDepartment.fulfilled, (state, action) => {
        const index = state.departments.findIndex((department) => department.id === action.meta.arg.id);
        if (index !== -1) {
          state.departments[index] = { ...state.departments[index], ...action.payload };
        }
      })
      .addCase(editDepartmentImage.fulfilled, (state, action) => {
        const index = state.departments.findIndex((department) => department.id === action.meta.arg.id);
        if (index !== -1) {
          state.departments[index] = { ...state.departments[index], ...action.payload };
        }
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.departments = state.departments.filter((department) => department.id !== action.meta.arg);
      });
  },
});

export default departmentSlice.reducer;
