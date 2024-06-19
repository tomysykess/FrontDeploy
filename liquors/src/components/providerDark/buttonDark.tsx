import React from "react";
import { useTheme } from "./ProviderDark";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? (
        <DarkModeIcon className="text-white"></DarkModeIcon>
      ) : (
        <DarkModeIcon className="text-wine"></DarkModeIcon>
      )}
    </button>
  );
};

export default ThemeToggleButton;
