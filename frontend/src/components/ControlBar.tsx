import { useContext } from "react"
import { TextColorContext } from "@/contexts/ColorContext.ts"
import "../style/ControlBarStyle.css"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ControlBar() {
  const { textColor } = useContext(TextColorContext)

  return (
    <div className="control-bar">
      <div className="control-bar-filters">

        <Label htmlFor="sort" style={{ color: textColor }}>
          Sort By:
        </Label>
        <Select>
          <SelectTrigger className="control-bar-select" style={{ color: textColor }}>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="created-at">Created at</SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Label htmlFor="status" style={{ color: textColor }}>
          Status:
        </Label>
        <Select>
          <SelectTrigger className="control-bar-select" style={{ color: textColor }}>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right: Action button */}
      <div>
        <Button className="control-bar-button">Add Task</Button>
      </div>
    </div>
  )
}
