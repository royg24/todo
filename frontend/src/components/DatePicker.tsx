"use client"

import * as React from "react"
import { useContext } from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ThemeContext } from "@/contexts/ColorContext.ts"
import "@/style/DatePicker.css"

interface DatePickerProps {
    defaultDate?: Date
}

export default function DatePicker({ defaultDate }: DatePickerProps) {
	const { textColor, selectColor, buttonColor, hoverButtonColor } = useContext(ThemeContext)
    const { darkMode } = useContext(ThemeContext);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(defaultDate);

	const [open, setOpen] = React.useState(false);

    const labelClass = darkMode
      ? "compact-calendar-caption-dark"
      : "compact-calendar-caption-light";

    const todayClass = darkMode
        ? "compact-calendar-today-dark"
        : "compact-calendar-today-light";


	return (
		<div className="flex flex-col gap-2">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-40 justify-between font-normal text-sm px-3 py-1.5"
						style={{
							color: textColor ?? "white",
							backgroundColor: selectColor ?? "#f5f5f5",
						}}
					>
						{selectedDate ?`
						${String(selectedDate.getDate()).padStart(2, "0")}/${String(selectedDate.getMonth() + 1)
                                .padStart(2, "0")}/${selectedDate.getFullYear()}`
                            : "Select date"}
						<ChevronDownIcon className="w-4 h-4" />
					</Button>
				</PopoverTrigger>

				<PopoverContent
					className="calendar-popover"
					style={{ backgroundColor: selectColor ?? "#f5f5f5" }}
					align="start"
				>
					<Calendar
						className="compact-calendar"
						mode="single"
						selected={selectedDate}
						onSelect={(d: Date | undefined) => {
							setSelectedDate(d)
							setOpen(false)
						}}
                        modifiersClassNames={{
                            today: todayClass,
                        }}
						components={{
							DayButton: ({ className, day, modifiers, ...props }) => {
                              const dayDate = day.date;

                              const isSelected = selectedDate &&
                                    dayDate.getFullYear() === selectedDate.getFullYear() &&
                                    dayDate.getMonth() === selectedDate.getMonth() &&
                                    dayDate.getDate() === selectedDate.getDate();

                              return (
                                <button
                                  {...props}
                                  className={`day-button-themed ${className}`}
                                  style={{
                                    backgroundColor: isSelected ? buttonColor
                                      : selectColor ?? "#2563eb",
                                    color: textColor ?? "white",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                      hoverButtonColor ?? "#3b82f6")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                      isSelected ? buttonColor ?? "#2563eb"
                                        : selectColor ?? "#2563eb")
                                  }
                                />
                              );
                            },
							Chevron: ({ className, orientation, ...props }) => {
								const isLeft = orientation === "left"
								return (
									<button
										{...props}
										className={className}
										style={{
											backgroundColor: selectColor,
											color: textColor,
											width: "2.5rem",
											height: "2.5rem",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											borderRadius: "0.25rem",
											cursor: "pointer",
										}}
									>
										{isLeft ? "◀" : "▶"}
									</button>
								)
							},
						}}
                        classNames={{
                            caption_label: labelClass,
                        }}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
