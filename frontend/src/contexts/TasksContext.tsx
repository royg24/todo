"use client";

import {createContext, useState, type ReactNode} from "react";
import { type TaskStatusType } from "@/components/Utils.ts";

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatusType;
  dueDate: Date | string;
  createdAt: Date | string;
}

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
}

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
});

interface TasksProviderProps {
  children: ReactNode;
}

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => setTasks(prev => [...prev, task]);
  const removeTask = (id: string) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  return (
    <TasksContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
};
