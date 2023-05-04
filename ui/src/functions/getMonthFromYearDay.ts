import getDayOfYear from "date-fns/get_day_of_year";
import addDays from "date-fns/add_days";

type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export const getMonthFromYearDay = (
  day: string | number,
  year?: string | number
): null | Month => {
  const currYear = Number(year) || new Date().getFullYear();
  if (day > getDayOfYear(`${currYear}.12.31`)) return null;
  return addDays(`${currYear}.01.01`, Number(day) - 1).getMonth() as Month;
};

export const getDayOfMonthFromDayOfYear = (day: number, year?: number) => {
  const currentYear = year || new Date().getFullYear();
  if (day > getDayOfYear(`${currentYear}.12.31`)) return null;
  return addDays(`${currentYear}.01.01`, day - 1).getDate();
};
