function convertStatsToChartData(statsObject) {
  return Object.entries(statsObject).map(([date, stats]) => ({
    name: date,
    pullups: stats.pullups,
    pushups: stats.pushups,
  }));
}

export default convertStatsToChartData;
