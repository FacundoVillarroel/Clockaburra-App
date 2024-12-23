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
      console.error('userSlice.js, setUser: ', error);
    }
  };
};

export const updateUser = (
  userUpdate,
  userId,
  token,
  setLoading,
  oldImageUrl = ''
) => {
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
        const filePath = oldImageUrl
          ? oldImageUrl.split('/o/')[1].split('?')[0]
          : '';
        formData.append('filePath', filePath);

        const response = await fetch(`${BACKEND_IP}/images/profile-images`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) {
          return alert('An error has occured, please try again later');
        }
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
      console.error('userSlice.js, updateUser: ', error);
    }
  };
};

export const clearUser = () => {
  return async (dispatch) => {
    try {
      dispatch(clear_user());
    } catch (error) {
      console.error('userSlice.js, clearUser: ', error);
    }
  };
};
