from fastapi import APIRouter, status, Depends, Query
from typing import Optional

from controllers.login_controller import LoginController
from controllers.create_task_controller import CreateTaskController
from controllers.get_tasks_controller import GetTasksController
from controllers.udpate_task_controller import UpdateTaskController
from controllers.delete_task_controller import DeleteTaskController

from models.user import User
from models.task_create import TaskCreate
from models.task_update import TaskUpdate
from models.task_status import TaskStatus

from uuid import UUID
from utils import get_token

router = APIRouter()


@router.post("/auth/login", response_model=dict)
async def login(user_details: User):
    token = LoginController.login(user_details)
    return {"token": token, "message": "Login successful"}


@router.post("/tasks", status_code=status.HTTP_201_CREATED, response_model=dict)
async def create_task(task: TaskCreate, token: str = Depends(get_token)):
    new_task = CreateTaskController.create_task(task, token)
    return {**new_task.model_dump(), "message": "Task added successfully"}


@router.get("/tasks", response_model=dict)
async def get_tasks(task_status: Optional[TaskStatus] = None, token: str = Depends(get_token)):
    tasks = GetTasksController.get_tasks(token, task_status)
    return {"tasks": tasks}


@router.patch("/tasks/{task_id}", response_model=dict)
async def tasks_update(updated_task: TaskUpdate, task_id: str, token: str = Depends(get_token)):
    updated_task = UpdateTaskController.update_task(updated_task, UUID(task_id), token)
    return {**updated_task.model_dump(), "message": "Task updated successfully"}


@router.delete("/tasks/{task_id}", status_code= status.HTTP_204_NO_CONTENT)
async def tasks_delete(task_id: str, token: str = Depends(get_token)):
    DeleteTaskController.delete_task(UUID(task_id), token)

