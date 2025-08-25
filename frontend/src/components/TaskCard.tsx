
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import "@/style/TaskCard.css"
import {type TaskStatusType} from "@/components/Utils.ts";
import TodoButton from "@/components/TodoButton.tsx";
import {itemsStyle} from "@/components/Utils.ts";
import TaskDialog from "@/components/TaskDialog.tsx";
import { Button } from "@/components/ui/button";
import {Pencil, Trash2} from "lucide-react";
import {useContext} from "react";
import {ThemeContext} from "@/contexts/ColorContext.ts";
import * as React from "react";
import DescriptionPopup from "@/components/DescriptionPopup.tsx";

interface TaskCardProps {
    name: string;
    description: string;
    status: TaskStatusType;
    dueDate: Date;
}

export default function TaskCard(details: TaskCardProps) {
    const { buttonColor, selectColor, hoverSelectColor } = useContext(ThemeContext);
    const sectionStyle = "flex-1 px-2 flex items-center justify-center h-full";
    const cardFontStyle = {
        fontSize: "1rem",
        fontWeight: 600,
        fontFamily: "'Segue UI', Tahoma, Geneva, Verdana, sans-serif"
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.backgroundColor = hoverSelectColor;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.backgroundColor = selectColor;
    };

    return (
      <Card
          className="w-full h-14 p-0
            shadow-sm
            hover:shadow-md hover:-translate-y-0.5
            transition-all duration-300 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{...itemsStyle(), borderColor: "black", margin: 1}}>
        <CardContent className="p-0 h-full">
            <div className="flex flex-row flex-wrap h-full">
                <div
                    className={sectionStyle}
                    style={{...cardFontStyle, justifyContent: 'flex-start', paddingLeft: 10}}>
                    {details.name}
                </div>
                <div
                    className={sectionStyle}
                    style={{...cardFontStyle}}>
                    <DescriptionPopup
                        text={details.description}
                        trigger={
                            <TodoButton buttonText="Description" className="min-h-0 py-0 text-sm" />
                        }
                    />
                </div>
                <div
                    className={sectionStyle}
                    style={{...cardFontStyle, color: details.status.color}}>
                    {details.status.value.toString().toUpperCase()}
                </div>
                <div
                    className={sectionStyle}
                    style={cardFontStyle}>
                    {details.dueDate.toLocaleDateString("en-GB")}
                </div>
                <div className={`${sectionStyle} gap-2`}>
                    <Button variant="ghost" size="icon" className="icon-style" style={{outline: 'none'}}>
                        <Trash2 className="h-5 w-5 text-red-500 hover:text-red-800" />
                    </Button>
                    <TaskDialog
                        header="Edit Task"
                        isEdit={true}
                        name={details.name}
                        description={details.description}
                        dueDate={details.dueDate}
                        status={details.status}>
                        <Button variant="ghost" size="icon" style={{color: buttonColor, outline: 'none'}} className="icon-style">
                            <Pencil className={`h-5 w-5 hover:text-blue-800`} />
                        </Button>
                    </TaskDialog>
                </div>
            </div>
        </CardContent>
     </Card>
    )
}
