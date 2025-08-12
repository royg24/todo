from sqlalchemy.orm import Session
from models.user import User as UserModel
from database.user import User as UserSchema
from utils import hash_password
from uuid import uuid4


class TodoDatabase:

    @staticmethod
    def add_user(user_details: UserModel, session: Session):
        user = TodoDatabase.__create_user_for_schema(user_details)

        session.add(user)
        session.commit()
        session.refresh(user)
        return user

    @staticmethod
    def get_user_by_username(username: str, session: Session) -> UserSchema | None:
        return session.query(UserSchema).filter(UserSchema.username == username).first()

    @staticmethod
    def __create_user_for_schema(user_details: UserModel) -> UserSchema:
        return UserSchema(
            user_id=uuid4(),
            username=user_details.username,
            hashed_password=hash_password(user_details.password)
        )
