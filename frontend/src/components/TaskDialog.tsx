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
import {useContext} from "react";
import { ThemeContext } from "@/contexts/ColorContext.ts";
import DatePicker from "@/components/DatePicker.tsx";
import StatusSelect from "@/components/StatusSelect.tsx";
import * as React from "react";
import type {TaskStatusType} from "@/components/Utils.ts";

interface TaskDialogProps {
	header: string;
    children: React.ReactNode;
    isEdit?: boolean;
    name?: string;
    description?: string;
    dueDate?: Date;
    status?: TaskStatusType
}

export default function TaskDialog(props: TaskDialogProps) {
	const { bgColor, textColor } = useContext(ThemeContext);

	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
                    {props.children}
				</DialogTrigger>
				<DialogContent
					className="sm:max-w-[425px]"
					style={{ backgroundColor: bgColor, color: textColor }}
                    showCloseButton={false}
                    onOpenAutoFocus={(e) => e.preventDefault()}
				>
					<DialogHeader>
						<DialogTitle>{props.header}</DialogTitle>
					</DialogHeader>

					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="name-1">Name</Label>
							<Input
								id="name-1"
								name="name"
                                value={props.name ?? ""}
								placeholder="Name"
								style={{ borderColor: "black", outline: 'none' }}
							/>
						</div>

						<div className="grid gap-3">
							<Label htmlFor="description">Description</Label>
							<textarea
								id="description"
								name="description"
                                value={props.description ?? ""}
								placeholder="Description"
								className="h-24 w-full p-2 border border-black rounded resize-none"
								style={{ borderColor: "black", outline: 'none' }}
							/>
						</div>

                        <div className="grid gap-2">
                            <Label htmlFor="due-date">Due Date</Label>
                            <DatePicker defaultDate={props.dueDate}/>
                        </div>

                        { props.isEdit ? <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <StatusSelect isAllIncluded={false} value={props.status ?? undefined}/>
                        </div> : null }
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
