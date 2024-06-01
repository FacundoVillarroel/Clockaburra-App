import { createSlice } from "@reduxjs/toolkit";
import { saveToken, deleteToken, decodeToken } from "../../helpers/jwtHelpers";

import { BACKEND_IP } from "@env";

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
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
    },
    log_out: (state) => {
      state.token = null;
      state.userId = null;
      state.name = null;
    },
    set_token: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
    },
  },
});

export const { log_in, log_out, set_token } = authSlice.actions;

export default authSlice.reducer;

export const login = (email, password, setLoading) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_IP}/auth/login`, {
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
      const token =
        response.headers.get("Authorization")?.split(" ")[1] || null;
      if (!token) {
        setLoading(false);
        return { isError: true, message: "Email o contraseña inválidos" };
      }
      delete user.message;
      await saveToken(token);
      dispatch(log_in({ ...user, token }));
      setLoading(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const setToken = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BACKEND_IP}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        dispatch(
          set_token({
            token: null,
            userId: null,
            name: null,
          })
        );
      }
      const user = await response.json();
      const renewedToken = response.headers.get("Authorization").split(" ")[1];
      dispatch(
        set_token({
          token: renewedToken,
          userId: user.userId,
          name: user.userName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await deleteToken();
      dispatch(log_out());
    } catch (error) {
      console.log(error);
    }
  };
};
