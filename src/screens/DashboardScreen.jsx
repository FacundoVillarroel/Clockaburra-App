import { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';

import Clock from '../components/dashboard/Clock';
import ScheduleCard from '../components/dashboard/ScheduleCard';
import ThisPeriodCard from '../components/dashboard/ThisPeriodCard';
import { DateTime } from 'luxon';
import { getStartOfWeek } from '../helpers/dateHelpers';
import { BACKEND_IP } from '@env';
import Loading from '../components/loading/Loading';
import fetchDataFromDb from '../helpers/fetch';
import { calcTotalHours } from '../helpers/calculationFunctions';
import Colors from '../constants/colors';

const DashboardScreen = () => {
  const [loading, setLoading] = useState(false);
  const [shifts, setShifts] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const { id: userId, hourlyRate } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);

  const endpoint = `${BACKEND_IP}/shift`;

  const getShiftsFromDb = async (selectedWeek) => {
    try {
      setLoading(true);
      const shiftArray = await fetchDataFromDb(
        endpoint,
        userId,
        selectedWeek,
        token
      );
      const hoursArray = shiftArray.map((shift) => shift.totalHours);

      setTotalHours(calcTotalHours(hoursArray));
      setShifts(shiftArray);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Dashboard Screen: ', error);
    }
  };

  useEffect(() => {
    getShiftsFromDb(getStartOfWeek());
  }, []);

  const getWorkingDays = () => {
    return shifts.map((shift) =>
      DateTime.fromISO(shift.startDate).toFormat('ccc')
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                getShiftsFromDb(getStartOfWeek());
              }}
              colors={[Colors.secondary, Colors.primary]}
              tintColor={Colors.primary}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          <Clock shifts={shifts} />
          <ScheduleCard
            workingDays={getWorkingDays()}
            totalPayment={totalHours * hourlyRate}
          />
          <ThisPeriodCard shifts={shifts} />
        </ScrollView>
      )}
    </>
  );
};

export default DashboardScreen;
