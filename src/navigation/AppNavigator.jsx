import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import BottomTabs from "./BottomTabs";
import LoginScreen from "../screens/LoginScreen";

const AppNavigator = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <BottomTabs /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
