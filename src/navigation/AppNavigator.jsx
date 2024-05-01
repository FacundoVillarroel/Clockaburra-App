import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { loadToken } from "../helpers/jwtHelpers";

import { setUser } from "../store/reducers/auth.slice";
import BottomTabs from "./BottomTabs";
import LoginScreen from "../screens/LoginScreen";

const AppNavigator = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const initializeUser = async () => {
    const token = await loadToken();
    if (token) {
      dispatch(setUser(token));
    }
  };

  useEffect(() => {
    initializeUser();
  }, [token]);

  return (
    <NavigationContainer>
      {token ? <BottomTabs /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
