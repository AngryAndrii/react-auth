import { Box } from '@mui/material';
import { useAuth } from '../../helpers/authContext';

function Profile() {
  const { user, loading } = useAuth();
  if (loading) return <div>Завантаження...</div>;
  return (
    <>
      It is Profile page of <Box sx={{ fontSize: '35px', fontWeight: 'bold' }}>{user?.email}</Box>
    </>
  );
}

export default Profile;
