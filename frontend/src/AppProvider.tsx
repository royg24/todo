import { useState, type ReactNode } from "react";
import {
  DarkModeContext,
  TextColorContext,
  BackgroundColorContext,
} from "./contexts/ColorContext.ts";

export default function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [textColor, setTextColor] = useState("black");
  const [bgColor, setBgColor] = useState("white");

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    setTextColor(newMode ? "white" : "black");
    setBgColor(newMode ? "#282c34" : "white");
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      <TextColorContext.Provider value={{ textColor, setTextColor: setTextColor }}>
        <BackgroundColorContext.Provider value={{ bgColor, setBgColor }}>
          {children}
        </BackgroundColorContext.Provider>
      </TextColorContext.Provider>
    </DarkModeContext.Provider>
  );
}
