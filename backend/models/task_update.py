from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from models.task_status import TaskStatus


class TaskUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    status: Optional[TaskStatus] = None
