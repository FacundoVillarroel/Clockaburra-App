import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

import { BACKEND_IP } from '@env';

const initialState = {
  clockedIn: false,
  onBreak: false,
};

const clockSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    clock_in: (state, action) => {
      state.clockedIn = true;
    },
    clock_out: (state, action) => {
      (state.clockedIn = false), (state.onBreak = false);
    },
    break_start: (state, action) => {
      state.onBreak = true;
    },
    break_end: (state, action) => {
      state.onBreak = false;
    },
    set_clock: (state, action) => {
      state.clockedIn = action.payload.clockedIn;
      state.onBreak = action.payload.onBreak;
    },
    clear_clock: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  clock_in,
  clock_out,
  break_start,
  break_end,
  set_clock,
  clear_clock,
} = clockSlice.actions;

export default clockSlice.reducer;

export const clockIn = (userId, setLoading, token) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const now = DateTime.local();
      const response = await fetch(`${BACKEND_IP}/clock/in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          dateTime: now,
        }),
      });
      const clock = await response.json();
      if (clock.updated) {
        setLoading(false);
        dispatch(clock_in());
        return { success: true };
      } else {
        return {
          success: false,
          message: 'Could not clock in, please try again.',
        };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
};

export const clockOut = (userId, setLoading, token) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const now = DateTime.local();
      const response = await fetch(`${BACKEND_IP}/clock/out`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          dateTime: now,
        }),
      });
      const clock = await response.json();
      if (clock.updated) {
        setLoading(false);
        dispatch(clock_out());
        return { success: true };
      } else {
        return {
          success: false,
          message: 'Could not clock out, please try again.',
        };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
};
export const breakStart = (userId, setLoading, token) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const now = DateTime.local();
      const response = await fetch(`${BACKEND_IP}/clock/breakStart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          dateTime: now,
        }),
      });
      const clock = await response.json();
      if (clock.updated) {
        setLoading(false);
        dispatch(break_start());
        return { success: true };
      } else {
        return {
          success: false,
          message: 'Could not start break, please try again.',
        };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
};
export const breakEnd = (userId, setLoading, token) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const now = DateTime.local();
      const response = await fetch(`${BACKEND_IP}/clock/breakEnd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          dateTime: now,
        }),
      });
      const clock = await response.json();
      if (clock.updated) {
        setLoading(false);
        dispatch(break_end());
        return { success: true };
      } else {
        return {
          success: false,
          message: 'Could not end break, please try again.',
        };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
};
export const setClock = (userId, token) => {
  return async (dispatch) => {
    const response = await fetch(`${BACKEND_IP}/clock/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const clockStatus = await response.json();
    dispatch(set_clock(clockStatus));
  };
};
export const clearClock = () => {
  return async (dispatch) => {
    try {
      dispatch(clear_clock());
    } catch (error) {
      console.log(error);
    }
  };
};
