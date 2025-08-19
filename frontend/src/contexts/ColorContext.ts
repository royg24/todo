import { createContext, type Dispatch, type SetStateAction } from "react";

export const DarkModeContext = createContext<{
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  toggleDarkMode: () => void;
}>({
  darkMode: false,
  setDarkMode: () => {},
  toggleDarkMode: () => {},
});

export const TextColorContext = createContext<{
  textColor: string;
  setTextColor: Dispatch<SetStateAction<string>>;
}>({
  textColor: "black",
  setTextColor: () => {},
});

export const BackgroundColorContext = createContext<{
  bgColor: string;
  setBgColor: Dispatch<SetStateAction<string>>;
}>({
  bgColor: "white",
  setBgColor: () => {},
});
