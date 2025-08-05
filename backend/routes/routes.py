from fastapi import APIRouter, status, Depends
from typing import Optional

from controllers.login_controller import LoginController
from controllers.create_task_controller import CreateTaskController

from models.user import User
from models.task import Task
from utils import get_token

router = APIRouter()


@router.post("/auth/login")
async def login(user_details: User):
    token = LoginController.login(user_details)
    return {"token": token, "message": "Login successful"}


@router.post("/tasks", status_code=status.HTTP_201_CREATED)
async def create_task(task: Task, token: str = Depends(get_token)):
    new_task = CreateTaskController.create_task(task, token)
    return {**new_task.model_dump(), "message": "Task added successfully"}


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
