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
const dateFormat = "ccc, dd LLL";

const getEndOfWeek = (date = DateTime.local()) => {
  let dateObj = date;
  if (typeof dateObj === "string") {
    dateObj = DateTime.fromFormat(date, dateFormat);
  }
  return dateObj.endOf("week").toFormat(dateFormat);
};

const getStartOfWeek = (date = DateTime.local()) => {
  let dateObj = date;
  if (typeof dateObj === "string") {
    dateObj = DateTime.fromFormat(date, dateFormat);
  }
  return dateObj.startOf("week").toFormat(dateFormat);
};

export { formatDay, formatMont, getStartOfWeek, getEndOfWeek };
