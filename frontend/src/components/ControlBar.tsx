import {useContext, useState} from "react";
import { ThemeContext } from "@/contexts/ColorContext.ts";
import "../style/ControlBarStyle.css";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {Toggle} from "@/components/ui/toggle.tsx";
import DatePicker from "@/components/DatePicker.tsx";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ControlSelectItem from "@/components/ControlSelectItem.tsx";

export default function ControlBar() {
    const { textColor } = useContext(ThemeContext);
    const { selectColor } = useContext(ThemeContext);
    const { hoverSelectColor } = useContext(ThemeContext);
    const { buttonColor } = useContext(ThemeContext);
    const { hoverButtonColor } = useContext(ThemeContext);
    const [fontSize] = useState("0.8rem");
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isToggleHovered, setIsToggleHovered] = useState(false);
    const [isSearchHovered, setIsSearchHovered] = useState(false);
    const [sortValue, setSortValue] = useState("name");
    const [statusValue, setStatusValue] = useState("all");
    const [direction, setDirection] = useState(false);

    const itemsStyle = {
        color: textColor,
        backgroundColor: selectColor,
        fontSize: fontSize,
    };

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
                <SelectTrigger className="control-bar-select" style={itemsStyle}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent style={itemsStyle}>
                    <ControlSelectItem value="date">Date</ControlSelectItem>
                    <ControlSelectItem value="name">Name</ControlSelectItem>
                    <ControlSelectItem value="created-at">Created at</ControlSelectItem>
                </SelectContent>
                </Select>
            </div>

            <div className="items-container">
                <Label htmlFor="status" style={{ color: textColor }}>Status:</Label>
                <Select value={statusValue} onValueChange={setStatusValue}>
                <SelectTrigger className="control-bar-select" style={itemsStyle}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent style={itemsStyle}>
                    <ControlSelectItem value="all">All</ControlSelectItem>
                    <ControlSelectItem value="completed">Completed</ControlSelectItem>
                    <ControlSelectItem value="pending">Pending</ControlSelectItem>
                    <ControlSelectItem value="in-progress">In Progress</ControlSelectItem>
                    <ControlSelectItem value="cancelled">Cancelled</ControlSelectItem>
                </SelectContent>
                </Select>
            </div>

            <div className="items-container">
                <Label htmlFor="sort" style={{color: textColor,}}>Search:</Label>
                <Input
                    className="control-bar-select"
                    type="text" placeholder="search"
                    style={{
                        ...itemsStyle,
                        borderColor: isSearchHovered ? "#3c6edb" : "transparent",
                        transition: "border-color 0.3s ease, transform 0.2s ease",
                    }}
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
            <Button
                className="control-bar-button"
                style={{color: textColor, backgroundColor: isButtonHovered ? hoverButtonColor : buttonColor}}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
            >
                Add Task
            </Button>
        </div>
        </div>
    )
}
