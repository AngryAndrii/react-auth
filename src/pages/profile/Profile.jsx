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
} from "@mui/material";
import { useAuth } from "../../helpers/authContext";
import StatChart from "../../components/statChart/StatChart";
import { useEffect, useState } from "react";
import SendTodayActivity from "../../components/sendTodayActivity/sendTodayActivity";
import updateChart from "../../helpers/updateChart";
import { listOfExercises } from "../../helpers/listOfExercises";
import DroplistForActivity from "../../components/droplistForActivity/DroplistForActivity";

function Profile() {
  const { user, uid, token, loading } = useAuth();
  const [chartData, setChartData] = useState({});
  const [curentActivity, setCurentActivity] = useState("pullups");

  const handleChange = (event) => {
    setCurentActivity(event.target.value);
  };

  useEffect(() => {
    updateChart(uid, token, setChartData);
  }, []);

  if (loading) return <div>Завантаження...</div>;

  return (
    <Box sx={{ paddingTop: "50px", border: "2px solid tomato" }}>
      // It is Profile page of
      <Box sx={{ fontSize: "35px", fontWeight: "bold" }}>{user?.email}</Box>
      <SendTodayActivity onSend={updateChart} />
      <Box sx={{ width: "800px", margin: "0 auto" }}>
        {/* <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel
            id="select-label"
            sx={{
              color: "#bbb",
              "&.Mui-focused": {
                color: "#ccc",
              },
            }}
          >
            Curent Activity
          </InputLabel>
          <Select
            inputProps={{
              sx: {
                color: "#eee",
              },
            }}
            sx={{
              "& label.Mui-focused": { color: "#ccc" }, // колір підпису при фокусі
              ".MuiOutlinedInput-notchedOutline": { borderColor: "#666" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#aaa",
                color: "primary.text",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#999",
              },
              ".MuiSvgIcon-root": { color: "#eee" }, // колір стрілочки
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#222", // фон всього випадаючого списку
                  color: "#fff",
                  padding: 0, // прибрати внутрішній padding
                  "& .MuiMenuItem-root": {
                    padding: "8px 12px", // стилі для кожного пункту
                    "&:hover": {
                      backgroundColor: "#8884d8",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "secondary.dark",
                    },
                  },
                },
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={curentActivity}
            label="Age"
            onChange={handleChange}
          >
            {listOfExercises.map((el) => {
              return <MenuItem value={el.toLowerCase()}>{el}</MenuItem>;
            })}
          </Select>
        </FormControl> */}
        <DroplistForActivity
          value={curentActivity}
          onChange={handleChange}
          name="curentActivity"
          label="Curent Activity"
          list={listOfExercises}
        />
        <StatChart activity={curentActivity} data={chartData} />
      </Box>
    </Box>
  );
}

export default Profile;
