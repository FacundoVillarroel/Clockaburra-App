import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    log_in: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    log_out: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { log_in, log_out } = authSlice.actions;

export default authSlice.reducer;

export const login = (email, password, setLoading) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.0.90:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const user = await response.json();
      if (!user.token) {
        setLoading(false);
        return { isError: true, message: "Email o contraseña inválidos" };
      }
      delete user.message;
      dispatch(log_in(user));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
};
