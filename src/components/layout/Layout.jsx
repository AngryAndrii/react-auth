import {
  Box,
  List,
  Button,
  AppBar,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../helpers/authContext';
import useSignOut from '../../hooks/signout';
import StyledLayout from '../layout/layout.styled';
import logo from '../../assets/logo.svg';
import useRedirect from '../../hooks/useRedirect';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const pagesForNotLoginedUser = [
  { label: 'Home', path: '/' },
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
];

const pagesForLoginedUser = [
  { label: 'Home', path: '/' },
  { label: 'Profile', path: '/profile' },
];

function Layout() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [pages, setPages] = useState(pagesForNotLoginedUser);
  const { user, loading } = useAuth();
  const handleSignOut = useSignOut();
  const handleLogin = useRedirect();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    if (user) {
      setPages(pagesForLoginedUser);
    } else {
      setPages(pagesForNotLoginedUser);
    }
  }, [user]);

  if (loading) return <div>Завантаження...</div>;

  return (
    <StyledLayout>
      <AppBar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '5px 25px',
          backgroundColor: 'primary.light',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', columnGap: '20px' }}>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <NavLink className={'page-link'} to='/'>
            <img src={logo} alt='Логотип' />
          </NavLink>

          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {pages.map(({ label, path }) => (
              <MenuItem key={label} onClick={handleCloseNavMenu}>
                <NavLink to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography textAlign='center'>{label}</Typography>
                </NavLink>
              </MenuItem>
            ))}
          </Menu>

          <List
            sx={{
              flexDirection: 'row',
              columnGap: '10px',
              color: 'secondary.dark',
              textDecoration: 'none',
              alignItems: 'flex-end',
              padding: 0,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.map(({ label, path }) => (
              <ListItem disablePadding>
                <NavLink to={path} className={'page-link'}>
                  <Typography textAlign='center'>{label}</Typography>
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
        {/* <nav>
            <List
              sx={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '10px',
                color: 'primary.text',
                textDecoration: 'none',
                alignItems: 'flex-end',
                padding: 0,
              }}
            >
              <ListItem disablePadding>
                <NavLink className={'page-link'} to='/'>
                  <img src={logo} alt='Логотип' />
                </NavLink>
              </ListItem>
              <ListItem disablePadding>
                <NavLink className={'page-link'} to='/'>
                  Home
                </NavLink>
              </ListItem>
              {!user && (
                <>
                  <ListItem disablePadding>
                    <NavLink className='page-link' to='/login'>
                      Login
                    </NavLink>
                  </ListItem>
                  <ListItem disablePadding>
                    <NavLink className='page-link' to='/register'>
                      Register
                    </NavLink>
                  </ListItem>
                </>
              )}
              {user?.displayName && (
                <ListItem disablePadding>
                  <NavLink className={'page-link'} to='/profile'>
                    Profile
                  </NavLink>
                </ListItem>
              )}
            </List>
          </nav> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: '20px',
          }}
        >
          <Box>{user?.displayName}</Box>
          {!user && (
            <Button
              variant='contained'
              onClick={() => {
                handleLogin('/login');
              }}
              sx={{ backgroundColor: 'primary.main' }}
            >
              Login
            </Button>
          )}
          {user && (
            <Button
              variant='contained'
              onClick={handleSignOut}
              sx={{ backgroundColor: 'primary.main' }}
            >
              Logout
            </Button>
          )}
        </Box>
      </AppBar>
      <main>
        <Outlet />
      </main>
      <footer>{/* <p>&copy; 2025 Angry Andrii</p> */}</footer>
    </StyledLayout>
  );
}

export default Layout;
