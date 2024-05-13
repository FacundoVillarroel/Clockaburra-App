import { DateTime } from "luxon";

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

export { getStartOfWeek, getEndOfWeek, dateFormat };
