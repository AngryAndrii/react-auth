import { Box } from '@mui/material';
import { useAuth } from '../../helpers/authContext';
import StatChart from '../../components/statChart/StatChart';
import data from '../../helpers/testDataForChart';
import getData from '../../helpers/fetch';
import { useEffect, useState } from 'react';

function Profile() {
  const { user, uid, token, loading } = useAuth();
  const [fetchData, setFetchData] = useState({});

  useEffect(() => {
    if (!uid || !token) return;
    const getInfo = async () => {
      try {
        const response = await getData(uid, token);
        const data = response.data;
        // console.log(data);
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
        {fetchData && Object.keys(fetchData).length > 0 ? (
          Object.entries(fetchData).map(([date, stats]) => (
            <div key={date}>
              <p>{date}</p>
              <p> {stats.pullups} pullups</p>
              <p>{stats.pushups} pushups</p>
            </div>
          ))
        ) : (
          <Box>Завантаження даних...</Box>
        )}
      </Box>
      <StatChart data={data} />
    </Box>
  );
}

export default Profile;
