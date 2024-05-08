import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

import { BACKEND_IP } from "@env";

const initialState = {
  clockedIn: false,
  onBreak: false,
};

const clockSlice = createSlice({
  name: "clock",
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

export const clockIn = (userId) => {
  return async (dispatch) => {
    try {
      const now = DateTime.local();
      const response = await fetch(`${BACKEND_IP}/clock/in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          dateTime: now,
        }),
      });
      const clock = await response.json();
      if (clock.updated) {
        dispatch(clock_in());
      } else {
        return new Error("Error: Could not clock in, try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const clockOut = (userId) => {
  return async (dispatch) => {
    try {
      const now = DateTime.local();
      const response = await fetch(`${BACKEND_IP}/clock/out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          dateTime: now,
        }),
      });
      const clock = await response.json();
      if (clock.updated) {
        dispatch(clock_out());
      } else {
        return new Error("Error: Could not clock out, try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const breakStart = (userId) => {
  return async (dispatch) => {
    try {
      /* dispatch(break_start()) */
    } catch (error) {
      console.log(error);
    }
  };
};
export const breakEnd = (userId) => {
  return async (dispatch) => {
    try {
      /* dispatch(break_end()) */
    } catch (error) {
      console.log(error);
    }
  };
};
export const setClock = (userId) => {
  return async (dispatch) => {
    const response = await fetch(`${BACKEND_IP}/clock/${userId}`);
    const clockStatus = await response.json();
    dispatch(set_clock(clockStatus));
  };
};
export const clearClock = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(clear_clock());
    } catch (error) {
      console.log(error);
    }
  };
};
