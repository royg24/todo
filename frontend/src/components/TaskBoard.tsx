import {useContext, useEffect, useRef, useState} from "react";
import "../style/TaskBoardStyle.css";
import { ThemeContext } from "@/contexts/ColorContext.ts";
import { TasksContext } from "@/contexts/TasksContext.tsx";
import ControlBar from "@/components/ControlBar.tsx";
import TaskList from "@/components/TaskList.tsx";
import { TaskStatus } from "@/components/Utils.ts";

export default function TaskBoard() {
	const [username] = useState<string>("Guest");
	const { textColor, bgColor } = useContext(ThemeContext);
	const { tasks, addTask } = useContext(TasksContext);
    const init = useRef(false);

	useEffect(() => {
        if (init.current) {
            return;
        }

		if (tasks.length === 0) {
			const initialTasks = Array.from({ length: 20 }, (_, i) => {
				const statusArray = [TaskStatus.PENDING, TaskStatus.COMPLETED, TaskStatus.IN_PROGRESS];
				const status = statusArray[i % statusArray.length];

				const dueDate = new Date();
				dueDate.setDate(dueDate.getDate() + i);

				return {
					id: crypto.randomUUID(),
					name: `Task ${i + 1}`,
					description: `This is task number ${i + 1}`,
					status,
					dueDate,
				};
			});

			initialTasks.forEach(task => {
                addTask(task)
            });
		}
        init.current = true;
	}, [tasks, addTask]);

	return (
		<div className="task-board-container" style={{ backgroundColor: bgColor }}>
			<h1 className="task-board-header" style={{ color: textColor }}>
				Welcome {username}
			</h1>
			<ControlBar />
			<div style={{ width: "60%" }}>
				<TaskList />
			</div>
		</div>
	);
}
