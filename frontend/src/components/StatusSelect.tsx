import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {itemsStyle, TaskStatus, type TaskStatusType} from "@/components/Utils.ts";
import ControlSelectItem from "@/components/ControlSelectItem.tsx";
import {useContext, useEffect, useState} from "react";
import {TasksContext} from "@/contexts/TasksContext.tsx";

interface StatusSelectProps {
    isAllIncluded?: boolean;
    value?: TaskStatusType
}

export default function StatusSelect({isAllIncluded = true, value = undefined}: StatusSelectProps) {
    const [statusValue, setStatusValue] = useState(isAllIncluded ? "all" : "pending");
    const { setStatusFilter } = useContext(TasksContext);

    const filter = (value: string) => {
        setStatusValue(value)
        setStatusFilter(value)
    }

    useEffect(() => {
        if (value) {
            setStatusValue(value.value)
        }
    }, [value])

    return (
        <Select value={statusValue} onValueChange={filter}>
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