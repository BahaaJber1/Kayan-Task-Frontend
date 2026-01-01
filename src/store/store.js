import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@store/slices/theme.slice.js";
import userReducer from "@store/slices/user.slice.js";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});

export { store };
