import { createSlice } from "@reduxjs/toolkit";
import { saveToken, deleteToken, decodeToken } from "../../helpers/jwtHelpers";

const initialState = {
  token: null,
  userId: null,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    log_in: (state, action) => {
      saveToken(action.payload.token);
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
    },
    log_out: (state) => {
      deleteToken();
      state.token = null;
      state.userId = null;
      state.name = null;
    },
    set_user: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
    },
  },
});

export const { log_in, log_out, set_user } = authSlice.actions;

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
      const token = response.headers.get("Authorization").split(" ")[1];
      if (!token) {
        setLoading(false);
        return { isError: true, message: "Email o contraseña inválidos" };
      }
      delete user.message;
      dispatch(log_in({ ...user, token }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUser = (token) => {
  return async (dispatch) => {
    try {
      const decodedToken = decodeToken(token);
      dispatch(
        set_user({
          token,
          userId: decodedToken.userId,
          name: decodedToken.userName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
