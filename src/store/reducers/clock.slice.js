import { createSlice } from "@reduxjs/toolkit";

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
    clean_clock: (state, action) => {
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
  clean_clock,
} = clockSlice.actions;

export default clockSlice.reducer;

export const clockIn = (userId) => {
  return async (dispatch) => {
    /* dispatch(clock_in()) */
  };
};

export const clockOut = (userId) => {
  return async (dispatch) => {
    /* dispatch(clock_out()) */
  };
};
export const breakStart = (userId) => {
  return async (dispatch) => {
    /* dispatch(break_start()) */
  };
};
export const breakEnd = (userId) => {
  return async (dispatch) => {
    /* dispatch(break_end()) */
  };
};
export const setClock = (userId) => {
  return async (dispatch) => {
    const response = await fetch(`${BACKEND_IP}/clock/${userId}`);
    const clockStatus = await response.json();
    dispatch(set_clock(clockStatus));
  };
};
export const cleanClock = (userId) => {
  return async (dispatch) => {
    /* dispatch(clean_clock()) */
  };
};
