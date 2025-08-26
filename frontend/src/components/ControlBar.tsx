import {useContext, useState} from "react";
import { ThemeContext } from "@/contexts/ColorContext.ts";
import { itemsStyle, inputStyle } from "@/components/Utils.ts";
import "../style/ControlBarStyle.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle.tsx";
import TaskDialog from "@/components/TaskDialog.tsx";
import DatePicker from "@/components/DatePicker.tsx";
import StatusSelect from "@/components/StatusSelect.tsx";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ControlSelectItem from "@/components/ControlSelectItem.tsx";
import TodoButton from "@/components/TodoButton.tsx";

export default function ControlBar() {
    const { textColor, selectColor, hoverSelectColor } = useContext(ThemeContext);
    const [isToggleHovered, setIsToggleHovered] = useState(false);
    const [isSearchHovered, setIsSearchHovered] = useState(false);
    const [sortValue, setSortValue] = useState("name");
    const [direction, setDirection] = useState(false);

    const onToggle = () => setDirection(prev => !prev);

    return (
        <div className="control-bar">
            <div className="toggle-container">
                <Toggle
                    aria-label="Toggle italic"
                    style={{
                        borderColor: "black",
                        width: "0.1rem",
                        height: "1.5rem",
                        backgroundColor: isToggleHovered ? hoverSelectColor : selectColor,
                        color: textColor
                    }}
                    onClick={onToggle}
                    onMouseEnter={() => setIsToggleHovered(true)}
                    onMouseLeave={() => setIsToggleHovered(false)}
                >{direction ? "↓" : "↑"}</Toggle>
            </div>
        <div className="control-bar-filters">

            <div className="items-container">
                <Label htmlFor="sort" style={{ color: textColor }}>Sort By:</Label>
                <Select value={sortValue} onValueChange={setSortValue}>
                <SelectTrigger className="control-bar-select" style={itemsStyle()}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent style={itemsStyle()}>
                    <ControlSelectItem value="date">Date</ControlSelectItem>
                    <ControlSelectItem value="name">Name</ControlSelectItem>
                    <ControlSelectItem value="created-at">Created at</ControlSelectItem>
                </SelectContent>
                </Select>
            </div>

            <div className="items-container">
                <Label htmlFor="status" style={{ color: textColor }}>Status:</Label>
                <StatusSelect />
            </div>

            <div className="items-container">
                <Label htmlFor="sort" style={{color: textColor}}>Search:</Label>
                <Input
                    className="control-bar-select"
                    type="text" placeholder="search"
                    style={inputStyle(itemsStyle() ,isSearchHovered)}
                    onMouseEnter={() => setIsSearchHovered(true)}
                    onMouseLeave={() => setIsSearchHovered(false)}
                />
            </div>

            <div className="items-container">
                <Label htmlFor="sort" style={{ color: textColor }}>Search By Date:</Label>
                <DatePicker />
            </div>
        </div>

        <div>
            <TaskDialog header="Create New Task">
                <TodoButton buttonText="Add Task"/>
            </TaskDialog>
        </div>
        </div>
    )
}
