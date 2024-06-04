import { Alert } from 'react-native';

import { useDispatch } from 'react-redux';
import {
  breakEnd,
  breakStart,
  clockIn,
  clockOut,
} from '../store/reducers/clock.slice';

const useClockActions = () => {
  const dispatch = useDispatch();

  const onClockIn = async (userId, setLoading, token) => {
    const result = await dispatch(clockIn(userId, setLoading, token));
    if (!result.success) {
      setLoading(false);
      Alert.alert('Error', result.message);
    }
  };

  const onClockOut = async (userId, setLoading, token) => {
    const result = await dispatch(clockOut(userId, setLoading, token));
    if (!result.success) {
      setLoading(false);
      Alert.alert('Error', result.message);
    }
  };

  const onBreakStart = async (userId, setLoading, token) => {
    const result = await dispatch(breakStart(userId, setLoading, token));
    if (!result.success) {
      setLoading(false);
      Alert.alert('Error', result.message);
    }
  };

  const onBreakEnd = async (userId, setLoading, token) => {
    const result = await dispatch(breakEnd(userId, setLoading, token));
    if (!result.success) {
      setLoading(false);
      Alert.alert('Error', result.message);
    }
  };

  return { onClockIn, onClockOut, onBreakStart, onBreakEnd };
};

export default useClockActions;
