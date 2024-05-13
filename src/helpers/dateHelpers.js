import { DateTime } from "luxon";

const formatDay = (date) => {
  const weekDays = ["mon", "tue", "wed", "thu", "fry", "sat", "sun"];
  const dayNumber = date.getDay();
  const day = weekDays[dayNumber - 1];
  return day;
};

const formatMont = (date) => {
  const allMonts = [
    "jan",
    "feb",
    "Mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const monthNumber = date.getMonth();
  const month = allMonts[monthNumber];
  return month;
};

const getMondayOfCurrentWeek = () => {
  return DateTime.local().startOf("week").toFormat("ccc, dd LLL");
};

const getSundayOfCurrentWeek = () => {
  return DateTime.local().endOf("week").toFormat("ccc, dd LLL");
};

const getSundayOfWeekSelected = (weekSelected) => {
  return weekSelected.endOf("week").toFormat("ccc, dd LLL");
};

export {
  formatDay,
  formatMont,
  getMondayOfCurrentWeek,
  getSundayOfCurrentWeek,
  getSundayOfWeekSelected,
};
