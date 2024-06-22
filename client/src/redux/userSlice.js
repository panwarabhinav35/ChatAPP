import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  token: null,
  onlineUser: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
  },
});

export const { setToken, setUser, logout, setOnlineUser } =
  userSlice.actions;
export const loggedInUser = (state) => state.user.userInfo;
export const loggedInToken = (state) => state.user.token;
export const onLineUser = (state) => state.user.onlineUser;
export default userSlice.reducer;
