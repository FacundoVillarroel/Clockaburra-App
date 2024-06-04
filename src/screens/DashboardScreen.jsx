import { useEffect, useState } from 'react';
import { View } from 'react-native';
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
      console.log(error.message);
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

  const getNextShiftInfo = () => {
    const todayISO = DateTime.local().toISODate();
    const todayShift = shifts.find(
      (shift) => DateTime.fromISO(shift.startDate).toISODate() === todayISO
    );
    if (!todayShift) {
      return { today: false };
    }
    const now = DateTime.local();
    const startDateTime = DateTime.fromISO(todayShift.startDate);
    const endDateTime = DateTime.fromISO(todayShift.endDate);

    const today = now.hasSame(startDateTime, 'day');

    const diff = startDateTime.diff(now, ['hours', 'minutes']);
    const hours = Math.floor(diff.hours);
    const minutes = Math.round(diff.minutes % 60);

    let timeToStart;
    if (hours > 0 || minutes >= 60) {
      timeToStart = `${hours}:${minutes.toString().padStart(2, '0')} hs`;
    } else if (minutes > 0) {
      timeToStart = `${minutes} min`;
    } else {
      timeToStart = false;
    }

    const startTime = startDateTime.toFormat('HH:mm');
    const endTime = endDateTime.toFormat('HH:mm');

    return {
      today: today,
      timeToStart: timeToStart,
      startTime: startTime,
      endTime: endTime,
    };
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <Clock shift={getNextShiftInfo()} />
          <ScheduleCard
            workingDays={getWorkingDays()}
            totalPayment={totalHours * hourlyRate}
          />
          <ThisPeriodCard shifts={shifts} />
        </View>
      )}
    </>
  );
};

export default DashboardScreen;
