from models.user import User, users
from utils import create_token
from validations.validations import validate_password, validate_username
from exceptions_handler import ValidationException, AuthenticationException


class LoginController:

    @staticmethod
    def __get_user(user_details: User):
        user = next((user for user in users if user.username == user_details.username), None)

        if user:
            if user.password == user_details.password:
                return user
            else:
                raise AuthenticationException("Username is taken or password is incorrect")

        new_user = User(username=user_details.username, password=user_details.password)
        users.append(new_user)
        return new_user

    @staticmethod
    def __validate(user_details: User):
        try:
            validate_username(user_details.username)
            validate_password(user_details.password)
        except ValidationException as e:
            raise e

    @staticmethod
    def login(user_details: User):
        LoginController.__validate(user_details)
        user = LoginController.__get_user(user_details)
        return create_token(user)
