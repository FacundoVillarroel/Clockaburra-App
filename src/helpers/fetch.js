import { DateTime } from 'luxon';
import { dateFormat } from './dateHelpers';

const fetchDataFromDb = async (
  endpoint,
  userId,
  selectedWeek,
  token = null
) => {
  try {
    const startDate = DateTime.fromFormat(selectedWeek, dateFormat).toISO();
    const response = await fetch(
      `${endpoint}/user/${userId}/week/${startDate}`,
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
    console.error(error.message);
    throw error;
  }
};

export default fetchDataFromDb;
