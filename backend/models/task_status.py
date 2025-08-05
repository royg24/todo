from enum import Enum


class TaskStatus(Enum):
    COMPLETED = 1
    PENDING = 2
    IN_PROGRESS = 3
    CANCELLED = 4
