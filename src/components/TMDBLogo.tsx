import React from 'react';
import { Box, Typography } from '@mui/material';

const TMDBLogo: React.FC = () => (
  <Typography
    variant="h6"
    component="div"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <span style={{ color: '#90CEA1', fontWeight: 'bold' }}>TMDB</span>
    <Box
      sx={{
        width: 30,
        height: 16,
        bgcolor: '#01B4E4',
        borderRadius: 2,
        ml: 1,
      }}
    />
  </Typography>
);

export default TMDBLogo;
