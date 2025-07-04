import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { Typography } from '@mui/material';
import runImage from '../../assets/run_high_q.jpg';

function Home() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        padding: '50px',
        backgroundImage: `url(${runImage})`,
        backgroundSize: {
          xs: 'cover',
          sm: 'cover',
          md: 'cover',
          lg: 'cover',
        },
        backgroundPosition: {
          xs: 'right',
          sm: 'right',
          md: 'right',
          lg: 'center',
        },
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Typography variant='h2' sx={{ color: 'white' }}>
        your personal habit tracker
      </Typography>
      <Typography variant='h4' sx={{ color: 'white' }}>
        start simple - track your push-ups daily 💪
      </Typography>
    </Box>
  );
}

export default Home;
