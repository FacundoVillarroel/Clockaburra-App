import { createSlice } from '@reduxjs/toolkit';
import { BACKEND_IP } from '@env';

const initialState = {
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
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set_user: (state, action) => {
      return action.payload;
    },
    update_user: (state, action) => {
      return { ...state, ...action.payload };
    },
    clear_user: (state, action) => {
      state.user = initialState;
    },
  },
});

export const { set_user, update_user, clear_user } = userSlice.actions;

export default userSlice.reducer;

export const setUser = (userId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BACKEND_IP}/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const { user } = await response.json();
      dispatch(set_user(user));
    } catch (error) {
      console.error('setUser: ', error);
    }
  };
};

export const updateUser = (userUpdate, userId, token, setLoading) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      // If there is an image, it is sent to the backend, which stores it and returns its URL, which is added to the userUpdate
      if (userUpdate.image) {
        const formData = new FormData();
        const fileName = userUpdate.image.split('/').pop();

        const fileType = fileName.split('.').pop();

        formData.append('image', {
          uri: userUpdate.image,
          name: fileName,
          type: `image/${fileType}`,
        });
        const response = await fetch(`${BACKEND_IP}/images`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        const imageUrl = await response.json();
        userUpdate.image = imageUrl;
      }
      // UserUpdate is sent to the backend
      const response = await fetch(`${BACKEND_IP}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userUpdate),
      });
      const data = await response.json();
      if (data.updated) {
        dispatch(update_user(userUpdate));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('updateUser: ', error);
    }
  };
};

export const clearUser = () => {
  return async (dispatch) => {
    try {
      dispatch(clear_user());
    } catch (error) {
      console.error('clearUser: ', error);
    }
  };
};
