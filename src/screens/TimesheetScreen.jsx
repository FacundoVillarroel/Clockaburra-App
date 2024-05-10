import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";

import ShiftCard from "../components/shifts/ShiftCard";
import WeekIndicator from "../components/shifts/WeekIndicator";
import WeekSelector from "../components/shifts/WeekSelector";
import Loading from "../components/loading/Loading";

import { BACKEND_IP } from "@env";
import Colors from "../constants/colors";

const getMondayOfCurrentWeek = () => {
  return DateTime.local().startOf("week");
};

const getSundayOfCurrentWeek = () => {
  return DateTime.local().endOf("week");
};

const TimesheetScreen = () => {
  const [loading, setLoading] = useState(false);
  const [timesheets, setTimesheets] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState(getMondayOfCurrentWeek());
  const userId = useSelector((state) => state.user.id);
  const hourlyRate = useSelector((state) => state.user.hourlyRate);

  const mondayOfCurrentWeek = getMondayOfCurrentWeek();

  const sundayOfCurrentWeek = getSundayOfCurrentWeek();

  const calcTotalHours = (timesheetArray) => {
    let counter = timesheetArray.reduce(
      (acc, current) => acc + current.workedHours,
      0
    );
    return counter.toFixed(2);
  };

  // add filter by week
  const getTimesheetFromDb = async (selectedWeek) => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_IP}/timesheet/user/${userId}`);
      const data = await response.json();
      if (data.data) {
        const timesheetArray = data.data.filter(
          (item) => item.endDate !== null
        );
        timesheetArray.sort((a, b) => {
          const dateA = DateTime.fromISO(a.startDate);
          const dateB = DateTime.fromISO(b.startDate);
          return dateA - dateB;
        });
        setTotalHours(calcTotalHours(timesheetArray));
        setTimesheets(timesheetArray);
        setLoading(false);
      } else {
        throw new Error({ message: "Error getting data from db", data });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTimesheetFromDb(selectedWeek);
  }, [selectedWeek]);

  const onRefresh = () => {
    getTimesheetFromDb(selectedWeek);
  };

  return (
    <View style={styles.rootContainer}>
      <WeekSelector />
      {loading ? (
        <Loading />
      ) : (
        <>
          <WeekIndicator
            from={mondayOfCurrentWeek.toFormat("ccc, dd LLL")}
            to={sundayOfCurrentWeek.toFormat("ccc,dd LLL")}
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
                workedHours={item.workedHours}
                breaks={item.breaks}
                hourlyRate={hourlyRate}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={onRefresh}
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
