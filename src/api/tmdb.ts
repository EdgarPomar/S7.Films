import axios from 'axios';

export interface Film {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const COLLECTION_ID = 10; // Star Wars Collection

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ca',
  },
});

export const fetchStarWarsFilms = async (): Promise<Film[]> => {
  const response = await tmdb.get(`/collection/${COLLECTION_ID}`);
  return response.data.parts.map((film: any) => ({
    id: film.id,
    title: film.title,
    release_date: film.release_date,
    poster_path: film.poster_path,
  }));
};
