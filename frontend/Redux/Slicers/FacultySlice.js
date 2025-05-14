import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/utils/axiosinstance'; 

// Fetch all faculties
export const fetchFaculty = createAsyncThunk(
  'faculty/fetchFaculty',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/faculty');
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



// Update faculty data
export const updateFaculty = createAsyncThunk(
  'faculty/updateFaculty',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/faculty/data/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update faculty image
export const updateFacultyImage = createAsyncThunk(
  'faculty/updateFacultyImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/faculty/image/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Upsert faculty banner image
export const upsertBannerImage = createAsyncThunk(
  'faculty/upsertBannerImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/faculty/banner/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update dean image
export const updateDeanImg = createAsyncThunk(
  'faculty/updateDeanImg',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/faculty/dean/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update faculty contact
export const updateFacultyContact = createAsyncThunk(
  'faculty/updateFacultyContact',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/faculty/contact/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create faculty lecturers
export const createFacultyLecturers = createAsyncThunk(
  'faculty/createFacultyLecturers',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/faculty/lecturer/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add department
export const addDepartment = createAsyncThunk(
  'faculty/addDepartment',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/faculty/department/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create or update admission requirements
export const createAdmissionRequirements = createAsyncThunk(
  'faculty/createAdmissionRequirements',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/faculty/admissionReq/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create school fee
export const createSchoolFee = createAsyncThunk(
  'faculty/createSchoolFee',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/faculty/schoolFee/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete faculty
export const deleteFaculty = createAsyncThunk(
  'faculty/deleteFaculty',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/faculty/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Faculty slice
const facultySlice = createSlice({
  name: 'faculty',
  initialState: {
    faculties: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.faculties = action.payload;
      })
      .addCase(fetchFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFaculty.fulfilled, (state, action) => {
        const index = state.faculties.findIndex((faculty) => faculty.id === action.meta.arg.id);
        if (index !== -1) {
          state.faculties[index] = { ...state.faculties[index], ...action.payload };
        }
      })
      .addCase(updateFacultyImage.fulfilled, (state, action) => {
        const index = state.faculties.findIndex((faculty) => faculty.id === action.meta.arg.id);
        if (index !== -1) {
          state.faculties[index] = { ...state.faculties[index], ...action.payload };
        }
      })
      .addCase(upsertBannerImage.fulfilled, (state, action) => {
        const index = state.faculties.findIndex((faculty) => faculty.id === action.meta.arg.id);
        if (index !== -1) {
          state.faculties[index] = { ...state.faculties[index], ...action.payload };
        }
      })
      .addCase(updateDeanImg.fulfilled, (state, action) => {
        const index = state.faculties.findIndex((faculty) => faculty.id === action.meta.arg.id);
        if (index !== -1) {
          state.faculties[index] = { ...state.faculties[index], ...action.payload };
        }
      })
      .addCase(updateFacultyContact.fulfilled, (state, action) => {
        const index = state.faculties.findIndex((faculty) => faculty.id === action.meta.arg.id);
        if (index !== -1) {
          state.faculties[index] = { ...state.faculties[index], ...action.payload };
        }
      })
      .addCase(createFacultyLecturers.fulfilled, (state, action) => {
        const index = state.faculties.findIndex((faculty) => faculty.id === action.meta.arg.id);
        if (index !== -1) {
          state.faculties[index].lecturers = action.payload.lecturers;
        }
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        const index = state.faculties.findIndex((faculty) => faculty.id === action.meta.arg.id);
        if (index !== -1) {
          state.faculties[index].departments = action.payload.departments;
        }
      })
      .addCase(createAdmissionRequirements.fulfilled, (state, action) => {
        const index = state.faculties.findIndex((faculty) => faculty.id === action.meta.arg.id);
        if (index !== -1) {
          state.faculties[index].admissionRequirements = action.payload.admissionRequirements;
        }
      })
      .addCase(createSchoolFee.fulfilled, (state, action) => {
        const index = state.faculties.findIndex((faculty) => faculty.id === action.meta.arg.id);
        if (index !== -1) {
          state.faculties[index].schoolFee = action.payload.schoolFee;
        }
      })
      .addCase(deleteFaculty.fulfilled, (state, action) => {
        state.faculties = state.faculties.filter((faculty) => faculty.id !== action.meta.arg);
      });
  },
});

export default facultySlice.reducer;
