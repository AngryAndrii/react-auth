import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Layout from './components/layout/Layout';
import Profile from './pages/profile/Profile';
import NotFound from './pages/notfound/NotFound';
import SignIn from './pages/signin/Signin';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<SignIn />} />
        <Route path='profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
