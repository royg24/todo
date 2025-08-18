from enum import Enum

from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy.orm import Session
from fastapi import status

from exceptions_handler import DatabaseException
from models.task_status import TaskStatus
from models.user import User as UserModel
from models.task import Task as TaskModel
from models.task_update import TaskUpdate

from database.user import User as UserSchema
from database.task import Task as TaskSchema
from utils import hash_password
from uuid import uuid4, UUID


class TodoDatabase:

    @staticmethod
    def add_user(user_details: UserModel, session: Session) -> UserSchema:
        user = TodoDatabase.__create_user_for_schema(user_details)

        session.add(user)
        TodoDatabase.__commit_session(session, "Cannot create user due to a conflict with existing data")
        session.refresh(user)
        return user

    @staticmethod
    def add_task(task_details: TaskModel, user_id: UUID, session: Session) -> TaskSchema:
        task = TodoDatabase.__create_task_for_schema(task_details, user_id)

        session.add(task)
        TodoDatabase.__commit_session(session, "Cannot create task due to a conflict with existing data")
        session.refresh(task)
        return task

    @staticmethod
    def get_tasks(user_id: UUID, session: Session) -> dict:
        tasks = session.query(TaskSchema).filter(TaskSchema.user_id == user_id).all()
        return {"tasks": [TaskModel.model_validate(task, from_attributes=True).model_dump() for task in tasks]}

    @staticmethod
    def db_update_username(new_username: str, user_to_update: UserSchema, session: Session) -> bool:
        user = TodoDatabase.get_user_by_username(new_username, session)
        if user is not None:
            raise DatabaseException(status.HTTP_409_CONFLICT, f"{new_username} already exists")

        setattr(user_to_update, "username", new_username)

        TodoDatabase.__commit_session(session, "Cannot update username due to a conflict with existing data")
        session.refresh(user_to_update)

        return True

    @staticmethod
    def db_update_task(task: TaskSchema, updated_task: TaskUpdate, session: Session) -> TaskSchema:
        for name, value in updated_task.model_dump(exclude_unset=True).items():
            setattr(task, name, TodoDatabase.__normalize_value(value))

        TodoDatabase.__commit_session(session, "Cannot update task due to a conflict with existing data or constraints")
        session.refresh(task)

        return task

    @staticmethod
    def db_delete_task(task: TaskSchema, session: Session) -> bool:

        session.delete(task)
        TodoDatabase.__commit_session(session, "Cannot delete task because it is referenced by other records")

        return True

    @staticmethod
    def db_delete_user(user: UserSchema, session: Session) -> bool:

        session.delete(user)
        TodoDatabase.__commit_session(session, "Cannot delete user due to a conflict with existing data")

        return True

    @staticmethod
    def get_user_by_id(user_id: UUID, session: Session) -> UserSchema | None:
        return session.query(UserSchema).filter(UserSchema.user_id == user_id).first()

    @staticmethod
    def get_user_by_username(username: str, session: Session) -> UserSchema | None:
        return session.query(UserSchema).filter(UserSchema.username == username).first()

    @staticmethod
    def get_task_by_id(task_id: UUID, session: Session) -> TaskSchema | None:
        return session.query(TaskSchema).filter(TaskSchema.task_id == task_id).first()

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

    @staticmethod
    def __commit_session(session: Session, integrity_message: str):
        try:
            session.commit()
        except IntegrityError as e:
            session.rollback()
            raise DatabaseException(status.HTTP_409_CONFLICT, integrity_message)
        except SQLAlchemyError as e:
            session.rollback()
            raise DatabaseException(status.HTTP_500_INTERNAL_SERVER_ERROR, "An unexpected database error occurred")

    @staticmethod
    def __normalize_value(value):
        return value.value if isinstance(value, Enum) else value
