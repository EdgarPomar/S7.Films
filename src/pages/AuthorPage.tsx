import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAuthorDetails, fetchAuthorMovies } from '../api/tmdb';
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PROFILE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

// Tipado para el autor (ajusta según la respuesta real de la API)
interface Author {
  id: number;
  name: string;
  profile_path: string | null;
  birthday?: string;
  place_of_birth?: string;
  biography?: string;
}

// Tipado para la película (ajusta según la respuesta real de la API)
interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  job?: string;
}

export default function AuthorPage() {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      fetchAuthorDetails(Number(id)),
      fetchAuthorMovies(Number(id))
    ]).then(([authorData, moviesData]) => {
      setAuthor(authorData);
      setMovies(
        (moviesData.crew || []).filter((movie: Movie) =>
          ['Director', 'Writer', 'Screenplay', 'Story'].includes(movie.job || '')
        )
      );
      setLoading(false);
    });
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
          <Avatar
            src={author?.profile_path ? `${PROFILE_BASE_URL}${author.profile_path}` : undefined}
            alt={author?.name}
            sx={{ width: 180, height: 180, borderRadius: 2 }}
          />
          <Box>
            <Typography variant="h3" gutterBottom>{author?.name}</Typography>
            {author?.birthday && (
              <Typography variant="body1" gutterBottom>
                🎂 Data de naixement: {author.birthday}
              </Typography>
            )}
            {author?.place_of_birth && (
              <Typography variant="body1" gutterBottom>
                📍 Lloc de naixement: {author.place_of_birth}
              </Typography>
            )}
            {author?.biography && (
              <Typography variant="body2" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
                {author.biography}
              </Typography>
            )}
          </Box>
        </Box>

        <Typography variant="h5" gutterBottom>
          Pel·lícules relacionades:
        </Typography>

        <Grid container spacing={2}>
          {movies.length === 0 && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No s'han trobat pel·lícules relacionades.
            </Typography>
          )}

          {movies.map((movie: Movie, index: number) => (
            <Grid key={`${movie.id}-${index}`}>
              <Card
                sx={{
                  backgroundColor: '#1e1e1e',
                  color: '#e0e0e0',
                  cursor: 'pointer',
                  ':hover': { boxShadow: 6 },
                }}
                onClick={() => window.location.href = `/film/${movie.id}`}
              >
                <Avatar
                  variant="square"
                  src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : undefined}
                  alt={movie.title || movie.name || ''}
                  sx={{ width: '100%', height: 200, borderRadius: 2 }}
                />
                <CardContent>
                  <Typography variant="subtitle1" noWrap>
                    {movie.title || movie.name}
                  </Typography>
                  {movie.job && (
                    <Chip
                      label={`Rang: ${movie.job}`}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
}
