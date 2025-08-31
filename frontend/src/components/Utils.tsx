import * as React from "react";
import {createElement, type ReactNode, useContext} from "react";
import {ThemeContext} from "@/contexts/ColorContext.ts";

export function itemsStyle() {
  const { textColor, selectColor } = useContext(ThemeContext);

  return {
    color: textColor,
    backgroundColor: selectColor,
    fontSize: "0.8rem",
    outline: "none",
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

export function highlight(text: string, search: string): ReactNode {
  if (!search) return text;

  const { markColor } = useContext(ThemeContext);
  const regex = new RegExp(search, "gi");
  let lastIndex = 0;
  const result: ReactNode[] = [];

  for (const match of text.matchAll(regex)) {
    const start = match.index ?? 0;
    if (start > lastIndex) result.push(text.slice(lastIndex, start));
    result.push(createElement("span", { key: start, style:{backgroundColor: markColor, color: "black"} }, match[0]));
    lastIndex = start + match[0].length;
  }

  if (lastIndex < text.length) result.push(text.slice(lastIndex));
  return result;
}


export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];