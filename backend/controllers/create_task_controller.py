from sqlalchemy.orm import Session

from models.user import users
from models.task import Task
from exceptions_handler import AuthenticationException
from validations.validations import validate_task_name, validate_due_date
from utils import decode_token
from database.database import TodoDatabase


class CreateTaskController:

    @staticmethod
    def __validate_task(task: Task):
        validate_task_name(task.name)
        validate_due_date(task.due_date)

    @staticmethod
    def create_task(task_details: Task, token: str, session: Session):

        CreateTaskController.__validate_task(task_details)
        new_task = Task(**task_details.model_dump())

        user_id = decode_token(token)

        if not user_id:
            raise AuthenticationException("Invalid token")

        return TodoDatabase.add_task(new_task, user_id, session)
