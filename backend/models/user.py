from typing import List

from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from models.task_create import TaskCreate


class User(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    username: str
    password: str
    tasks: List[TaskCreate] = Field(default_factory=list)


# TODO replace it with database
users: List[User] = []
