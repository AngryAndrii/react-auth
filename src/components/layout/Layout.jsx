import { Box, List } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Layout() {
  const { user, loading } = useAuth();
  if (loading) return <div>Завантаження...</div>;
  return (
    <Box sx={{ margin: '20px' }}>
      It is layout component
      <h4>Hello {user?.email}</h4>
      <header>
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
      </header>
      <main>
        <Outlet />
      </main>
      <footer>{/* <p>&copy; 2025 Angry Andrii</p> */}</footer>
    </Box>
  );
}

export default Layout;
