from pydantic import BaseModel


class UserDetails(BaseModel):
    uuid: str
    username: str
    email: str
    password: str
