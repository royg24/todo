from datetime import datetime

from uuid import UUID, uuid4
from pydantic import BaseModel, Field
from models.task_status import TaskStatus
from typing import Optional


class Task(BaseModel):
    task_id: UUID = Field(default_factory=uuid4)
    name: str
    description: Optional[str]
    due_date: datetime
    status: TaskStatus = TaskStatus.PENDING
    created_at: Optional[datetime] = None
