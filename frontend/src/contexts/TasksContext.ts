"use client";

import { createContext } from "react";
import { type TaskStatusType } from "@/components/Utils.tsx";

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatusType;
  dueDate: Date;
  createdAt: Date;
}

export interface TasksContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  setStatusFilter: (status: string) => void;
  setDateFilter: (date: Date | undefined) => void;
  setSort: (sort: string) => void;
  setSortDirection: (dir: boolean) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  setStatusFilter: () => {},
  setDateFilter: () => {},
  setSort: () => {},
  setSortDirection: () => {},
  searchText: "",
  setSearchText: () => {},
});
