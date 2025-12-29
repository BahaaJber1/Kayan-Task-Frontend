import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@store/slices/theme.js";

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export { store };
