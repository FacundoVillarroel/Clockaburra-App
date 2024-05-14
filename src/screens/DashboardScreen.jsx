import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import Clock from "../components/dashboard/Clock";
import ScheduleCard from "../components/dashboard/ScheduleCard";
import ThisPeriodCard from "../components/dashboard/ThisPeriodCard";
import { DateTime } from "luxon";
import { dateFormat, getStartOfWeek } from "../helpers/dateHelpers";
import { BACKEND_IP } from "@env";
import Loading from "../components/loading/Loading";

const calcTotalHours = (shiftArray) => {
  let counter = shiftArray.reduce(
    (acc, current) => acc + current.totalHours,
    0
  );
  return counter.toFixed(2);
};

const DashboardScreen = () => {
  const [loading, setLoading] = useState(false);
  const [shifts, setShifts] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const userId = useSelector((state) => state.user.id);
  const hourlyRate = useSelector((state) => state.user.hourlyRate);

  const getShiftsFromDb = async (selectedWeek) => {
    try {
      setLoading(true);
      const startDate = DateTime.fromFormat(selectedWeek, dateFormat).toISO();
      const response = await fetch(
        `${BACKEND_IP}/shift/user/${userId}/week/${startDate}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
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
        throw new Error("Error getting data from db: ", data);
      }
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
      DateTime.fromISO(shift.startDate).toFormat("ccc")
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <Clock />
          <ScheduleCard
            workingDays={getWorkingDays()}
            totalPayment={totalHours * hourlyRate}
          />
          <ThisPeriodCard />
        </View>
      )}
    </>
  );
};

export default DashboardScreen;
