from sqlalchemy import Column, Integer, String, DateTime, func
from database.base import Base
from sqlalchemy.dialects.postgresql import UUID


class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), index=True, nullable=False)
    task_id = Column(UUID(as_uuid=True), index=True, nullable=False, unique=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    due_date = Column(DateTime, nullable=False)
    status = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    model_config = {
        "from_attributes": True
    }
