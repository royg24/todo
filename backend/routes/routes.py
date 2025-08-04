from fastapi import APIRouter, status
from typing import Optional

router = APIRouter()


@router.post("/auth/login")
async def login():
    return "login"


@router.post("/tasks", status_code=status.HTTP_201_CREATED)
async def tasks():
    return "add new task"


@router.get("/tasks", response_model=str)
async def get_tasks(task_status: Optional[str] = None):
    if task_status:
        return f"filter tasks by status: {task_status}"
    else:
        return "return all tasks"


@router.patch("/tasks/{task_id}", response_model=str)
async def tasks_update(task_id: str):
    return f"update status for task {task_id}"


@router.get("/tasks/{task_id}", response_model=str)
async def tasks_get(task_id: str):
    return f"get task details for task {task_id}"


@router.delete("/tasks/{task_id}", response_model=str)
async def tasks_delete(task_id: str):
    return f"delete task {task_id}"
