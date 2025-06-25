import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { Typography } from "@mui/material";
import runImage from "../../assets/run_high_q.jpg";

function Home() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        padding: "50px",
        backgroundImage: `url(${runImage})`,
        backgroundSize: "cover",
        backgroundPosition: {
          xs: "right",
          sm: "right",
          md: "right",
          lg: "center",
        },
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography variant="h1" sx={{ color: "white" }}>
        your personal habit tracker
      </Typography>
      <Typography variant="h3" sx={{ color: "white" }}>
        start simple - track your push-ups daily 💪
      </Typography>
      <Typography variant="p" sx={{ color: "white" }}>
        This site is designed for those who want to develop discipline and see
        their progress. Start small - note how many push-ups you did every day.
        Over time, you can add other habits: drinking water, reading, learning
        words, and more.
      </Typography>
      <Typography variant="p" sx={{ color: "white" }}>
        🔹 Easy to use 🔹 Motivates you not to miss 🔹 A graph of your progress
        - clearly and simply Start today. One day is already a step forward.
      </Typography>
    </Box>
  );
}

export default Home;
