import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Anime, SearchResponse } from '../types/anime';
import { searchAnime, getAnimeById } from '../services/api';

interface AnimeState {
  searchResults: Anime[];
  currentAnime: Anime | null;
  isLoading: boolean;
  isLoadingDetail: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

const initialState: AnimeState = {
  searchResults: [],
  currentAnime: null,
  isLoading: false,
  isLoadingDetail: false,
  error: null,
  searchQuery: '',
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
};

// 🔁 Helper function: Retry with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 5,
  delay = 500 // start delay (ms)
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;

    // exponential backoff
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
}

export const fetchAnimeSearch = createAsyncThunk(
  'anime/fetchSearch',
  async (
    { query, page }: { query: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      // 🔁 Use retryWithBackoff wrapper
      const response: SearchResponse = await retryWithBackoff(
        () => searchAnime(query, page),
        5, // max retries
        500 // initial delay (ms)
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchAnimeDetail = createAsyncThunk(
  'anime/fetchDetail',
  async (id: number, { rejectWithValue }) => {
    try {
      // 🔁 Use retryWithBackoff wrapper
      const anime = await retryWithBackoff(
        () => getAnimeById(id),
        5, // max retries
        500 // initial delay (ms)
      );
      return anime;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.hasNextPage = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔍 Search Anime
      .addCase(fetchAnimeSearch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnimeSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
        state.currentPage = action.payload.pagination.current_page;
        state.totalPages = action.payload.pagination.last_visible_page;
        state.hasNextPage = action.payload.pagination.has_next_page;
      })
      .addCase(fetchAnimeSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // 📄 Detail Anime
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.isLoadingDetail = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.currentAnime = action.payload;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.isLoadingDetail = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, clearSearchResults, clearError } =
  animeSlice.actions;
export default animeSlice.reducer;
