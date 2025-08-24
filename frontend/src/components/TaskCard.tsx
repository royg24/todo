
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {type TaskStatusType} from "@/components/Utils.ts";
import TodoButton from "@/components/TodoButton.tsx";
import {itemsStyle} from "@/components/Utils.ts";
import {useContext} from "react";
import {ThemeContext} from "@/contexts/ColorContext.ts";
import TaskDialog from "@/components/TaskDialog.tsx";

interface TaskCardProps {
    name: string;
    description: string;
    status: TaskStatusType;
    dueDate: Date;
}

export default function TaskCard(details: TaskCardProps) {
    const { textColor } = useContext(ThemeContext);

    return (
      <Card className="w-full h-14 p-0" style={{...itemsStyle(), borderColor: "black"}}>
        <CardContent className="p-0 h-full">
            <div className="flex flex-row flex-wrap divide-x h-full">
                <div
                    className="flex-1 px-2 flex items-center justify-center h-full"
                    style={{borderColor: textColor}}>
                    {details.name}
                </div>
                <div
                    className="flex-1 px-2 flex items-center justify-center h-full"
                    style={{borderColor: textColor}}>
                    <TodoButton buttonText="Description"  className="min-h-0 py-0 text-sm" />
                </div>
                <div
                    className="flex-1 px-2 flex items-center justify-center h-full"
                    style={{borderColor: textColor}}>
                    {details.status.toString().toUpperCase()}
                </div>
                <div 
                    className="flex-1 px-2 flex items-center justify-center h-full"
                    style={{borderColor: textColor}}>
                    {details.dueDate.toLocaleDateString("en-GB")}
                </div>
                <div 
                    className="flex-1 px-2 flex items-center justify-center h-full gap-2"
                    style={{borderColor: textColor}}>
                    <TodoButton buttonText="🗑️" className="py-0 px-2 text-sm" />
                    <TaskDialog
                        header="Edit Task"
                        isEdit={true}
                        name={details.name}
                        description={details.description}
                        dueDate={details.dueDate}
                        status={details.status}>
                        <TodoButton buttonText="🖉" className="py-0 px-2 text-sm" />
                    </TaskDialog>
                </div>
            </div>
        </CardContent>
     </Card>
    )
}
