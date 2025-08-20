import { useState, type ReactNode } from "react";
import { ThemeContext } from "./contexts/ColorContext.ts";

export default function AppProvider({ children }: { children: ReactNode }) {
      const [darkMode, setDarkMode] = useState(false);
      const [textColor, setTextColor] = useState("black");
      const [bgColor, setBgColor] = useState("white");
      const [selectColor, setSelectColor] = useState("#f5f5f5");
      const [hoverSelectColor, setHoverSelectColor] = useState("#e5e5e5");
      const [buttonColor, setButtonColor] = useState("#3b82f6");
      const [hoverButtonColor, setHoverButtonColor] = useState("#2563eb");

  const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        setTextColor(newMode ? "white" : "black");
        setBgColor(newMode ? "#282c34" : "#d9d5d5");
        setSelectColor(newMode ? "#4b5563" : "#f5f5f5");
        setHoverSelectColor(newMode ? "#6b7280" : "#e5e5e5");
        setButtonColor(newMode ? "#0c52eb" : "#3b82f6");
        setHoverButtonColor(newMode ? "#679ef8" : "#aec8ff");
  };

  return (
    <ThemeContext.Provider
      value={{
          darkMode,
          setDarkMode,
          toggleDarkMode,
          textColor,
          setTextColor,
          bgColor,
          setBgColor,
          selectColor,
          setSelectColor,
          hoverSelectColor,
          setHoverSelectColor,
          buttonColor,
          setButtonColor,
          hoverButtonColor,
          setHoverButtonColor
      }}
    >
        {children}
    </ThemeContext.Provider>
  );
}
