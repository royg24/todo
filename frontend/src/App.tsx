import { useContext } from "react";
import TaskBoard from "./components/TaskBoard.tsx";
import DarkModeToggle from "@/components/DarkModeToggle.tsx";
import { ThemeContext } from "@/contexts/ColorContext";

function App() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <>
      <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
      <TaskBoard />
    </>
  );
}

export default App;
