from datetime import datetime

from uuid import UUID, uuid4
from pydantic import BaseModel, Field
from models.task_status import TaskStatus


class Task(BaseModel):
    uuid: UUID = Field(default_factory=uuid4)
    name: str
    description: str
    due_date: datetime
    status: TaskStatus = TaskStatus.PENDING
