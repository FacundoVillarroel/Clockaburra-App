import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { loadToken } from "../helpers/jwtHelpers";

import { setToken } from "../store/reducers/auth.slice";
import BottomTabs from "./BottomTabs";
import LoginScreen from "../screens/LoginScreen";
import { setUser } from "../store/reducers/user.slice";

const AppNavigator = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const initializeToken = async () => {
    const token = await loadToken();
    if (token) {
      dispatch(setToken(token));
    }
  };

  const initializeUser = () => {
    dispatch(setUser(userId));
  };

  useEffect(() => {
    initializeToken();
    if (token) {
      initializeUser();
    }
  }, [token]);

  return (
    <NavigationContainer>
      {token ? <BottomTabs /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
