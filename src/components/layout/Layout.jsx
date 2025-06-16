import { NavLink, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      It is layout component
      <header>
        <nav>
          <ul>
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
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2025 Angry Andrii</p>
      </footer>
    </>
  );
}

export default Layout;
