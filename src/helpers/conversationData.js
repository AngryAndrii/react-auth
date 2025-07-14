function convertStatsToChartData(statsObject) {
  const sortedEntries = Object.entries(statsObject)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB)) // сортуємо за датою
    .slice(-10); // беремо останні 20

  return sortedEntries.map(([date, stats]) => ({
    name: date,
    pullups: stats.pullups,
    pushups: stats.pushups,
    crunches: stats.crunches,
  }));
}

export default convertStatsToChartData;
