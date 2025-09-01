"use client";

import { useContext, useEffect, useRef, useState } from "react";
import "../style/TaskBoardStyle.css";
import { ThemeContext } from "@/contexts/ColorContext.ts";
import { TasksContext } from "@/contexts/TasksContext.ts";
import ControlBar from "@/components/ControlBar.tsx";
import TaskList from "@/components/TaskList.tsx";
import { TaskStatus } from "@/components/Utils.tsx";

export default function TaskBoard() {
  const [username] = useState<string>("Guest");
  const { textColor, bgColor } = useContext(ThemeContext);
  const { tasks, addTask } = useContext(TasksContext);
  const init = useRef(false);

  useEffect(() => {
    if (init.current) return;

    if (tasks.length === 0) {
      const sampleTasks = [
        {
          name: "Buy groceries",
          description: "Milk, Eggs, Bread, and Butter for the week",
          status: TaskStatus.PENDING,
          dueOffset: 2,
        },
        {
          name: "Finish project report",
          description: "Compile results and prepare slides for presentation",
          status: TaskStatus.IN_PROGRESS,
          dueOffset: 5,
        },
        {
          name: "Call Alice",
          description: "Discuss project updates and mutual deadlines",
          status: TaskStatus.COMPLETED,
          dueOffset: -1,
        },
        {
          name: "Book flight tickets",
          description: "Flight to New York for the business trip",
          status: TaskStatus.PENDING,
          dueOffset: 5,
        },
        {
          name: "Team meeting",
          description: "Discuss project progress and assign new tasks",
          status: TaskStatus.IN_PROGRESS,
          dueOffset: 0,
        },
        {
          name: "Workout session",
          description: "Leg day at the gym, include cardio",
          status: TaskStatus.COMPLETED,
          dueOffset: -1,
        },
        {
          name: "Write blog post",
          description: "Share insights about React and TypeScript",
          status: TaskStatus.PENDING,
          dueOffset: 3,
        },
        {
          name: "Buy groceries for party",
          description: "Milk, Bread, Wine, Cheese",
          status: TaskStatus.PENDING,
          dueOffset: 3,
        },
        {
          name: "Call Bob",
          description: "Discuss mutual project requirements",
          status: TaskStatus.IN_PROGRESS,
          dueOffset: 5,
        },
        {
          name: "Prepare presentation slides",
          description: "Include graphs and charts for project report",
          status: TaskStatus.PENDING,
          dueOffset: 6,
        },
      ];

      // Fill up to 20 tasks by cycling through sampleTasks
      const initialTasks = Array.from({ length: 20 }, (_, i) => {
        const base = sampleTasks[i % sampleTasks.length];
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + base.dueOffset + i % 3); // small variation for each task

        return {
          id: crypto.randomUUID(),
          name: base.name,
          description: base.description,
          status: base.status,
          dueDate,
          createdAt: new Date(),
        };
      });

      initialTasks.forEach(task => addTask(task));
    }

    init.current = true;
  }, [tasks, addTask]);

  return (
    <div className="task-board-container" style={{ backgroundColor: bgColor }}>
      <h1 className="task-board-header" style={{ color: textColor }}>
        Welcome {username}
      </h1>

      <ControlBar />

      <div className="sm:w-11/12 md:w-3/5 lg:w-4/5 mx-auto">
        <TaskList />
      </div>
    </div>
  );
}
