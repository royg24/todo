from typing import List
from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str


# TODO replace it with database
users: List[User] = []
