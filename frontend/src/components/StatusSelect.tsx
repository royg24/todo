import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {itemsStyle, TaskStatus, type TaskStatusType} from "@/components/Utils.ts";
import ControlSelectItem from "@/components/ControlSelectItem.tsx";
import {useEffect, useState} from "react";

interface StatusSelectProps {
    isAllIncluded?: boolean;
    value?: TaskStatusType
}

export default function StatusSelect({isAllIncluded = true, value = TaskStatus.PENDING}: StatusSelectProps) {
    const [statusValue, setStatusValue] = useState(isAllIncluded ? "all" : "pending");

    useEffect(() => {
        if (value) {
            setStatusValue(value.value)
        }
    })

    return (
        <Select value={statusValue} onValueChange={setStatusValue}>
            <SelectTrigger className="control-bar-select" style={itemsStyle()}>
                <SelectValue/>
            </SelectTrigger>
            <SelectContent style={itemsStyle()}>
                {isAllIncluded ? <ControlSelectItem value="all">All</ControlSelectItem> : null}
                <ControlSelectItem value={TaskStatus.COMPLETED.value}>Completed</ControlSelectItem>
                <ControlSelectItem value={TaskStatus.PENDING.value}>Pending</ControlSelectItem>
                <ControlSelectItem value={TaskStatus.IN_PROGRESS.value}>In Progress</ControlSelectItem>
                <ControlSelectItem value={TaskStatus.CANCELLED.value}>Cancelled</ControlSelectItem>
            </SelectContent>
        </Select>
    )
}