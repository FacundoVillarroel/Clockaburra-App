import { createSlice } from "@reduxjs/toolkit";
import { BACKEND_IP } from "@env";

const initialState = {
  user: {
    address: null,
    email: null,
    id: null,
    isRegistered: null,
    name: null,
    phoneNumber: null,
    rol: null,
    startDate: null,
    surname: null,
    username: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set_user: (state, action) => {
      state.user = action.payload;
    },
    clear_user: (state, action) => {
      state.user = initialState;
    },
  },
});

export const { set_user, clear_user } = userSlice.actions;

export default userSlice.reducer;

export const setUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BACKEND_IP}/users/${userId}`);
      const { user } = await response.json();
      dispatch(set_user(user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearUser = () => {
  return async (dispatch) => {
    try {
      dispatch(clear_user());
    } catch (error) {
      console.log(error);
    }
  };
};
