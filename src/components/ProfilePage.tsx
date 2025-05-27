import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();

  // Recuperar info d’usuari del localStorage (simulació)
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 6,
        p: 4,
        bgcolor: '#1e1e1e',
        borderRadius: 2,
        textAlign: 'center',
        color: '#e0e0e0',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Perfil d'usuari
      </Typography>

      {user?.email ? (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Email:</strong> {user.email}
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            Aquí pots mostrar més informació personal, preferències, etc.
          </Typography>

          <Button variant="contained" color="primary" onClick={handleLogout}>
            Tancar sessió
          </Button>
        </>
      ) : (
        <Typography variant="body1">
          No hi ha informació d'usuari. Torna a iniciar sessió.
        </Typography>
      )}
    </Box>
  );
}
