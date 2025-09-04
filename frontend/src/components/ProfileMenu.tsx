"use client";

import { useContext, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ThemeContext } from "@/contexts/ColorContext.ts";
import { DetailsContext } from "@/contexts/DetailsContext.ts";
import TodoButton from "@/components/TodoButton.tsx";

export default function ProfileMenu() {
  const { bgColor, textColor } = useContext(ThemeContext);
  const { username, setUsername, email, setEmail } = useContext(DetailsContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username, email });

  const handleSave = () => {
    setUsername(formData.username);
    setEmail(formData.email);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ username, email });
    setIsEditing(false);
  };

  type FormDataKeys = "username" | "email";
  const fields: { label: string; key: FormDataKeys }[] = [
      { label: "Username:", key: "username" },
      { label: "Email:", key: "email" },
  ];

  return (
    <Popover open={isOpen} onOpenChange={(open) => {
        setIsOpen(open)
        setIsEditing(false);
    }}>
      <PopoverTrigger asChild>
        <Button
          style={{
            backgroundColor: bgColor,
            color: textColor,
            marginTop: "0.1rem",
          }}
          variant="outline"
        >
          Profile
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-full max-w-2xl"
        style={{ backgroundColor: bgColor, borderColor: textColor, outline: "none" }}
      >
        <div className="flex justify-between items-center p-4">
          {!isEditing ? (
            <TodoButton onClick={() => setIsEditing(true)}>Edit</TodoButton>
          ) : (
            <div className="flex gap-2">
              <TodoButton onClick={handleSave}>Save</TodoButton>
              <TodoButton onClick={handleCancel}>Cancel</TodoButton>
            </div>
          )}
        </div>

        <div className="grid gap-4 p-4" style={{ color: textColor, fontSize: "1.2rem" }}>
          {fields.map((field) => (
            <div key={field.key} className="grid grid-cols-[120px_1fr] items-center gap-2">
              <span className="font-medium">{field.label}</span>
              <Input
                type="text"
                value={formData[field.key]}
                readOnly={!isEditing}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
