import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    role: "",
    name: "",
    email: "",
  },
  doctors: [],
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
    setDoctor(state, action) {
      state.doctors = action.payload;
    },
  },
});

const userReducer = userSlice.reducer;
export const { setUser, clearUser, setDoctor } = userSlice.actions;
export default userReducer;
