import {
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../../helpers/authContext';
import StatChart from '../../components/statChart/StatChart';
import { useEffect, useState } from 'react';
import SendTodayActivity from '../../components/sendTodayActivity/sendTodayActivity';
import updateChart from '../../helpers/updateChart';
import { listOfExercises } from '../../helpers/listOfExercises';
import DroplistForActivity from '../../components/droplistForActivity/DroplistForActivity';

function Profile() {
  const { user, uid, token, loading } = useAuth();
  const [chartData, setChartData] = useState({});
  const [activityForSend, setActivityForSend] = useState('pullups');
  const [activityToShow, setActivityToShow] = useState('pullups');

  const handleChange = (event) => {
    setActivityForSend(event.target.value);
  };

  const handleChangeShow = (event) => {
    setActivityToShow(event.target.value);
  };

  useEffect(() => {
    updateChart(uid, token, setChartData);
  }, []);

  if (loading) return <div>Завантаження...</div>;

  return (
    <Box sx={{ paddingTop: '50px', border: '2px solid tomato' }}>
      // It is Profile page of
      <Box sx={{ fontSize: '35px', fontWeight: 'bold' }}>{user?.email}</Box>
      <SendTodayActivity onSend={updateChart} />
      <Box sx={{ width: '800px', margin: '0 auto' }}>
        <DroplistForActivity
          value={activityToShow}
          onChange={handleChangeShow}
          name='activityToShow'
          label='show activity'
          list={listOfExercises}
        />
        <StatChart activity={activityToShow} data={chartData} />
      </Box>
    </Box>
  );
}

export default Profile;
