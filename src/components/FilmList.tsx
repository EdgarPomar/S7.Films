import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilmsThunk, fetchMoreFilmsThunk } from '../features/filmsSlice';
import { RootState, AppDispatch } from '../app/store';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom'; // 👉 Afegit

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

const FilmList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // 👉 Afegit
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { items: films, loading, error, page } = useSelector((state: RootState) => state.films);

  useEffect(() => {
    dispatch(fetchFilmsThunk());
  }, [dispatch]);

  const lastFilmRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchMoreFilmsThunk(page + 1));
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [dispatch, loading, page]
  );

  if (error) return <Typography align="center">Error: {error}</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {films.map((film, index) => {
          const isLast = index === films.length - 1;
          return (
            <Grid
              item
              key={film.id}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              ref={isLast ? lastFilmRef : null}
            >
              <Box
                onClick={() => navigate(`/film/${film.id}`)} // 👉 Navega a la pàgina de detall
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 2,
                  cursor: 'pointer', // 🖱️ mostra que és clicable
                  '&:hover .overlay': {
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={`${IMAGE_BASE_URL}${film.poster_path}`}
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
          );
        })}
      </Grid>
      {loading && <Typography align="center" sx={{ mt: 2 }}>Carregant més pel·lícules...</Typography>}
    </Box>
  );
};

export default FilmList;
