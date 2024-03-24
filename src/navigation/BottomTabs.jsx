import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import Colors from "../constants/colors";
import Header from "../components/Header";
import DashboardScreen from "../screens/DashboardScreen";
import ShiftsScreen from "../screens/ShiftsScreen";
import TimesheetScreen from "../screens/TimesheetScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <Header navigation={navigation} route={route} />
        ),
        tabBarStyle: {
          paddingTop: 8,
          backgroundColor: Colors.primary,
          minHeight: 60,
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 12, paddingBottom: 8 },
      }}
    >
      <Tab.Screen
        name="dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="shifts"
        component={ShiftsScreen}
        options={{
          tabBarLabel: "Shifts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="layers" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="timesheet"
        component={TimesheetScreen}
        options={{
          tabBarLabel: "Timesheet",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
