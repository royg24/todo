from models.user import users
from models.task import Task
from uuid import UUID
from exceptions_handler import ValidationException, AuthenticationException
from validations.validations import validate_task_name, validate_due_date
from utils import decode_token


class CreateTaskController:

    @staticmethod
    def __validate_task(task: Task):
        try:
            validate_task_name(task.name)
            validate_due_date(task.due_date)
        except ValidationException as e:
            raise e

    @staticmethod
    def create_task(task: Task, token: str):
        CreateTaskController.__validate_task(task)
        task = Task(**task.model_dump())

        user_id = decode_token(token)
        user = next((user for user in users if user.id == user_id), None)

        if not user:
            raise AuthenticationException("Invalid token")

        user.tasks.append(task)
        return task
