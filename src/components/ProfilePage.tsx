import { Box, Typography, Avatar, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const goToFilms = () => {
    navigate('/films');
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 6,
        p: 4,
        bgcolor: '#121212',
        borderRadius: 3,
        textAlign: 'center',
        color: '#e0e0e0',
        boxShadow: 3,
      }}
    >
      <Avatar
        sx={{
          bgcolor: '#1976d2',
          width: 72,
          height: 72,
          mb: 2,
          mx: 'auto',
        }}
      >
        <AccountCircleIcon sx={{ fontSize: 40 }} />
      </Avatar>

      <Typography variant="h4" gutterBottom>
        Perfil d'usuari
      </Typography>

      {user?.email ? (
        <>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> {user.email}
          </Typography>

          <Typography variant="body2" sx={{ color: '#aaa', mb: 3 }}>
            La teva informació personal es mostrarà aquí.
          </Typography>

          <Button variant="contained" color="primary" onClick={goToFilms}>
            Veure pel·lícules
          </Button>
        </>
      ) : (
        <Typography variant="body1" sx={{ color: '#aaa' }}>
          No hi ha informació d'usuari disponible.
        </Typography>
      )}
    </Box>
  );
}
