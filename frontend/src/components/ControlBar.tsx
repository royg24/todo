import { useContext, useState } from "react"
import { ThemeContext } from "@/contexts/ColorContext.ts"
import "../style/ControlBarStyle.css"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import DatePicker from "@/components/DatePicker.tsx"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ControlSelectItem from "@/components/ControlSelectItem.tsx";

export default function ControlBar() {
    const { textColor } = useContext(ThemeContext);
    const { selectColor } = useContext(ThemeContext);
    const { buttonColor } = useContext(ThemeContext);
    const { hoverButtonColor } = useContext(ThemeContext);
    const [fontSize] = useState("0.8rem");
    const [isHovered, setIsHovered] = useState(false);

    const itemsStyle = {
        color: textColor,
        backgroundColor: selectColor,
        fontSize: fontSize,
    }

    return (
        <div className="control-bar">
        <div className="control-bar-filters">

            <div className="items-container">
                <Label htmlFor="sort" style={{ color: textColor }}>Sort By:</Label>
                <Select>
                <SelectTrigger className="control-bar-select" style={itemsStyle}>
                    <SelectValue placeholder="Select filter" />
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
                <Select>
                <SelectTrigger className="control-bar-select" style={itemsStyle}>
                    <SelectValue placeholder="Select status" />
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
                <Label htmlFor="sort" style={{ color: textColor }}>Search:</Label>
                <Input className="control-bar-select" type="text" placeholder="search" style={itemsStyle} />
            </div>

            <div className="items-container">
                <Label htmlFor="sort" style={{ color: textColor }}>Search By Date:</Label>
                <DatePicker />
            </div>
        </div>

        <div>
            <Button
                className="control-bar-button"
                style={{color: textColor, backgroundColor: isHovered ? hoverButtonColor : buttonColor}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                Add Task
            </Button>
        </div>
        </div>
    )
}
