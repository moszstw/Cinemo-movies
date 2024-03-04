import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movie/slice";
import userReducer from "./user/slice";

const store = configureStore({
  reducer: {
    moviesReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
