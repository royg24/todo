import * as React from "react";
import {useContext} from "react";
import {ThemeContext} from "@/contexts/ColorContext.ts";

export function itemsStyle() {
  const { textColor, selectColor } = useContext(ThemeContext);

  return {
    color: textColor,
    backgroundColor: selectColor,
    fontSize: "0.8rem",
  } as React.CSSProperties;
}

export function inputStyle(base: React.CSSProperties, isHovered: boolean): React.CSSProperties {
  return {
    ...base,
    borderColor: isHovered ? "#3c6edb" : "black",
    transition: "border-color 0.3s ease, transform 0.2s ease",
  };

}

export const TaskStatus = {
  COMPLETED: { value: "completed", color: "rgb(26,151,54)" },
  PENDING: { value: "pending", color: "orange" },
  IN_PROGRESS: { value: "in-progress", color: "rgb(99,139,225)" },
  CANCELLED: { value: "cancelled", color: "red" },
} as const;


export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];