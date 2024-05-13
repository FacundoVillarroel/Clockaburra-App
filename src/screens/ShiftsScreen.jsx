import { View, StyleSheet, FlatList } from "react-native";

import WeekSelector from "../components/shifts/WeekSelector";
import WeekIndicator from "../components/shifts/WeekIndicator";
import ShiftCard from "../components/shifts/ShiftCard";

import { useState, useEffect } from "react";
import Loading from "../components/loading/Loading";
import { BACKEND_IP } from "@env";
import { useSelector } from "react-redux";
import {
  getStartOfWeek,
  getEndOfWeek,
  dateFormat,
} from "../helpers/dateHelpers";
import { DateTime } from "luxon";

const ShiftsScreen = () => {
  const userId = useSelector((state) => state.user.id);
  const hourlyRate = useSelector((state) => state.user.hourlyRate);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(getStartOfWeek());
  const [shifts, setShifts] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  const calcTotalHours = (shiftArray) => {
    let counter = shiftArray.reduce(
      (acc, current) => acc + current.totalHours,
      0
    );
    return counter.toFixed(2);
  };

  const getShiftsFromDb = async () => {
    try {
      setLoading(true);
      const selectedWeekTime = DateTime.fromFormat(
        selectedWeek,
        dateFormat
      ).toISO();
      const response = await fetch(
        `${BACKEND_IP}/shift/user/${userId}/week/${selectedWeekTime}`
      );
      const data = await response.json();
      if (data) {
        const shiftArray = data.filter((item) => item.endDate !== null);
        shiftArray.sort((a, b) => {
          const dateA = DateTime.fromISO(a.startDate);
          const dateB = DateTime.fromISO(b.startDate);
          return dateA - dateB;
        });
        setTotalHours(calcTotalHours(shiftArray));
        setShifts(shiftArray);
        setLoading(false);
      } else {
        throw new Error("Error getting data from db");
      }
    } catch (error) {
      setLoading(false);
      console.log("GetShiftFromDb", error.message);
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
            to={getEndOfWeek(DateTime.fromFormat(selectedWeek, "ccc, dd LLL"))}
            totalHours={totalHours}
            totalEarnings={totalHours * hourlyRate}
          />
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

export default ShiftsScreen;
