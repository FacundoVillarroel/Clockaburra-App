import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import ProgressBar from "./ProgressBar";
import Card from "../ui/Card";
import Loading from "../loading/Loading";
import { DateTime } from "luxon";
import Colors from "../../constants/colors";

import {
  getStartOfWeek,
  getEndOfWeek,
  dateFormat,
} from "../../helpers/dateHelpers";
import { BACKEND_IP } from "@env";
import { useSelector } from "react-redux";

const ThisPeriodCard = ({ shifts }) => {
  const [loading, setLoading] = useState(false);
  const [timesheet, setTimesheets] = useState([]);
  const [workingDays, setWorkingDays] = useState(0);
  const [daysWorked, setDaysWorked] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const userId = useSelector((state) => state.user.id);
  const hourlyRate = useSelector((state) => state.user.hourlyRate);

  const monday = getStartOfWeek();
  const sunday = getEndOfWeek();

  const calcTotalHours = (hoursArray) => {
    return hoursArray.reduce((acc, hours) => acc + hours, 0).toFixed(1);
  };

  const getTimesheetFromDb = async (selectedWeek) => {
    try {
      setLoading(true);
      const selectedWeekTime = DateTime.fromFormat(
        selectedWeek,
        dateFormat
      ).toISO();
      const response = await fetch(
        `${BACKEND_IP}/timesheet/user/${userId}/week/${selectedWeekTime}`
      );
      const data = await response.json();
      if (data) {
        const timesheetArray = data.filter((item) => item.endDate !== null);
        timesheetArray.sort((a, b) => {
          const dateA = DateTime.fromISO(a.startDate);
          const dateB = DateTime.fromISO(b.startDate);
          return dateA - dateB;
        });
        setTimesheets(timesheetArray);
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
      } else {
        throw new Error("Error getting data from db");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTimesheetFromDb(getStartOfWeek());
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
    fontWeight: "bold",
    color: Colors.primary,
  },
  cardContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  cardText: {
    color: "white",
    textAlign: "center",
  },
  loadingContainer: {
    height: 200,
  },
  loading: {
    image: { height: 100, width: 100 },
  },
});

export default ThisPeriodCard;
