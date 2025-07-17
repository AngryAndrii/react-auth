import { listOfExercisesLowerCase } from './listOfExercises';

function convertStatsToChartData(statsObject) {
  const sortedEntries = Object.entries(statsObject)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
    .slice(-10);

  return sortedEntries.map(([date, stats]) => {
    const normalizedEntry = { name: date };
    listOfExercisesLowerCase.forEach((exercise) => {
      normalizedEntry[exercise] = stats[exercise] ?? 0; // 0 якщо немає даних
    });
    return normalizedEntry;
  });
}

export default convertStatsToChartData;
