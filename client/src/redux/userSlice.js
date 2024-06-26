import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  token: null,
  onlineUser: [],
  dataUser: {
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    msgSent: false,
  },
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
      state.dataUser = {
        _id: "",
        name: "",
        email: "",
        profile_pic: "",
        online: false,
      };
      state.onlineUser = [];
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
    setDataUser: (state, action) => {
      state.dataUser = action.payload;
    },
    setMsgSent: (state, action) => {
      state.msgSent = action.payload;
    },
  },
});

export const {
  setToken,
  setUser,
  logout,
  setOnlineUser,
  setDataUser,
  setMsgSent,
} = userSlice.actions;
export const loggedInUser = (state) => state.user.userInfo;
export const loggedInToken = (state) => state.user.token;
export const onLineUser = (state) => state.user.onlineUser;
export const DataUser = (state) => state.user.dataUser;
export const MsgSent = (state) => state.user.msgSent;
export default userSlice.reducer;
