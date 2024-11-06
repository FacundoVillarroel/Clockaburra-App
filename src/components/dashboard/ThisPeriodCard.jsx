import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ProgressBar from './ProgressBar';
import Card from '../ui/Card';
import Loading from '../loading/Loading';
import { DateTime } from 'luxon';
import Colors from '../../constants/colors';

import { getStartOfWeek, getEndOfWeek } from '../../helpers/dateHelpers';
import { BACKEND_IP } from '@env';
import { useSelector } from 'react-redux';
import fetchDataFromDb from '../../helpers/fetch';
import { calcTotalHours } from '../../helpers/calculationFunctions';

const ThisPeriodCard = ({ shifts }) => {
  const [loading, setLoading] = useState(false);
  const [workingDays, setWorkingDays] = useState(0);
  const [daysWorked, setDaysWorked] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const { id: userId, hourlyRate } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);

  const monday = getStartOfWeek();
  const sunday = getEndOfWeek();

  const endpoint = `${BACKEND_IP}/timesheet`;

  const getTimesheetFromDb = async () => {
    try {
      setLoading(true);
      const selectedWeek = getStartOfWeek();

      const timesheetArray = await fetchDataFromDb(
        endpoint,
        userId,
        selectedWeek,
        token
      );

      const uniqueDaysShift = new Set(
        shifts.map((shift) => DateTime.fromISO(shift.startDate).toISODate())
      );
      const uniqueDaysTimesheet = new Set(
        timesheetArray.map((shift) =>
          DateTime.fromISO(shift.startDate).toISODate()
        )
      );
      setTotalHours(
        calcTotalHours(timesheetArray.map((item) => item.workedHours))
      );
      setWorkingDays(uniqueDaysShift.size);
      setDaysWorked(uniqueDaysTimesheet.size);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('getTimesheetFromDb:', error);
    }
  };

  useEffect(() => {
    getTimesheetFromDb();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>This Period</Text>
      <Text>
        {monday} - {sunday}
      </Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Loading propStyles={styles.loading} />
        </View>
      ) : (
        <>
          <ProgressBar
            workingDays={workingDays}
            daysWorked={daysWorked}
          ></ProgressBar>
          <View style={styles.cardContainer}>
            <Card>
              <Text style={styles.cardText}>${hourlyRate * totalHours}</Text>
              <Text style={styles.cardText}>Earned so far</Text>
            </Card>
            <Card>
              <Text style={styles.cardText}>
                {totalHours}/
                {calcTotalHours(shifts.map((shift) => shift.totalHours))}
              </Text>
              <Text style={styles.cardText}>Hours worked</Text>
            </Card>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  cardContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  cardText: {
    color: 'white',
    textAlign: 'center',
  },
  loadingContainer: {
    height: 200,
  },
  loading: {
    image: { height: 100, width: 100 },
  },
});

export default ThisPeriodCard;
