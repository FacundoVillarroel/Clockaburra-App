import { View } from "react-native";

import Clock from "../components/dashboard/Clock";
import ScheduleCard from "../components/dashboard/ScheduleCard";
import ThisPeriodCard from "../components/dashboard/ThisPeriodCard";

const DashboardScreen = () => {
  return (
    <View>
      <Clock></Clock>
      <ScheduleCard></ScheduleCard>
      <ThisPeriodCard></ThisPeriodCard>
    </View>
  );
};

export default DashboardScreen;
