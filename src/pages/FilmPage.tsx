import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFilmDetail } from '../api/tmdb';
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { motion } from 'framer-motion';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PROFILE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

export default function FilmPage() {
  const { id } = useParams();
  const [film, setFilm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilmDetail(Number(id)).then((data) => {
      setFilm(data);
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
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={`${IMAGE_BASE_URL}${film.poster_path}`}
          alt={film.title}
          style={{ width: '200px', borderRadius: '10px', marginBottom: '1rem' }}
        />

        <Typography variant="h4" gutterBottom>{film.title}</Typography>

        <Typography variant="body1" sx={{ maxWidth: '600px', textAlign: 'center', mb: 2 }}>
          {film.overview || 'No hi ha descripció disponible.'}
        </Typography>

        {/* Fitxes autors */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Autors:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
            mt: 2,
          }}
        >
          {film.credits?.crew
            ?.filter((person: any) =>
              ['Director', 'Writer', 'Screenplay', 'Story'].includes(person.job)
            )
            .map((person: any) => (
              <Box
                key={person.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#1e1e1e',
                  borderRadius: 2,
                  padding: 1.5,
                  boxShadow: 1,
                  minWidth: 240,
                  maxWidth: 280,
                }}
              >
                <Avatar
                  src={
                    person.profile_path
                      ? `${PROFILE_BASE_URL}${person.profile_path}`
                      : undefined
                  }
                  sx={{ width: 56, height: 56, mr: 2 }}
                >
                  {!person.profile_path && <PersonIcon />}
                </Avatar>
                <Box>
                  <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                    {person.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#aaa' }}>
                    {person.job}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>

        {/* Fitxes actors */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Actors principals:
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
            mt: 2,
          }}
        >
          {film.credits?.cast?.map((actor: any) => (
            <Box
              key={actor.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#1e1e1e',
                borderRadius: 2,
                padding: 1.5,
                boxShadow: 1,
                minWidth: 240,
                maxWidth: 280,
              }}
            >
              <Avatar
                src={
                  actor.profile_path
                    ? `${PROFILE_BASE_URL}${actor.profile_path}`
                    : undefined
                }
                sx={{ width: 56, height: 56, mr: 2 }}
              >
                {!actor.profile_path && <PersonIcon />}
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  {actor.name}
                </Typography>
                {actor.character && (
                  <Typography variant="body2" sx={{ color: '#aaa' }}>
                    com {actor.character}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </motion.div>
  );
}
