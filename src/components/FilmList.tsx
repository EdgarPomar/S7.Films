import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilmsThunk, fetchMoreFilmsThunk } from '../features/filmsSlice';
import { RootState, AppDispatch } from '../app/store';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// Importa el tipo Film desde tu slice (ajusta la ruta si es necesario)
import type { Film } from '../features/filmsSlice';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

const FilmList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items: films, loading, error, page } = useSelector((state: RootState) => state.films);

  useEffect(() => {
    dispatch(fetchFilmsThunk());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchMoreFilmsThunk(page + 1));
  };

  if (error) return <Typography align="center">Error: {error}</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {films.map((film: Film) => (
          <Grid key={film.id}>
            <Box
              onClick={() => navigate(`/film/${film.id}`)}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover .overlay': {
                  opacity: 1,
                },
              }}
            >
              <CardMedia
                component="img"
                image={
                  film.poster_path
                    ? `${IMAGE_BASE_URL}${film.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={film.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  p: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="subtitle1">{film.title}</Typography>
                <Typography variant="caption">{film.release_date}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Botón "Ver más" centrado */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoadMore}
          disabled={loading}
          sx={{
            minWidth: '150px',
            backgroundColor: '#032541',
            '&:hover': {
              backgroundColor: '#01192b',
            },
          }}
        >
          {loading ? 'Cargando...' : 'Ver más películas'}
        </Button>
      </Box>

      {loading && (
        <Typography align="center" sx={{ mt: 2 }}>
          Cargando más películas...
        </Typography>
      )}
    </Box>
  );
};

export default FilmList;
