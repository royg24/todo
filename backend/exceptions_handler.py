from fastapi import HTTPException, status


class ValidationException(HTTPException):
    def __init__(self, message: str):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=message)


class AuthenticationException(HTTPException):
    def __init__(self, message: str):
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail=message)


class NotFoundException(HTTPException):
    def __init__(self, message: str):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=message)


class DatabaseException(HTTPException):
    def __init__(self, response_status: int, message: str):
        super().__init__(status_code=response_status, detail=message)
