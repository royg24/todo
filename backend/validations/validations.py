from datetime import datetime
from exceptions_handler import ValidationException


def validate_username(username: str) -> str:
    if not _validate_length(username, 3, 30) or not username.isalnum():
        raise ValidationException("Username must be alphanumeric and 3-30 characters long")

    return username


def validate_password(password: str) -> str:
    if not _validate_length(password, 5, 30):
        raise ValidationException("Password must be 5-30 characters long")

    return password


def validate_task_name(task_name: str) -> str:
    if not _validate_length(task_name, 3, 30):
        raise ValidationException("Task name must be 3-30 characters long")

    return task_name


def validate_due_date(due_date: datetime) -> datetime:
    if not due_date or due_date <= datetime.now():
        raise ValidationException("Due date must be in the future")

    return due_date


def _validate_length(st: str, bottom: int, top: int) -> bool:
    length = len(st)
    return bottom <= length <= top
