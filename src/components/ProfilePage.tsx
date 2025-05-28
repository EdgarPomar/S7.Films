import { Box, Typography, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

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

          {/* Afegir més dades en el futur */}
          <Typography variant="body2" sx={{ color: '#aaa' }}>
            La teva informació personal es mostrarà aquí.
          </Typography>
        </>
      ) : (
        <Typography variant="body1" sx={{ color: '#aaa' }}>
          No hi ha informació d'usuari disponible.
        </Typography>
      )}
    </Box>
  );
}
