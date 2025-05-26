import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStarWarsFilms, Film } from '../api/tmdb';

interface FilmsState {
  items: Film[];
  loading: boolean;
  error: string | null;
}

const initialState: FilmsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchFilmsThunk = createAsyncThunk('films/fetchFilms', fetchStarWarsFilms);

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilmsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFilmsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
  },
});

export default filmsSlice.reducer;
