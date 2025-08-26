import { createContext, useState, type ReactNode } from "react";
import { type Task } from "@/components/TaskList.tsx";

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

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => setTasks(prev => [...prev, task]);
  const removeTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));

  return (
    <TasksContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
}
