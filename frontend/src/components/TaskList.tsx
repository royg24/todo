"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useRef, useEffect, forwardRef, useImperativeHandle, useContext } from "react"
import TaskCard from "@/components/TaskCard"
import { type TaskStatusType } from "@/components/Utils.ts"
import { TasksContext } from "@/contexts/TasksContext.tsx"

export interface Task {
  id: string
  name: string
  description: string
  status: TaskStatusType
  dueDate: Date
}

export interface TaskListHandle {
  addTask: (task: Task) => void
  removeTask: (id: string) => void
}

interface TaskListProps {
  fetchTasks?: (offset: number) => Promise<Task[]>
}

const TaskList = forwardRef<TaskListHandle, TaskListProps>(
  (props: TaskListProps, ref) => {
    const { tasks, addTask, removeTask } = useContext(TasksContext)
    const loaderRef = useRef<HTMLDivElement | null>(null)
    const hasMore = !!props.fetchTasks

    const loadMore = async () => {
      if (!props.fetchTasks) return
      const newTasks = await props.fetchTasks(tasks.length)
      if (newTasks.length > 0) {
        newTasks.forEach(task => addTask(task))
      }
    }

    useEffect(() => {
      if (!hasMore || !props.fetchTasks) return

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            void (async () => {
              try {
                await loadMore()
              } catch (err) {
                console.error("Failed to load more tasks:", err)
              }
            })()
          }
        },
        { rootMargin: "6.25rem" }
      )

      if (loaderRef.current) observer.observe(loaderRef.current)
      return () => {
        if (loaderRef.current) observer.unobserve(loaderRef.current)
      }
    }, [hasMore, tasks, props.fetchTasks])

    useImperativeHandle(ref, () => ({
      addTask,
      removeTask,
    }))

    return (
      <ScrollArea className="h-[45rem] w-full">
        <div className="flex flex-col gap-2" style={{ alignItems: 'center' }}>
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              name={task.name}
              description={task.description}
              status={task.status}
              dueDate={task.dueDate}
            />
          ))}
          {hasMore && <div ref={loaderRef} className="h-1.5" />}
        </div>
      </ScrollArea>
    )
  }
)

TaskList.displayName = "TaskList"
export default TaskList
