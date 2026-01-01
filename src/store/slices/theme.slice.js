import { createSlice } from "@reduxjs/toolkit";

const root = window.document.documentElement;
const startTheme =
  localStorage.getItem("theme") ??
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

const initialState = {
  theme: startTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setStartTheme: (state) => {
      root.classList.remove("light", "dark");
      localStorage.setItem("theme", state.theme);
      root.classList.add(state.theme);
    },
    setTheme: (state, action) => {
      const selectedTheme = action.payload;
      let theme = selectedTheme;
      if (selectedTheme === "system")
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      localStorage.setItem("theme", theme);
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      state.theme = theme;
    },
  },
});

const themeReducer = themeSlice.reducer;

export const { setStartTheme, setTheme } = themeSlice.actions;
export default themeReducer;
