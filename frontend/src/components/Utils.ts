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

export function inputStyle(
  base: React.CSSProperties,
  isHovered: boolean
): React.CSSProperties {
  return {
    ...base,
    borderColor: isHovered ? "#3c6edb" : "transparent",
    transition: "border-color 0.3s ease, transform 0.2s ease",
  };

}

export const TaskStatus = {
  COMPLETED: "completed",
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  CANCELLED: "cancelled",
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];