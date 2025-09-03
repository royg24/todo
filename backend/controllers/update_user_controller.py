from sqlalchemy.orm import Session

from database.database import TodoDatabase
from models.user import User
from models.user_update import UserUpdate
from validations.validations import validate_username, validate_email
from exceptions_handler import AuthenticationException, DataException
from utils import decode_token


class UpdateUserController:

    @staticmethod
    def update_user(updated_user: UserUpdate, token: str, session: Session):
        user_id = decode_token(token)
        user = TodoDatabase.get_user_by_id(user_id, session)
        if user is None:
            raise AuthenticationException("Unauthorized user")

        UpdateUserController.__validate(updated_user, user, session)

        return TodoDatabase.db_update_user(user, updated_user, session)

    @staticmethod
    def __validate(updated_user: UserUpdate, current_user: User, session: Session):
        if updated_user.username is not None:
            validate_username(updated_user.username)
            user = TodoDatabase.get_user_by_username(updated_user.username, session)
            if user and user.user_id != current_user.user_id:
                raise DataException(f"Username {updated_user.username} is already in use")

        if updated_user.email is not None:
            validate_email(updated_user.email)
            user = TodoDatabase.get_user_by_email(updated_user.email, session)
            if user and user.user_id != current_user.user_id:
                raise DataException(f"Email {updated_user.email} is already in use")
