from utils import decode_token
from exceptions_handler import NotFoundException
from models.user import users
from models.task_status import TaskStatus


class GetTasksController:

    @staticmethod
    def get_tasks(token: str, status: TaskStatus = None):
        user_id = decode_token(token)
        user = next((user for user in users if user.id == user_id), None)

        if not user:
            raise NotFoundException("User not found")

        if status is None:
            return user.tasks
        else:
            return [task for task in user.tasks if task.status == status]
