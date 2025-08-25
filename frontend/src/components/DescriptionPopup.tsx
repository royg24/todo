import {type ReactNode, useContext, useState} from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {ThemeContext} from "@/contexts/ColorContext.ts";

interface DescriptionPopupProps {
  text: string;
  trigger: ReactNode;
}

export default function DescriptionPopup({ text, trigger }: DescriptionPopupProps) {
  const [open, setOpen] = useState(false);
  const {textColor, bgColor, borderColor } = useContext(ThemeContext)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
          style={{
              backgroundColor: "transparent",
              border: 'none',
              outline: 'none'
          }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent
          side="right"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="w-64"
          style={{
              backgroundColor: bgColor,
              color: textColor,
              borderColor: borderColor,
          }}
      >
        {text}
      </PopoverContent>
    </Popover>
  );
}
