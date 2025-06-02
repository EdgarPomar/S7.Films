import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // menys la navbar
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url('/cinema-background.jpg')`, // 🖼 opcional si tens un fons
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#000', // fons negre de reserva
        color: 'white',
        px: 2,        
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          borderRadius: 3,
          color: 'white',
          padding: 2,
          textAlign: 'center',
          maxWidth: 600,
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          🎬 Simulació de Cinema
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Construeix la teva pròpia sala virtual, escull pel·lícules i viu una experiència cinematogràfica des de casa.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleRegister}
        >
          Comença ara
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;
