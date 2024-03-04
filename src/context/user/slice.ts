import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  username: string;
  password: string;
  keepLoggedin?: boolean;
}

interface AppState {
  user: User | null;
}

const storedUserString = localStorage.getItem("user")
  ? localStorage.getItem("user")
  : sessionStorage.getItem("user");
const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

const initialState: AppState = {
  user: storedUser ? storedUser : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
