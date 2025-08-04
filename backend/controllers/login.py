
from main import users
from models.user_details import UserDetails
import uuid
from utils import create_token


class LoginController:

    @staticmethod
    def get_user(user_details: UserDetails):
        for user in users:
            if user.username == user_details.username and user.password == user_details.password:
                return user

        user = UserDetails(uuid=uuid.uuid4(), username=user_details.username,
                           password=user_details.password, email=user_details.email)

        users.append(user)
        return user

    @staticmethod
    def generate_token(user_details: UserDetails):
        user = LoginController.get_user(user_details)
        return create_token(user)