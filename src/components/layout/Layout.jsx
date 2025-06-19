import { Box, List, Button, AppBar } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import handleSignOut from '../../helpers/signout';

function Layout() {
  const { user, loading } = useAuth();
  if (loading) return <div>Завантаження...</div>;
  return (
    <Box sx={{ margin: '20px', paddingTop: '50px' }}>
      <AppBar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '5px 25px',
        }}
      >
        <nav>
          <List sx={{ display: 'flex', flexDirection: 'row', columnGap: '10px' }}>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/register'>Register page</NavLink>
            </li>
            <li>
              <NavLink to='/login'>Login page</NavLink>
            </li>
            <li>
              <NavLink to='/profile'>Profile page</NavLink>
            </li>
          </List>
        </nav>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: '20px',
          }}
        >
          <Box>{user?.displayName}</Box>
          <Button variant='contained' onClick={handleSignOut}>
            Logout
          </Button>
        </Box>
      </AppBar>
      <main>
        <Outlet />
      </main>
      <footer>{/* <p>&copy; 2025 Angry Andrii</p> */}</footer>
    </Box>
  );
}

export default Layout;
