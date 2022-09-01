import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useAuth();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 5 }}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Link href={`/collection/${user.uid}`} passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Collection
            </Typography>
          </Link>
          <Link href={`/trades/${user.uid}`} passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Trades
            </Typography>
          </Link>
          <Link href="/wishlist" passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Wishlist
            </Typography>
          </Link>
          <Link href="/community" passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Community
            </Typography>
          </Link>

          <FormGroup>
            <FormControlLabel
              control={(
                <Switch
                  checked={auth}
                  onChange={handleChange}
                  aria-label="login switch"
                />
          )}
              label={auth ? 'Logout' : 'Login'}
            />
          </FormGroup>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
