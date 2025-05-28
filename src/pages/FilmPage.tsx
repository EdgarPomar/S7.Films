import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFilmDetail } from '../api/tmdb';
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { motion } from 'framer-motion';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PROFILE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

export default function FilmPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchFilmDetail(Number(id)).then((data) => {
      setFilm(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          p: 3,
          mt: '2px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={`${IMAGE_BASE_URL}${film.poster_path}`}
          alt={film.title}
          style={{ width: '200px', borderRadius: '10px', marginBottom: '1rem' }}
        />

        <Typography variant="h4" gutterBottom>
          {film.title}
        </Typography>

        {/* Rating + Gèneres */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: '#ffc107', fontWeight: 'bold' }}
          >
            ⭐ {film.vote_average?.toFixed(1)} / 10
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
              mt: 1,
            }}
          >
            {film.genres?.map((genre: any) => (
              <Chip
                key={genre.id}
                label={genre.name}
                variant="outlined"
                size="small"
                sx={{ color: '#fff', borderColor: '#555' }}
              />
            ))}
          </Box>
        </Box>

        <Typography
          variant="body1"
          sx={{ maxWidth: '600px', textAlign: 'center', mb: 4 }}
        >
          {film.overview || 'No hi ha descripció disponible.'}
        </Typography>

        {/* AUTORS */}
        <Typography variant="h6" gutterBottom align="center" sx={{ width: '100%' }}>
          Autors:
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 2,
            width: '100%',
            maxWidth: 1000,
            mb: 4,
          }}
        >
          {film.credits?.crew
            ?.filter((person: any) =>
              ['Director', 'Writer', 'Screenplay', 'Story'].includes(person.job)
            )
            .map((person: any) => (
              <Card
                key={person.id}
                sx={{
                  backgroundColor: '#1e1e1e',
                  color: '#e0e0e0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Avatar
                  src={
                    person.profile_path
                      ? `${PROFILE_BASE_URL}${person.profile_path}`
                      : undefined
                  }
                  sx={{ width: 72, height: 72, mb: 1 }}
                >
                  {!person.profile_path && <PersonIcon />}
                </Avatar>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1">{person.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#aaa' }}>
                    {person.job}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>

        {/* ACTORS */}
        <Typography variant="h6" gutterBottom align="center" sx={{ width: '100%' }}>
          Actors principals:
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 2,
            width: '100%',
            maxWidth: 1000,
          }}
        >
          {film.credits?.cast?.map((actor: any) => (
            <Card
              key={actor.id}
              onClick={() => navigate(`/actor/${actor.id}`)}
              sx={{
                backgroundColor: '#1e1e1e',
                color: '#e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              <Avatar
                src={
                  actor.profile_path
                    ? `${PROFILE_BASE_URL}${actor.profile_path}`
                    : undefined
                }
                sx={{ width: 72, height: 72, mb: 1 }}
              >
                {!actor.profile_path && <PersonIcon />}
              </Avatar>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1">{actor.name}</Typography>
                {actor.character && (
                  <Typography variant="body2" sx={{ color: '#aaa' }}>
                    com {actor.character}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </motion.div>
  );
}
