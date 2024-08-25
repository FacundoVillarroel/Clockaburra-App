import { DateTime } from 'luxon';

const dateFormat = 'ccc, dd LLL';

const getEndOfWeek = (date = DateTime.local()) => {
  let dateObj = date;
  if (typeof dateObj === 'string') {
    dateObj = DateTime.fromFormat(date, dateFormat);
  }
  return dateObj.endOf('week').toFormat(dateFormat);
};

const getEndOfWeekISO = (dateTime = DateTime.local()) => {
  return dateTime
    .endOf('week')
    .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
    .toISO();
};

const getStartOfWeek = (date = DateTime.local()) => {
  let dateObj = date;
  if (typeof dateObj === 'string') {
    dateObj = DateTime.fromFormat(date, dateFormat);
  }
  return dateObj.startOf('week').toFormat(dateFormat);
};

export { getStartOfWeek, getEndOfWeek, getEndOfWeekISO, dateFormat };
