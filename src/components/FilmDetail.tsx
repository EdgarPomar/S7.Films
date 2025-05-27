import React from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PROFILE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

interface FilmDetailsProps {
  film: any;
}

const FilmDetails: React.FC<FilmDetailsProps> = ({ film }) => {
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
          {film.overview}
        </Typography>

        <Typography variant="h6" gutterBottom>Actors principals:</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          {film.credits?.cast?.map((actor: any) => (
            <Chip
              key={actor.id}
              avatar={<Avatar src={`${PROFILE_BASE_URL}${actor.profile_path}`} />}
              label={actor.name}
              variant="outlined"
            />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};

export default FilmDetails;
