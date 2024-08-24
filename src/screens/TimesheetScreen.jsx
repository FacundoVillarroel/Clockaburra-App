import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';

import ShiftCard from '../components/shifts/ShiftCard';
import WeekIndicator from '../components/shifts/WeekIndicator';
import WeekSelector from '../components/shifts/WeekSelector';
import Loading from '../components/loading/Loading';
import { getStartOfWeek, getEndOfWeek } from '../helpers/dateHelpers';

import fetchDataFromDb from '../helpers/fetch';
import { calcTotalHours } from '../helpers/calculationFunctions';

import { BACKEND_IP } from '@env';
import Colors from '../constants/colors';
import EmptyList from '../components/shifts/EmptyList';

const TimesheetScreen = () => {
  const [loading, setLoading] = useState(false);
  const [timesheets, setTimesheets] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState(getStartOfWeek());
  const { id: userId, hourlyRate } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);

  const endPoint = `${BACKEND_IP}/timesheet`;

  const getTimesheetFromDb = async () => {
    try {
      setLoading(true);
      const timesheetArray = await fetchDataFromDb(
        endPoint,
        userId,
        selectedWeek,
        token
      );
      const hoursArray = timesheetArray.map(
        (timesheet) => timesheet.workedHours
      );

      setTotalHours(calcTotalHours(hoursArray));
      setTimesheets(timesheetArray);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getTimesheetFromDb();
  }, [selectedWeek]);

  return (
    <View style={styles.rootContainer}>
      <WeekSelector
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <WeekIndicator
            from={getStartOfWeek(selectedWeek)}
            to={getEndOfWeek(selectedWeek)}
            totalHours={totalHours}
            totalEarnings={(totalHours * hourlyRate).toFixed(1)}
          />
          {timesheets.length === 0 ? (
            <EmptyList
              iconName="calendar-clear-outline"
              subtitle="You don't have timesheets for this week"
            />
          ) : (
            <FlatList
              data={timesheets}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ShiftCard
                  startDate={item.startDate}
                  endDate={item.endDate}
                  hours={item.workedHours}
                  breaks={item.breaks}
                  hourlyRate={hourlyRate}
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={getTimesheetFromDb}
                  colors={[Colors.secondary, Colors.primary]}
                  tintColor={Colors.primary}
                  progressBackgroundColor="#ffffff"
                />
              }
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default TimesheetScreen;
