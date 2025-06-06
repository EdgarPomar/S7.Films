import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../api/supabaseClient'; // 👈 importa Supabase

export default function RegisterPage() {
  const navigate = useNavigate();
  const [nickName, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('El correu no és vàlid.');
      return;
    }
    if (password.length < 6) {
      setError('La contrasenya ha de tenir almenys 6 caràcters.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('Les contrasenyes no coincideixen.');
      return;
    }

    if (!nickName || nickName.trim() === "") {
      setError('Inserta el nickname de tu usuario.');
      return;
    }
    // 👉 Registro real con Supabase
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: nickName,
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      setError('');
      setSuccess('Registre completat! Comprova el teu correu electrònic.');
      setTimeout(() => navigate('/login'), 3000);
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
        Registra't
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

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

      <TextField
        label="Confirma contrasenya"
        variant="filled"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        required
        fullWidth
        sx={{
          input: { color: '#e0e0e0' },
          bgcolor: '#444',
          borderRadius: 1,
        }}
      />

      <TextField
        label="Inserta el nick del usuario"
        variant="filled"
        type="text"
        value={nickName}
        onChange={(e) => setNickname(e.target.value)}
        required
        fullWidth
        sx={{
          input: { color: '#e0e0e0' },
          bgcolor: '#444',
          borderRadius: 1,
        }}
      />

      <Button type="submit" variant="contained" color="primary">
        Registrar
      </Button>

      <Typography align="center" variant="body2" sx={{ mt: 2 }}>
        Ja tens compte?{' '}
        <Link to="/login" style={{ color: '#90caf9', textDecoration: 'none' }}>
          Inicia sessió
        </Link>
      </Typography>
    </Box>
  );
}
