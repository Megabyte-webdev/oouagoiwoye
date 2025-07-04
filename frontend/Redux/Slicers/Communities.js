import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/utils/axiosinstance';

// Fetch all communities
export const fetchCommunities = createAsyncThunk(
  'communities/fetchCommunities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/communities/');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create community
export const createCommunity = createAsyncThunk(
  'communities/createCommunity',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post('/communities/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update community data
export const updateCommunity = createAsyncThunk(
  'communities/updateCommunity',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/communities/data/${id}`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update community image
export const updateCommunityImage = createAsyncThunk(
  'communities/updateCommunityImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/communities/image/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete community
export const deleteCommunity = createAsyncThunk(
  'communities/deleteCommunity',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/communities/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Communities slice
const communitiesSlice = createSlice({
  name: 'communities',
  initialState: {
    communities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCommunity.fulfilled, (state, action) => {
        state.communities.push(action.payload);
      })
      .addCase(updateCommunity.fulfilled, (state, action) => {
        const index = state.communities.findIndex((community) => community.id === action.meta.arg.id);
        if (index !== -1) {
          state.communities[index] = { ...state.communities[index], ...action.payload };
        }
      })
      .addCase(updateCommunityImage.fulfilled, (state, action) => {
        const index = state.communities.findIndex((community) => community.id === action.meta.arg.id);
        if (index !== -1) {
          state.communities[index].image = action.payload.image;
        }
      })
      .addCase(deleteCommunity.fulfilled, (state, action) => {
        state.communities = state.communities.filter((community) => community.id !== action.meta.arg);
      });
  }

});

export default communitiesSlice.reducer;