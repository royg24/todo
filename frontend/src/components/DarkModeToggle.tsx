import {type FC} from "react";
import { Toggle } from "@/components/ui/toggle"
import { FaSun, FaMoon } from "react-icons/fa";
import "../style/DarkModeToggleStyle.css";

interface DarkModeToggleProps {
	darkMode: boolean;
	isMenuItem?: boolean;
	onToggle: () => void;
}

const DarkModeToggle: FC<DarkModeToggleProps> = ({ darkMode, isMenuItem = false, onToggle }) => {

	return (
		<Toggle
			className={`dark-mode-toggle ${isMenuItem ? "dark-mode-absolute" : ""}`}
			pressed={darkMode}
			onPressedChange={onToggle}
            style={{borderColor: "transparent", outline: 'none', boxShadow: 'none'}}
		>
            {darkMode ? (
                    <FaSun className="!h-6 !w-6 text-white"/>
                ) : (
                    <FaMoon className="!h-6 !w-6 text-black"/>
            )}
		</Toggle>
	);
};

export default DarkModeToggle;
