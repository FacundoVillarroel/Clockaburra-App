import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';

import WeekSelector from '../components/shifts/WeekSelector';
import WeekIndicator from '../components/shifts/WeekIndicator';
import ShiftCard from '../components/shifts/ShiftCard';

import { useState, useEffect } from 'react';
import Loading from '../components/loading/Loading';
import { BACKEND_IP } from '@env';
import { useSelector } from 'react-redux';
import { getStartOfWeek, getEndOfWeek } from '../helpers/dateHelpers';
import { DateTime } from 'luxon';
import fetchDataFromDb from '../helpers/fetch';
import { calcTotalHours } from '../helpers/calculationFunctions';

import Colors from '../constants/colors';
import EmptyList from '../components/shifts/EmptyList';

const ShiftsScreen = () => {
  const { id: userId, hourlyRate } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(getStartOfWeek());
  const [shifts, setShifts] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  const endPoint = `${BACKEND_IP}/shift`;

  const getShiftsFromDb = async () => {
    try {
      setLoading(true);
      const shiftArray = await fetchDataFromDb(
        endPoint,
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
      console.error('ShiftScreen, getShiftsFromDb :', error);
    }
  };

  useEffect(() => {
    getShiftsFromDb(selectedWeek);
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
            from={selectedWeek}
            to={getEndOfWeek(DateTime.fromFormat(selectedWeek, 'ccc, dd LLL'))}
            totalHours={totalHours}
            totalEarnings={(totalHours * hourlyRate).toFixed(1)}
          />
          {shifts.length === 0 ? (
            <EmptyList
              iconName="layers-outline"
              subtitle="You don't have shift scheduled for this week"
            />
          ) : (
            <FlatList
              data={shifts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ShiftCard
                  startDate={item.startDate}
                  endDate={item.endDate}
                  hours={item.totalHours}
                  breaks={item.breaks}
                  hourlyRate={hourlyRate}
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={getShiftsFromDb}
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

export default ShiftsScreen;
