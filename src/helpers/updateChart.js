import convertStatsToChartData from './conversationData';
import { getData } from './fetch';

const updateChart = async (uid, token, setChartData) => {
  if (!uid || !token) return;
  try {
    const response = await getData(uid, token);
    const data = response.data;
    setChartData(convertStatsToChartData(data));
  } catch (error) {
    console.error(error);
  }
};

export default updateChart;
