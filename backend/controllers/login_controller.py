from sqlalchemy.orm import Session

from models.user import User
from utils import create_token, hash_password, verify_password
from validations.validations import validate_password, validate_username
from exceptions_handler import ValidationException, AuthenticationException
from database.database import TodoDatabase


class LoginController:

    @staticmethod
    def __get_user(user_details: User, session: Session) -> User:
        user = TodoDatabase.get_user_by_username(user_details.username, session)

        if user:
            if verify_password(user_details.password, user.hashed_password):
                return user
            else:
                raise AuthenticationException("Username is taken or password is incorrect")

        new_user = User(username=user_details.username, password=user_details.password)
        return TodoDatabase.add_user(new_user, session)

    @staticmethod
    def __validate(user_details: User):
        try:
            validate_username(user_details.username)
            validate_password(user_details.password)
        except ValidationException as e:
            raise e

    @staticmethod
    def login(user_details: User, session: Session):
        LoginController.__validate(user_details)
        user = LoginController.__get_user(user_details, session)
        return create_token(user.user_id)
