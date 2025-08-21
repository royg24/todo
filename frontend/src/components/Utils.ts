// Utils.tsx (note: must be .tsx since it uses hooks)
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ColorContext.ts";
import * as React from "react";

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

