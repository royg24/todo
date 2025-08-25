import {type FC, useContext} from "react";
import { Toggle } from "@/components/ui/toggle"
import { FaSun, FaMoon } from "react-icons/fa";
import "../style/DarkModeToggleStyle.css";
import {ThemeContext} from "@/contexts/ColorContext.ts";

interface DarkModeToggleProps {
	darkMode: boolean;
	onToggle: () => void;
}

const DarkModeToggle: FC<DarkModeToggleProps> = ({ darkMode, onToggle }) => {
    const { textColor } = useContext(ThemeContext)

	return (
		<Toggle
			className="dark-mode-toggle"
			pressed={darkMode}
			onPressedChange={onToggle}
            style={{backgroundColor: textColor, borderColor: textColor, outline: 'none'}}
		>
            {darkMode ? (
                    <FaSun className="h-4 w-4 text-black-200"/>
                ) : (
                    <FaMoon className="h-4 w-4 text-white"/>
            )}
		</Toggle>
	);
};

export default DarkModeToggle;
