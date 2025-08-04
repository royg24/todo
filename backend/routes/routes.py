from fastapi import APIRouter
from typing import Optional

router = APIRouter()


@router.get("/health", response_model=str)
async def health():
    return "ok"


@router.post("/auth/login")
async def login():
    return "login"


@router.post("/tasks")
async def tasks():
    return "add new task"


@router.get("/tasks}", response_model=str)
async def get_tasks(status: Optional[str] = None):
    if status:
        return f"Filter tasks by status: {status}"
    return "Return all tasks"


@router.patch("/tasks/{task_id}", response_model=str)
async def tasks_update(task_id: str):
    return f"update status for task {task_id}"


@router.get("/tasks/{task_id}", response_model=str)
async def tasks_get(task_id: str):
    return f"get task details for task {task_id}"


@router.delete("/tasks/{task_id}", response_model=str)
async def tasks_delete(task_id: str):
    return f"delete task {task_id}"
