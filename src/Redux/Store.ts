import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import levelsReducer from "./Slices/levelsSlice";

export const Store = configureStore({
  reducer: {
    user: userReducer,
    levels: levelsReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
