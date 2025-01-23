import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/utils/axiosinstance'; 

// Fetch all news
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/news');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create news
export const createNews = createAsyncThunk(
  'news/createNews',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post('/news', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update news data
export const updateNews = createAsyncThunk(
  'news/updateNews',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/news/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update news image
export const updateNewsImage = createAsyncThunk(
  'news/updateNewsImage',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/news/image/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete news
export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/news/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// News slice
const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.news.push(action.payload);
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        const index = state.news.findIndex((news) => news.id === action.meta.arg.id);
        if (index !== -1) {
          state.news[index] = { ...state.news[index], ...action.payload };
        }
      })
      .addCase(updateNewsImage.fulfilled, (state, action) => {
        const index = state.news.findIndex((news) => news.id === action.meta.arg.id);
        if (index !== -1) {
          state.news[index].image = action.payload.image;
        }
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.news = state.news.filter((news) => news.id !== action.meta.arg);
      });
  },
});

export default newsSlice.reducer;