from enum import Enum


class TaskStatus(Enum):
    COMPLETED = "COMPLETED"
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    CANCELLED = "CANCELLED"
    OUTDATED = "OUTDATED"  # Maybe remove
