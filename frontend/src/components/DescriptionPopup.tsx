import { type ReactNode, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DescriptionPopupProps {
  text: string;
  trigger: ReactNode;
}

export default function DescriptionPopup({ text, trigger }: DescriptionPopupProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
          style={{
              backgroundColor: "transparent",
              border: 'none',
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
      >
        {text}
      </PopoverContent>
    </Popover>
  );
}
