import { useContext, useState } from "react";
import { ThemeContext } from "@/contexts/ColorContext.ts";
import { itemsStyle, inputStyle } from "@/components/Utils.tsx";
import "../style/ControlBarStyle.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle.tsx";
import { Button } from "@/components/ui/button";
import TaskDialog from "@/components/TaskDialog.tsx";
import DatePicker from "@/components/DatePicker.tsx";
import StatusSelect from "@/components/StatusSelect.tsx";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import ControlSelectItem from "@/components/ControlSelectItem.tsx";
import TodoButton from "@/components/TodoButton.tsx";
import { TasksContext} from "@/contexts/TasksContext.ts";
import * as React from "react";
import { X } from "lucide-react";

export default function ControlBar() {
	const { textColor, selectColor, hoverSelectColor } = useContext(ThemeContext);
    const { setSort, setSortDirection, searchText, setSearchText } = useContext(TasksContext);
	const [isToggleHovered, setIsToggleHovered] = useState(false);
	const [isSearchHovered, setIsSearchHovered] = useState(false);
	const [sortValue, setSortValue] = useState("createdAt");
	const [direction, setDirection] = useState(true);

	const handleToggle = () => {
        setDirection(prev => !prev);
        setSortDirection(direction);
    };

    const handleSort = (value: string) => {
        setSortValue(value);
        setSort(value);
    }

    const handleSearch = (value: string) => {
        setSearchText(value);
    }

	return (
		<div className="control-bar-wrapper">

			{/* Top row: Toggle + Add Task */}
			<div className="control-bar-top">
				<div className="toggle-container">
					<Toggle
						aria-label="Toggle sort direction"
						style={{
							borderColor: "black",
							width: "0.15rem",
							height: "1.5rem",
							backgroundColor: isToggleHovered ? hoverSelectColor : selectColor,
							color: textColor,
                            outline: "none",
						}}
						onClick={handleToggle}
						onMouseEnter={() => setIsToggleHovered(true)}
						onMouseLeave={() => setIsToggleHovered(false)}
					>
						{direction ? "↓" : "↑"}
					</Toggle>
				</div>

				<div className="add-task-container">
					<TaskDialog header="Create New Task">
						<TodoButton buttonText="Add Task" />
					</TaskDialog>
				</div>
			</div>

			{/* Bottom row: Controls */}
			<div className="control-bar-grid">
				<div className="items-container">
					<Label htmlFor="sort" style={{ color: textColor }}>Sort By:</Label>
					<Select value={sortValue} onValueChange={handleSort}>
						<SelectTrigger className="control-bar-select" style={itemsStyle()}>
							<SelectValue />
						</SelectTrigger>
						<SelectContent style={itemsStyle()}>
							<ControlSelectItem value="dueDate">Due Date</ControlSelectItem>
							<ControlSelectItem value="name">Name</ControlSelectItem>
							<ControlSelectItem value="createdAt">Created at</ControlSelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="items-container">
					<Label htmlFor="status" style={{ color: textColor }}>Status:</Label>
					<StatusSelect />
				</div>

				<div className="items-container">
					<Label htmlFor="search" style={{ color: textColor }}>Search:</Label>
					<div style={{display: "flex", flexDirection: "row", position: "relative"}}>
						<Input
							className="control-bar-select"
							type="text"
							placeholder="search"
							value={searchText}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
							style={inputStyle(itemsStyle(), isSearchHovered)}
							onMouseEnter={() => setIsSearchHovered(true)}
							onMouseLeave={() => setIsSearchHovered(false)}
						/>
						<Button variant="ghost" size="icon"
								className="absolute right-1/6 !bg-transparent hover:!bg-gray-500 !border-none !outline-none"
								onClick={() => setSearchText("")}
						>
							<X style={{color: textColor}} />
						</Button>
					</div>
				</div>

				<div className="items-container">
					<Label htmlFor="date" style={{ color: textColor }}>Search By Due Date:</Label>
					<DatePicker />
				</div>
			</div>
		</div>
	);
}
