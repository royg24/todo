from typing import List

from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from models.task import Task


class User(BaseModel):
    uuid: UUID = Field(default_factory=uuid4)
    username: str
    password: str
    tasks: List[Task] = Field(default_factory=list)


# TODO replace it with database
users: List[User] = []
