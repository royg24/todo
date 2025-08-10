from enum import IntEnum


class TaskStatus(IntEnum):
    COMPLETED = 1
    PENDING = 2
    IN_PROGRESS = 3
    CANCELLED = 4
    OUTDATED = 5
