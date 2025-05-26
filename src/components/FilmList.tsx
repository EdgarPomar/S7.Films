import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilmsThunk } from '../features/filmsSlice';
import { RootState, AppDispatch } from '../app/store';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

const FilmList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: films, loading, error } = useSelector((state: RootState) => state.films);

  useEffect(() => {
    dispatch(fetchFilmsThunk());
  }, [dispatch]);

  if (loading) return <Typography align="center">Carregant pel·lícules...</Typography>;
  if (error) return <Typography align="center">Error: {error}</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        justifyContent="center" // 💡 centra los items en el eje horizontal
      >
        {films.map((film) => (
          <Grid
            item
            key={film.id}
            xs={6}
            sm={4}
            md={2.4}
            sx={{ display: 'flex', justifyContent: 'center' }} // 💡 centra cada tarjeta
          >
            <Card sx={{ borderRadius: 2, width: '100%' }}>
              <CardMedia
                component="img"
                image={`${IMAGE_BASE_URL}${film.poster_path}`}
                alt={film.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FilmList;
