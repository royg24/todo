from sqlalchemy.orm import Session

from utils import decode_token
from exceptions_handler import NotFoundException
from database.database import TodoDatabase


class GetTasksController:

    @staticmethod
    def get_tasks(token: str, session: Session):
        user_id = decode_token(token)

        if not user_id:
            raise NotFoundException("User not found")

        return TodoDatabase.get_tasks(user_id, session)
