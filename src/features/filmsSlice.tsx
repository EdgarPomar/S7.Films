import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Tipamos la respuesta de la película según lo que devuelve TMDB (ajusta según necesites)
export interface Film {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  // Puedes añadir más campos si los usas
}

interface FilmsState {
  items: Film[];
  loading: boolean;
  error: string | null;
  page: number;
}

const initialState: FilmsState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
};

export const fetchFilmsThunk = createAsyncThunk(
  'films/fetch',
  async () => {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: 'ca',
        page: 1,
      },
    });
    return { results: res.data.results as Film[], page: 1 };
  }
);

export const fetchMoreFilmsThunk = createAsyncThunk(
  'films/fetchMore',
  async (page: number) => {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: 'ca',
        page,
      },
    });
    return { results: res.data.results as Film[], page };
  }
);

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
        state.items = action.payload.results;
        state.page = action.payload.page;
        state.loading = false;
      })
      .addCase(fetchMoreFilmsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoreFilmsThunk.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.results];
        // Alternativamente puedes usar: state.items.push(...action.payload.results);
        state.page = action.payload.page;
        state.loading = false;
      });
  },
});

export default filmsSlice.reducer;
