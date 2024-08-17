import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import gradesReducer from "./Slices/subjectSlice"

export const Store = configureStore({
  reducer: {
    user: userReducer,
    grades :gradesReducer
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
