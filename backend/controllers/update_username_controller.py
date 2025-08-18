from sqlalchemy.orm import Session

from database.database import TodoDatabase
from validations.validations import validate_username
from exceptions_handler import AuthenticationException, NotFoundException
from utils import decode_token


class UpdateUsernameController:

    @staticmethod
    def update_username(new_username: str, token: str, session: Session):
        validate_username(new_username)

        user_id = decode_token(token)

        user = TodoDatabase.get_user_by_id(user_id, session)
        if user is None:
            raise AuthenticationException("Unauthorized user")

        return TodoDatabase.db_update_username(new_username, user, session)
