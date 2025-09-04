import ProfileMenu from "@/components/ProfileMenu.tsx";
import DarkModeToggle from "@/components/DarkModeToggle.tsx";
import {useContext} from "react";
import {ThemeContext} from "@/contexts/ColorContext.ts";

export default function Menu() {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    return(
        <div className="menu-container">
            <ProfileMenu />
            <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
        </div>
    )
}