import { getTodayFormattedDay } from './getTodayFormattedDate';

const transformData = (formData) => {
  const date = getTodayFormattedDay();
  const { activity, amount } = formData;

  return {
    [`${date}/${activity}`]: Number(amount),
  };
};

export default transformData;
