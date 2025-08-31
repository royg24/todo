import { Card, CardContent } from "@/components/ui/card";
import "@/style/TaskCard.css";
import { type TaskStatusType } from "@/components/Utils.tsx";
import TodoButton from "@/components/TodoButton.tsx";
import { itemsStyle, highlight } from "@/components/Utils.tsx";
import TaskDialog from "@/components/TaskDialog.tsx";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ColorContext.ts";
import * as React from "react";
import DescriptionPopup from "@/components/DescriptionPopup.tsx";

interface TaskCardProps {
  name: string;
  description: string;
  status: TaskStatusType;
  dueDate: Date;
  createdAt: Date;
  searchText: string;
}

export default function TaskCard(details: TaskCardProps) {
  const { selectColor, hoverSelectColor, editIconColor } = useContext(ThemeContext);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = hoverSelectColor;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = selectColor;
  };

  const Actions = () => (
    <div className="flex gap-1 flex-shrink-0 justify-center">
      <Button variant="ghost" size="icon" className="p-0 m-0 icon-style" style={{outline: "none"}}>
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
          className="p-0 m-0 icon-style"
        >
          <Pencil className="h-5 w-5 hover:text-blue-800"/>
        </Button>
      </TaskDialog>
    </div>
  );

  return (
    <Card
      className="shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...itemsStyle(), borderColor: "black", margin: 1, width: "95%", padding: 2.5,
      }}
    >
      <CardContent className="p-0 m-0">
        {/* Mobile: stacked layout */}
        <div className="flex flex-col md:hidden gap-1">
          <div className="flex-1 min-w-0 break-words text-sm">
            {highlight(details.name, details.searchText)}
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <DescriptionPopup
              text={highlight(details.description, details.searchText)}
              trigger={
                <TodoButton
                  buttonText="Description"
                  className="min-h-0 py-0 text-sm"
                />
              }
            />
            <div
              style={{ color: details.status.color }}
              className="text-sm font-semibold"
            >
              {details.status.value.toString().toUpperCase()}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap text-sm">
            <div>Due: {details.dueDate.toLocaleDateString("en-GB")}</div>
            <div>Created: {details.createdAt.toLocaleDateString("en-GB")}</div>
          </div>
          <Actions />
        </div>

        {/* iPad: two lines */}
        <div className="hidden md:flex lg:hidden flex-col gap-2">
          <div className="flex items-center gap-10 flex-wrap">
            <div>
              {highlight(details.name, details.searchText)}
            </div>
            <DescriptionPopup
              text={highlight(details.description, details.searchText)}
              trigger={
                <TodoButton
                  buttonText="Description"
                  className="min-h-0 py-0 text-sm"
                />
              }
            />
            <div
              style={{ color: details.status.color }}
              className="text-sm font-semibold"
            >
              {details.status.value.toString().toUpperCase()}
            </div>
          </div>
          <div className="flex items-center gap-6 flex-wrap text-sm">
            <div>Due: {details.dueDate.toLocaleDateString("en-GB")}</div>
            <div>Created: {details.createdAt.toLocaleDateString("en-GB")}</div>
            <Actions />
          </div>
        </div>

        {/* Desktop: single row */}
        <div className="hidden lg:grid lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr_auto] lg:items-center lg:gap-2">
          <div className="min-w-0 flex-1 text-base">
            {highlight(details.name, details.searchText)}
          </div>
          <div className="flex justify-center">
            <DescriptionPopup
              text={highlight(details.description, details.searchText)}
              trigger={
                <TodoButton
                  buttonText="Description"
                  className="min-h-0 py-0 text-base"
                />
              }
            />
          </div>
          <div
            className="flex justify-center text-sm"
            style={{ color: details.status.color }}
          >
            {details.status.value.toString().toUpperCase()}
          </div>
          <div className="flex justify-center text-sm min-w-0 break-words">
            <span>Due:</span>&nbsp;
            {details.dueDate.toLocaleDateString("en-GB")}
          </div>
          <div className="flex justify-center text-sm min-w-0 break-words">
            <span>Created:</span>&nbsp;
            {details.createdAt.toLocaleDateString("en-GB")}
          </div>
          <div className="flex justify-center">
            <Actions />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
