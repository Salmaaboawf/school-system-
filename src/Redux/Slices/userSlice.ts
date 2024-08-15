import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../components/Nav";
export interface UserState {
  user: UserType;
}

const initialState: UserState = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    age: 0,
    type: "",
  },
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
