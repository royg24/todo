"use client";

import { useState, useMemo, type ReactNode } from "react";
import { TasksContext, type Task } from "./contexts/TasksContext.ts";

interface TasksProviderProps {
  children: ReactNode;
}

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [sort, setSort] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  const addTask = (task: Task) => setAllTasks(prev => [...prev, task]);
  const removeTask = (id: string) => setAllTasks(prev => prev.filter(t => t.id !== id));

  const sorts = {
    name: (a: Task, b: Task) => (sortDirection ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)),
    dueDate: (a: Task, b: Task) =>
      (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * (sortDirection ? 1 : -1),
    createdAt: (a: Task, b: Task) =>
      (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * (sortDirection ? 1 : -1),
  };

  const tasks = useMemo(() => {
    let result = [...allTasks];

    if (statusFilter !== "all") {
      result = result.filter(task => task.status.value.toString() === statusFilter);
    }

    if (dateFilter) {
      result = result.filter(
        task =>
          task.dueDate.getFullYear() === dateFilter.getFullYear() &&
          task.dueDate.getMonth() === dateFilter.getMonth() &&
          task.dueDate.getDate() === dateFilter.getDate()
      );
    }

    if (searchText !== "") {
      result = result.filter(
        task =>
          task.name.toLowerCase().includes(searchText.toLowerCase()) ||
          task.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    result.sort(sorts[(sort in sorts ? sort : "createdAt") as keyof typeof sorts]);
    return result;
  }, [allTasks, statusFilter, dateFilter, sort, sortDirection, searchText]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        setStatusFilter,
        setDateFilter,
        setSort,
        setSortDirection,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
