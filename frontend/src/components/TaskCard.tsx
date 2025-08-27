
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
  const { selectColor, hoverSelectColor, editIconColor } = useContext(ThemeContext);
  const cardFontStyle = {
    fontSize: "1em",
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
      className="h-14 p-0 shadow-sm
                 hover:shadow-md hover:-translate-y-0.5
                 transition-all duration-300 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ ...itemsStyle(), borderColor: "black", margin: 1, width: '90%' }}
    >
      <CardContent className="p-0 h-full">
        <div
          className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] h-full items-center"
          style={cardFontStyle}
        >
          {/* Name */}
          <div className="px-2 justify-start">{details.name}</div>

          {/* Description (popup button) */}
          <div className="px-2 flex justify-center">
            <DescriptionPopup
              text={details.description}
              trigger={
                <TodoButton
                  buttonText="Description"
                  className="min-h-0 py-0 text-sm"
                />
              }
            />
          </div>

          {/* Status */}
          <div className="px-2 flex justify-center" style={{ color: details.status.color }}>
            {details.status.value.toString().toUpperCase()}
          </div>

          {/* Due Date */}
          <div className="px-2 flex justify-center">
            {details.dueDate.toLocaleDateString("en-GB")}
          </div>

          {/* Actions */}
          <div className="px-2 flex justify-center gap-2">
            <Button variant="ghost" size="icon" className="icon-style" style={{ outline: "none" }}>
              <Trash2 className="h-5 w-5 text-red-500 hover:text-red-800" />
            </Button>
            <TaskDialog
              header="Edit Task"
              isEdit={true}
              name={details.name}
              description={details.description}
              dueDate={details.dueDate}
              status={details.status}
            >
              <Button
                variant="ghost"
                size="icon"
                style={{ color: editIconColor, outline: "none" }}
                className="icon-style"
              >
                <Pencil className="h-5 w-5 hover:text-blue-800" />
              </Button>
            </TaskDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

