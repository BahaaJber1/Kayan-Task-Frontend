import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@store/slices/theme.js";
import { Moon, Sun } from "lucide-react";
import MotionButton from "@components/application/MotionButton.jsx";

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
