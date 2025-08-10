from models.user import users
from uuid import UUID
from utils import decode_token
from exceptions_handler import NotFoundException, AuthenticationException


class DeleteTaskController:

    @staticmethod
    def delete_task(task_id: UUID, token: str):

        user_id = decode_token(token)
        if not user_id:
            raise AuthenticationException("Invalid token")

        user = next((user for user in users if user.id == user_id), None)
        if not user:
            raise NotFoundException("User not found")

        for i, task in enumerate(user.tasks):
            if task.id == task_id:
                user.tasks.pop(i)
                return

        raise NotFoundException("Task not found")
