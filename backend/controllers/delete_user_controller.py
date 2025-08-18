from sqlalchemy.orm import Session

from database.database import TodoDatabase
from exceptions_handler import AuthenticationException
from utils import decode_token


class DeleteUserController:

    @staticmethod
    def delete_user(token: str, session: Session):

        user_id = decode_token(token)
        user = TodoDatabase.get_user_by_id(user_id, session)

        if user is None:
            raise AuthenticationException("Unauthorized user")

        return TodoDatabase.db_delete_user(user, session)
