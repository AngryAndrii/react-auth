import { Box } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StatChart = ({ data, activity }) => {
  console.log(data);
  return (
    <Box
      sx={{
        width: "auto",
        height: "500px",
        border: "5px solid",
        borderColor: "primary.light",
      }}
    >
      <BarChart width={600} height={400} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 120, backgroundColor: "#ccc" }} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        {["pushups", "pullups"].includes(activity) && (
          <Bar dataKey={activity} fill="#8884d8" barSize={40} />
        )}
      </BarChart>
    </Box>
  );
};

export default StatChart;
