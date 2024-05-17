import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";

import ShiftCard from "../components/shifts/ShiftCard";
import WeekIndicator from "../components/shifts/WeekIndicator";
import WeekSelector from "../components/shifts/WeekSelector";
import Loading from "../components/loading/Loading";
import { getStartOfWeek, getEndOfWeek } from "../helpers/dateHelpers";

import fetchDataFromDb from "../helpers/fetch";
import { calcTotalHours } from "../helpers/calculationFunctions";

import { BACKEND_IP } from "@env";
import Colors from "../constants/colors";

const TimesheetScreen = () => {
  const [loading, setLoading] = useState(false);
  const [timesheets, setTimesheets] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState(getStartOfWeek());
  const userId = useSelector((state) => state.user.id);
  const hourlyRate = useSelector((state) => state.user.hourlyRate);

  const endPoint = `${BACKEND_IP}/timesheet`;

  const getTimesheetFromDb = async () => {
    try {
      setLoading(true);
      const timesheetArray = await fetchDataFromDb(
        endPoint,
        userId,
        selectedWeek
      );
      const hoursArray = timesheetArray.map(
        (timesheet) => timesheet.workedHours
      );

      setTotalHours(calcTotalHours(hoursArray));
      setTimesheets(timesheetArray);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
            totalEarnings={totalHours * hourlyRate}
          />
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
