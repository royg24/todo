from sqlalchemy.orm import Session

from utils import decode_token
from exceptions_handler import AuthenticationException
from database.database import TodoDatabase


class GetTasksController:

    @staticmethod
    def get_tasks(token: str, session: Session):
        user_id = decode_token(token)

        if TodoDatabase.get_user_by_id(user_id, session) is None:
            raise AuthenticationException("Unauthorized user")

        return TodoDatabase.get_tasks(user_id, session)
