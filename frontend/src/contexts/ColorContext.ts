import { createContext, type Dispatch, type SetStateAction } from "react";

export interface ThemeContextType {
    darkMode: boolean;
    setDarkMode: Dispatch<SetStateAction<boolean>>;
    toggleDarkMode: () => void;

    textColor: string;
    setTextColor: Dispatch<SetStateAction<string>>;

    bgColor: string;
    setBgColor: Dispatch<SetStateAction<string>>;

    borderColor: string;
    setBorderColor: Dispatch<SetStateAction<string>>;

    selectColor: string;
    setSelectColor: Dispatch<SetStateAction<string>>;

    hoverSelectColor: string;
    setHoverSelectColor: Dispatch<SetStateAction<string>>;

    buttonColor?: string;
    setButtonColor?: Dispatch<SetStateAction<string>>;

    hoverButtonColor?: string;
    setHoverButtonColor?: Dispatch<SetStateAction<string>>;

    editIconColor?: string;
    setEditIconColor?: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType>({
    darkMode: true,
    setDarkMode: () => {},
    toggleDarkMode: () => {},

    textColor: "black",
    setTextColor: () => {},

    bgColor: "white",
    setBgColor: () => {},

    borderColor: "black",
    setBorderColor: () => {},

    selectColor: "#f5f5f5",
    setSelectColor: () => {},

    hoverSelectColor: "#e5e5e5",
    setHoverSelectColor: () => {},

    buttonColor: "#3b82f6",
    setButtonColor: () => {},

    hoverButtonColor: "#2563eb",
    setHoverButtonColor: () => {},

    editIconColor: "#3b82f6",
    setEditIconColor: () => {},

});
