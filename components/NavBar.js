import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import { Image } from 'mui-image';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function MenuAppBar() {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useAuth();
  const router = useRouter();

  /* const handleChange = (event) => {
    setAuth(event.target.checked);
  }; */

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signMeOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Link href="/" passHref>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 5 }}
            >
              <Image src="/images/navlogo.png" style={{ height: 40, width: 40 }} />
            </IconButton>
          </Link>
          <Link href={`/collection/${user.uid}`} passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
              My Collection
            </Typography>
          </Link>
          <Link href={`/trade/trades/${user.uid}`} passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
              My Trades
            </Typography>
          </Link>
          <Link href="/wishlist" passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
              Wishlist
            </Typography>
          </Link>
          <Link href="/community" passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
              Community
            </Typography>
          </Link>
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
                <Avatar alt={user.displayName} src={user.photoURL} />
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
                <MenuItem className="signOut-btn" onClick={signMeOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
