import { DateTime } from 'luxon';
import { dateFormat, getEndOfWeek, getEndOfWeekISO } from './dateHelpers';

const fetchDataFromDb = async (
  endpoint,
  userId,
  selectedWeek,
  token = null
) => {
  try {
    const startDate = encodeURIComponent(
      DateTime.fromFormat(selectedWeek, dateFormat).toISO()
    );
    const endDate = encodeURIComponent(
      getEndOfWeekISO(DateTime.fromFormat(selectedWeek, dateFormat))
    );
    const response = await fetch(
      `${endpoint}?userIds=${userId}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (Array.isArray(data)) {
      const filteredData = data.filter((item) => item.endDate !== null);
      filteredData.sort((a, b) => {
        const dateA = DateTime.fromISO(a.startDate);
        const dateB = DateTime.fromISO(b.startDate);
        return dateA - dateB;
      });
      return filteredData;
    } else {
      throw new Error('Error getting data from db: ', data);
    }
  } catch (error) {
    console.error('fetch.js, fetchDataFromDb', error);
    throw error;
  }
};

export default fetchDataFromDb;
