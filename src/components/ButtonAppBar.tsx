import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TMDBLogo from './TMDBLogo';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { fetchGenres } from '../api/tmdb';

interface Genre {
  id: number;
  name: string;
}

const ButtonAppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [genreAnchorEl, setGenreAnchorEl] = useState<null | HTMLElement>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [nickName, setNickname] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserEmail(session?.user.email ?? null);
      setNickname(session?.user?.user_metadata?.display_name ?? null);
    };

    const loadGenres = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);
    };

    getUser();
    loadGenres();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
      setNickname(session?.user?.user_metadata?.display_name ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleGenreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setGenreAnchorEl(event.currentTarget);
  };

  const handleGenreSelect = (genreId: number) => {
    setGenreAnchorEl(null);
    navigate(`/genre/${genreId}`);
  };

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setGenreAnchorEl(null);
  };

  const handleLogin = () => {
    handleClose();
    navigate('/login');
  };

  const handleRegister = () => {
    handleClose();
    navigate('/register');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = async () => {
    handleClose();
    await supabase.auth.signOut();
    setUserEmail(null);
    setNickname(null);
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#032541' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={handleGenreMenu}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={genreAnchorEl}
            open={Boolean(genreAnchorEl)}
            onClose={handleClose}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} onClick={() => handleGenreSelect(genre.id)}>
                {genre.name}
              </MenuItem>
            ))}
          </Menu>

          <Box sx={{ flexGrow: 1 }}>
            <TMDBLogo />
          </Box>

          {userEmail && nickName && (
            <Typography variant="body1" sx={{ mr: 2 }}>
              {nickName}
            </Typography>
          )}

          <IconButton onClick={handleProfileMenu} color="inherit">
            <Avatar>
              <AccountCircle />
            </Avatar>
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {userEmail
              ? [
                  <MenuItem onClick={handleProfile} key="profile">Perfil</MenuItem>,
                  <MenuItem onClick={handleLogout} key="logout">Tanca sessió</MenuItem>,
                ]
              : [
                  <MenuItem onClick={handleLogin} key="login">Iniciar sessió</MenuItem>,
                  <MenuItem onClick={handleRegister} key="register">Registrar-se</MenuItem>,
                ]
            }
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
