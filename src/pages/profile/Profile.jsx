import { Box } from '@mui/material';
import { useAuth } from '../../helpers/authContext';
import StatChart from '../../components/statChart/StatChart';
import data from '../../helpers/testDataForChart';
import getData from '../../helpers/fetch';
import { useEffect, useState } from 'react';

function Profile() {
  const { user, loading } = useAuth();
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await getData();
        const data = response.data;
        setFetchData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getInfo();
  }, []);

  if (loading) return <div>Завантаження...</div>;

  return (
    <Box sx={{ paddingTop: '50px' }}>
      It is Profile page of <Box sx={{ fontSize: '35px', fontWeight: 'bold' }}>{user?.email}</Box>
      <Box sx={{ color: 'primary.text' }}>
        {fetchData.length > 0 ? (
          fetchData.slice(0, 5).map((item) => <div key={item.id}>{item.title}</div>)
        ) : (
          <Box>Завантаження даних...</Box>
        )}
      </Box>
      <StatChart data={data} />
    </Box>
  );
}

export default Profile;
