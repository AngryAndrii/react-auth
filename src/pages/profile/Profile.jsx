import { Box, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useAuth } from '../../helpers/authContext';
import StatChart from '../../components/statChart/StatChart';
import { getData } from '../../helpers/fetch';
import { useEffect, useState } from 'react';
import convertStatsToChartData from '../../helpers/conversationData';
import SendTodayActivity from '../../components/sendTodayActivity/sendTodayActivity';
import updateChart from '../../helpers/updateChart';

function Profile() {
  const { user, uid, token, loading } = useAuth();
  const [chartData, setChartData] = useState({});
  const [curentActivity, setCurentActivity] = useState('pullups');

  const handleChange = (event) => {
    setCurentActivity(event.target.value);
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
      <Box>
        <FormControl sx={{ color: 'primary.text' }}>
          <FormLabel id='demo-controlled-radio-buttons-group'>Activity</FormLabel>
          <RadioGroup
            aria-labelledby='demo-controlled-radio-buttons-group'
            name='controlled-radio-buttons-group'
            value={curentActivity}
            onChange={handleChange}
          >
            <FormControlLabel
              value='pushups'
              control={<Radio sx={{ color: 'primary.text' }} />}
              label='Pushups'
            />
            <FormControlLabel
              sx={{ color: 'primary.text' }}
              value='pullups'
              control={<Radio sx={{ color: 'primary.text' }} />}
              label='Pullups'
            />
          </RadioGroup>
        </FormControl>
        <StatChart activity={curentActivity} data={chartData} />
      </Box>
    </Box>
  );
}

export default Profile;
