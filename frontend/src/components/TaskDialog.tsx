import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TodoButton from "@/components/TodoButton.tsx";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ColorContext.ts";
import DatePicker from "@/components/DatePicker.tsx";

interface TaskDialogProps {
	header: string;
	buttonText: string;
}

export default function TaskDialog({ header, buttonText }: TaskDialogProps) {
	const { bgColor, textColor } = useContext(ThemeContext);

	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<TodoButton buttonText={buttonText} />
				</DialogTrigger>
				<DialogContent
					className="sm:max-w-[425px]"
					style={{ backgroundColor: bgColor, color: textColor }}
                    showCloseButton={false}
				>
					<DialogHeader>
						<DialogTitle>{header}</DialogTitle>
					</DialogHeader>

					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="name-1">Name</Label>
							<Input
								id="name-1"
								name="name"
								placeholder="Name"
								style={{ borderColor: "black" }}
							/>
						</div>

						<div className="grid gap-3">
							<Label htmlFor="description">Description</Label>
							<textarea
								id="description"
								name="description"
								placeholder="Description"
								className="h-24 w-full p-2 border border-black rounded resize-none"
								style={{ borderColor: "black" }}
							/>
						</div>

                        <div className="grid gap-2">
                            <Label htmlFor="due-date">Due Date</Label>
                            <DatePicker />
                        </div>
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<TodoButton>Cancel</TodoButton>
						</DialogClose>
						<TodoButton type="submit">Submit</TodoButton>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
