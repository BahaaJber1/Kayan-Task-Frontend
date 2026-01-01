import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    role: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state = initialState;
    },
  },
});

const userReducer = userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
export default userReducer;
