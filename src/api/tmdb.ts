import axios from 'axios';

export interface Film {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_URL = 'https://api.themoviedb.org/3';
// const COLLECTION_ID = 10; // Star Wars Collection

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ca',
  },
});

export const fetchStarWarsFilms = async (): Promise<Film[]> => {
  const response = await tmdb.get(`/discover/movie?api_key=${API_KEY}`);
  console.log(response);
  return response.data.results.map((film: any) => ({
    id: film.id,
    title: film.title,
    release_date: film.release_date,
    poster_path: film.poster_path,
  }));
};

export const fetchFilmDetail = async (id: number) => {
  const res = await tmdb.get(`/movie/${id}`, { params: { append_to_response: 'credits' } });
  return res.data;
};

export async function fetchActorDetails(actorId: number) {
  const res = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ca-ES`);
  return res.json();
}

export async function fetchActorMovies(actorId: number) {
  const res = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ca-ES`);
  return res.json();
}
