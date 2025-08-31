import {useState, type ReactNode} from "react";
import { ThemeContext } from "./contexts/ColorContext.ts";

export default function ColorProvider({ children }: { children: ReactNode }) {
      const [darkMode, setDarkMode] = useState(true);
      const [textColor, setTextColor] = useState("white");
      const [bgColor, setBgColor] = useState("#282c34");
      const [borderColor, setBorderColor] = useState("#d9d2d2");
      const [selectColor, setSelectColor] = useState("#4b5563");
      const [hoverSelectColor, setHoverSelectColor] = useState("#6b7280");
      const [buttonColor, setButtonColor] = useState("#0c52eb");
      const [hoverButtonColor, setHoverButtonColor] = useState("#679ef8");
      const [editIconColor, setEditIconColor] = useState("#608bea");
      const [markColor, setMarkColor] = useState("#e4de1b");

  const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        setTextColor(newMode ? "white" : "black");
        setBgColor(newMode ? "#282c34" : "#cdc9c9");
        setBorderColor(newMode ? "#d9d2d2" : "#282c34");
        setSelectColor(newMode ? "#4b5563" : "#f5f5f5");
        setHoverSelectColor(newMode ? "#6b7280" : "#e5e5e5");
        setButtonColor(newMode ? "#0c52eb" : "#282c34");
        setHoverButtonColor(newMode ? "#679ef8" :"#4c5057");
        setEditIconColor(newMode ? "#608bea" : "#282c34");
        setMarkColor(newMode ?  "#e4de1b": "#45c958");
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
          borderColor,
          setBorderColor,
          selectColor,
          setSelectColor,
          hoverSelectColor,
          setHoverSelectColor,
          buttonColor,
          setButtonColor,
          hoverButtonColor,
          setHoverButtonColor,
          editIconColor,
          setEditIconColor,
          markColor,
          setMarkColor,
      }}
    >
        {children}
    </ThemeContext.Provider>
  );
}