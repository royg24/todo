from sqlalchemy.orm import Session

from models.user import users
from models.task_update import TaskUpdate
from database.database import TodoDatabase
from exceptions_handler import AuthenticationException, NotFoundException
from validations.validations import validate_task_name, validate_due_date
from uuid import UUID
from utils import decode_token


class UpdateTaskController:

    @staticmethod
    def __validate_task(task: TaskUpdate):
        if task.name is not None:
            validate_task_name(task.name)
        if task.due_date is not None:
            validate_due_date(task.due_date)

    @staticmethod
    def update_task(updated_task: TaskUpdate, task_id: UUID, token: str, session: Session):
        UpdateTaskController.__validate_task(updated_task)

        if decode_token(token) is None:
            raise AuthenticationException("Unauthorized user")

        task = TodoDatabase.get_task_by_id(task_id, session)
        if task is None:
            raise NotFoundException("Task not found")

        return TodoDatabase.update_task(task, updated_task, session)
