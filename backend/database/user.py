from sqlalchemy import Column, Integer, String
from database.base import Base
from sqlalchemy.dialects.postgresql import UUID


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    model_config = {
        "from_attributes": True
    }
