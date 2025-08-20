import { useContext } from "react";
import { ThemeContext } from "@/contexts/ColorContext.ts";
import { SelectItem } from "@/components/ui/select";
import * as React from "react";

interface ControlSelectItemProps {
  value: string;
  children: React.ReactNode;
}

export default function ControlSelectItem({ value, children }: ControlSelectItemProps) {
  const { textColor } = useContext(ThemeContext);
  const { selectColor } = useContext(ThemeContext);
  const { hoverSelectColor } = useContext(ThemeContext);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = hoverSelectColor;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = selectColor;
  };

  return (
    <SelectItem
      value={value}
      style={{ color: textColor, backgroundColor: selectColor }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </SelectItem>
  );
}
