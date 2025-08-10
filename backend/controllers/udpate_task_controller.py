from models.user import users
from models.task_update import TaskUpdate
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
    def update_task(updated_task: TaskUpdate, task_id: UUID, token: str):
        UpdateTaskController.__validate_task(updated_task)

        user_id = decode_token(token)
        if user_id is None:
            raise AuthenticationException("Invalid token")

        user = next((user for user in users if user.id == user_id), None)
        if user is None:
            raise NotFoundException("User not found")

        for i, task in enumerate(user.tasks):
            if task.id == task_id:
                for name, value in updated_task.model_dump(exclude_unset=True).items():
                    setattr(user.tasks[i], name, value)
                return user.tasks[i]

        raise NotFoundException("Task not found")
