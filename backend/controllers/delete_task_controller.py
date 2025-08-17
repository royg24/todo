from sqlalchemy.orm import Session

from uuid import UUID
from utils import decode_token
from exceptions_handler import NotFoundException, AuthenticationException
from database.database import TodoDatabase


class DeleteTaskController:

    @staticmethod
    def delete_task(task_id: UUID, token: str, session: Session):

        user_id = decode_token(token)
        if TodoDatabase.get_user_by_id(user_id, session) is None:
            raise AuthenticationException("Unauthorized user")

        task = TodoDatabase.get_task_by_id(task_id, session)
        if not task:
            raise NotFoundException("Task not found")

        return TodoDatabase.db_delete_task(task, session)
