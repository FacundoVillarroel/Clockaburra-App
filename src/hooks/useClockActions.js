import { Alert } from "react-native";

import { useDispatch } from "react-redux";
import {
  breakEnd,
  breakStart,
  clockIn,
  clockOut,
} from "../store/reducers/clock.slice";

const useClockActions = () => {
  const dispatch = useDispatch();

  const onCheckIn = async (userId, setLoading) => {
    const result = await dispatch(clockIn(userId, setLoading));
    if (!result.success) {
      setLoading(false);
      Alert.alert("Error", result.message);
    }
  };

  const onCheckOut = async (userId, setLoading) => {
    const result = await dispatch(clockOut(userId, setLoading));
    if (!result.success) {
      setLoading(false);
      Alert.alert("Error", result.message);
    }
  };

  const onBreakStart = async (userId, setLoading) => {
    const result = await dispatch(breakStart(userId, setLoading));
    if (!result.success) {
      setLoading(false);
      Alert.alert("Error", result.message);
    }
  };

  const onBreakEnd = async (userId, setLoading) => {
    const result = await dispatch(breakEnd(userId, setLoading));
    if (!result.success) {
      setLoading(false);
      Alert.alert("Error", result.message);
    }
  };

  return { onCheckIn, onCheckOut, onBreakStart, onBreakEnd };
};

export default useClockActions;
