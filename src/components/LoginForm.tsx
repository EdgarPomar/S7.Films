import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Exemple simple validació i "login" fake
    if (email === 'test@test.com' && password === '123456') {
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/profile');
    } else {
      setError('Credencials incorrectes.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 6,
        p: 4,
        bgcolor: '#2c2c2c',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        color: '#e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Inicia sessió
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Email"
        variant="filled"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        sx={{
          input: { color: '#e0e0e0' },
          bgcolor: '#444',
          borderRadius: 1,
        }}
      />

      <TextField
        label="Contrasenya"
        variant="filled"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        sx={{
          input: { color: '#e0e0e0' },
          bgcolor: '#444',
          borderRadius: 1,
        }}
      />

      <Button type="submit" variant="contained" color="primary">
        Entrar
      </Button>

      <Typography align="center" variant="body2" sx={{ mt: 2 }}>
        No tens compte?{' '}
        <Link to="/register" style={{ color: '#90caf9', textDecoration: 'none' }}>
          Registra't
        </Link>
      </Typography>
    </Box>
  );
}
