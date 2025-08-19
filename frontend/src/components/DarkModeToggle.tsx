import type { FC } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { FaSun, FaMoon } from "react-icons/fa";
import "../style/DarkModeToggleStyle.css";

interface DarkModeToggleProps {
	darkMode: boolean;
	onToggle: () => void;
}

const DarkModeToggle: FC<DarkModeToggleProps> = ({ darkMode, onToggle }) => {
	return (
		<SwitchPrimitive.Root
			className="dark-mode-toggle"
			checked={darkMode}
			onCheckedChange={onToggle}
		>
			<SwitchPrimitive.Thumb className="toggle-circle">
				{darkMode ? (
					<FaMoon className="h-4 w-4 text-black-200" />
				) : (
					<FaSun className="h-4 w-4 text-white" />
				)}
			</SwitchPrimitive.Thumb>
		</SwitchPrimitive.Root>
	);
};

export default DarkModeToggle;
