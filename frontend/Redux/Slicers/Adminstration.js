import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/utils/axiosinstance'; 

// Create a member
export const createMember = createAsyncThunk(
  'administration/createMember',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post('/administration', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch all members
export const fetchAllMembers = createAsyncThunk(
  'administration/fetchAllMembers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/administration');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update admin image
export const updateAdminImage = createAsyncThunk(
  'administration/updateAdminImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/administration/image/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update admin data
export const updateAdminData = createAsyncThunk(
  'administration/updateAdminData',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/administration/data/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update responsibilities
export const updateAdminResponsibilities = createAsyncThunk(
  'administration/updateAdminResponsibilities',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/administration/responsibilities/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update admin contact
export const updateAdminContact = createAsyncThunk(
  'administration/updateAdminContact',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/administration/contact/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete admin member
export const deleteAdminMember = createAsyncThunk(
  'administration/deleteAdminMember',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/administration/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Administration slice
const administrationSlice = createSlice({
  name: 'administration',
  initialState: {
    members: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members.push(action.payload);
      })
      .addCase(createMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchAllMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAdminImage.fulfilled, (state, action) => {
        const index = state.members.findIndex((member) => member.id === action.meta.arg.id);
        if (index !== -1) {
          state.members[index] = { ...state.members[index], ...action.payload };
        }
      })
      .addCase(updateAdminData.fulfilled, (state, action) => {
        const index = state.members.findIndex((member) => member.id === action.meta.arg.id);
        if (index !== -1) {
          state.members[index] = { ...state.members[index], ...action.payload };
        }
      })
      .addCase(updateAdminResponsibilities.fulfilled, (state, action) => {
        const index = state.members.findIndex((member) => member.id === action.meta.arg.id);
        if (index !== -1) {
          state.members[index] = { ...state.members[index], ...action.payload };
        }
      })
      .addCase(updateAdminContact.fulfilled, (state, action) => {
        const index = state.members.findIndex((member) => member.id === action.meta.arg.id);
        if (index !== -1) {
          state.members[index] = { ...state.members[index], ...action.payload };
        }
      })
      .addCase(deleteAdminMember.fulfilled, (state, action) => {
        state.members = state.members.filter((member) => member.id !== action.meta.arg);
      });
  },
});

export default administrationSlice.reducer;
