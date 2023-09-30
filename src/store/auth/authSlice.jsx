import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: {
      email: null,
      role: null,
      photoProfile: null,
      isLoginBySocial: false,
      isRegisterBySocial: false,
      isVerified: false,
    },
    isAuthenticated: false,
  },
  reducers: {
    addUser: (state, { payload }) => {
      state.user = {
        email: payload.email,
        role: payload.role,
        isLoginBySocial: payload.isLoginBySocial,
        isRegisterBySocial: payload.isRegisterBySocial,
        isVerified: payload.is_verified,
      };
      if (payload.Profile && payload.Profile.profile_picture) {
        const { profile_picture } = payload.Profile;
        const image = profile_picture;
        state.user.photoProfile = image;
      } else {
        state.user.photoProfile =
          "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
      }
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { logout, addUser } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
