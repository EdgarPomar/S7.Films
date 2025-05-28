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


const ButtonAppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  // Comprovar si hi ha usuari actiu
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserEmail(session?.user.email ?? null);
    };
    getUser();

    // Escoltar canvis en sessió (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <TMDBLogo />
          </Box>

          {userEmail && (
            <Typography variant="body1" sx={{ mr: 2 }}>
              {userEmail}
            </Typography>
          )}

          <IconButton onClick={handleMenu} color="inherit">
            <Avatar>
              <AccountCircle />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {userEmail ? (
              <>
                <MenuItem onClick={handleProfile}>Perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Tanca sessió</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleLogin}>Iniciar sessió</MenuItem>
                <MenuItem onClick={handleRegister}>Registrar-se</MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
