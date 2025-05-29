import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Film {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const GenrePage: React.FC = () => {
  const { id } = useParams();
  const [films, setFilms] = useState<Film[]>([]);
  const [genreName, setGenreName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilmsByGenre = async () => {
      try {
        const filmRes = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
          params: {
            api_key: API_KEY,
            language: 'ca-ES',
            with_genres: id,
          },
        });
        setFilms(filmRes.data.results);
      } catch (err) {
        console.error('Error carregant pel·lícules:', err);
      }
    };

    const fetchGenreName = async () => {
      try {
        const genreRes = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
          params: {
            api_key: API_KEY,
            language: 'en',
          },
        });
        const genre = genreRes.data.genres.find((g: any) => g.id === parseInt(id ?? '0'));
        setGenreName(genre?.name || '');
      } catch (err) {
        console.error('Error carregant gènere:', err);
      }
    };

    if (id) {
      fetchFilmsByGenre();
      fetchGenreName();
    }
  }, [id]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gènere: {genreName}
      </Typography>

      <Grid container spacing={3}>
        {films.map((film) => (
          <Grid item key={film.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{ bgcolor: '#1c1c1c', color: '#fff' }}
              onClick={() => navigate(`/film/${film.id}`)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    film.poster_path
                      ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                      : '/placeholder.png'
                  }
                  alt={film.title}
                />
                <CardContent>
                  <Typography variant="h6">{film.title}</Typography>
                  <Typography variant="body2" color="gray">
                    {film.release_date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GenrePage;
