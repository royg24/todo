"use client";

import { createContext, useState, type ReactNode, useMemo } from "react";
import { type TaskStatusType } from "@/components/Utils.ts";

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatusType;
  dueDate: Date;
  createdAt: Date;
}

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  setStatusFilter: (status: string) => void;
  setDateFilter: (date: Date | undefined) => void;
  setSort: (sort: string) => void;
  setSortDirection: (dir: boolean) => void;
}

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  setStatusFilter: () => {},
  setDateFilter: () => {},
  setSort: () => {},
  setSortDirection: () => {},
});

interface TasksProviderProps {
  children: ReactNode;
}

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [sort, setSort] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState(false);

  const addTask = (task: Task) => setAllTasks(prev => [...prev, task]);
  const removeTask = (id: string) => setAllTasks(prev => prev.filter(t => t.id !== id));

  const sorts = {
      "name": (a: Task, b: Task) => sortDirection ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name),
      "dueDate": (a: Task, b: Task) => {
          return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * (sortDirection ? 1 : -1);
      },
      "createdAt": (a: Task, b: Task) => {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() * (sortDirection ? 1: -1)
      },
  }

  const tasks = useMemo(() => {
    let result = [...allTasks];

    if (statusFilter !== "all") {
      result = result.filter(task => task.status.value.toString() === statusFilter);
    }

    if (dateFilter) {
        result = result.filter(task =>
                task.dueDate.getFullYear() === dateFilter.getFullYear() &&
                task.dueDate.getMonth() === dateFilter.getMonth() &&
                task.dueDate.getDate() === dateFilter.getDate()
        );
    }

    result.sort(sorts[(sort in sorts ? sort : "createdAt") as keyof typeof sorts]);

    return result;
  }, [allTasks, statusFilter, dateFilter, sort, sortDirection]);

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, removeTask, setDateFilter, setStatusFilter, setSort, setSortDirection }}
    >
      {children}
    </TasksContext.Provider>
  );
};
