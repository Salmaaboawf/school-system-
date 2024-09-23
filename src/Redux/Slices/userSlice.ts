import { createSlice } from "@reduxjs/toolkit";
import { BaseUserType } from "../../utils/types";
export interface UserState {
  user: BaseUserType;
}

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    // name: "",
    gender: "",
    email: "",
    role: "",

    ////////////////////////
    photoURL: "",
    phoneNumber: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    resetUser: (state) => {
      state.user = {
        id: "",
        name: "",
        gender: "",
        email: "",
        role: "",
        photoURL: "",
        phoneNumber: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
