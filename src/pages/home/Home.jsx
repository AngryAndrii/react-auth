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
        backgroundImage: `url(${runImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      Home home home
    </Box>
  );
}

export default Home;
