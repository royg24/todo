from fastapi import APIRouter, status, Depends
from database import get_session
from database.database import TodoDatabase

from controllers.login_controller import LoginController
from controllers.create_task_controller import CreateTaskController
from controllers.get_tasks_controller import GetTasksController
from controllers.udpate_task_controller import UpdateTaskController
from controllers.delete_task_controller import DeleteTaskController

from models.user import User
from models.task import Task
from models.task_update import TaskUpdate

from uuid import UUID
from utils import get_token

router = APIRouter()


@router.post("/auth/login", response_model=dict)
async def login(user_details: User, session=Depends(get_session)):
    token = LoginController.login(user_details, session)
    return {"token": token, "message": "Login successful"}


@router.post("/tasks", status_code=status.HTTP_201_CREATED, response_model=dict)
async def create_task(task: Task, token: str = Depends(get_token), session=Depends(get_session)):
    new_task = TodoDatabase.task_schema_to_model(CreateTaskController.create_task(task, token, session))
    return {**new_task.model_dump(), "message": "Task added successfully"}


@router.get("/tasks", response_model=dict)
async def get_tasks(token: str = Depends(get_token), session=Depends(get_session)):
    return GetTasksController.get_tasks(token, session)


@router.patch("/tasks/{task_id}", response_model=dict)
async def tasks_update(updated_task: TaskUpdate, task_id: str, token: str = Depends(get_token), session=Depends(get_session)):
    updated_task = UpdateTaskController.update_task(updated_task, UUID(task_id), token, session)
    updated_task = TodoDatabase.task_schema_to_model(updated_task)
    return {**updated_task.model_dump(), "message": "Task updated successfully"}


@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def tasks_delete(task_id: str, token: str = Depends(get_token), session=Depends(get_session)):
    DeleteTaskController.delete_task(UUID(task_id), token, session)
