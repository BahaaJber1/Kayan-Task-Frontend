import MotionButton from "@components/application/MotionButton.jsx";
import { setTheme } from "@store/slices/theme.slice.js";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const ToggleTheme = () => {
  const dispatch = useDispatch();
  const { theme: currentTheme } = useSelector((state) => state.theme);

  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
  };

  return (
    <MotionButton onClick={toggleTheme} variant="ghost" size="icon">
      {currentTheme === "dark" ? <Sun /> : <Moon />}
    </MotionButton>
  );
};

export default ToggleTheme;
