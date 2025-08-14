from sqlalchemy.orm import Session

from models.task_status import TaskStatus
from models.user import User as UserModel
from models.task import Task as TaskModel
from database.user import User as UserSchema
from database.task import Task as TaskSchema
from utils import hash_password
from uuid import uuid4, UUID


class TodoDatabase:

    @staticmethod
    def add_user(user_details: UserModel, session: Session) -> UserSchema:
        user = TodoDatabase.__create_user_for_schema(user_details)

        session.add(user)
        session.commit()
        session.refresh(user)
        return user

    @staticmethod
    def add_task(task_details: TaskModel, user_id: UUID, session: Session) -> TaskSchema:
        task = TodoDatabase.__create_task_for_schema(task_details, user_id)

        session.add(task)
        session.commit()
        session.refresh(task)
        return task

    @staticmethod
    def get_tasks(user_id: UUID, session: Session):
        tasks = session.query(TaskSchema).filter(TaskSchema.user_id == user_id).all()
        return {"tasks": [TaskModel.model_validate(task, from_attributes=True).model_dump() for task in tasks]}

    @staticmethod
    def get_user_by_id(user_id: UUID, session: Session) -> UserSchema | None:
        return session.query(UserSchema).filter(UserSchema.user_id == user_id).first()

    @staticmethod
    def get_user_by_username(username: str, session: Session) -> UserSchema | None:
        return session.query(UserSchema).filter(UserSchema.username == username).first()

    @staticmethod
    def task_schema_to_model(task: TaskSchema) -> TaskModel:
        return TaskModel(
            task_id=task.task_id,
            name=task.name,
            description=task.description,
            due_date=task.due_date,
            status=TaskStatus(task.status)
        )

    @staticmethod
    def __create_user_for_schema(user_details: UserModel) -> UserSchema:
        return UserSchema(
            user_id=uuid4(),
            username=user_details.username,
            hashed_password=hash_password(user_details.password)
        )

    @staticmethod
    def __create_task_for_schema(task_details: TaskModel, user_id: UUID) -> TaskSchema:
        return TaskSchema(
            user_id=user_id,
            task_id=task_details.task_id,
            name=task_details.name,
            description=task_details.description or None,
            due_date=task_details.due_date,
            status=str(task_details.status.value)
        )
