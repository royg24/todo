from fastapi import HTTPException


class ValidationException(HTTPException):

    def __init__(self, message: str):
        super().__init__(status_code=400, detail=message)


class AuthenticationException(HTTPException):
    def __init__(self, message: str):
        super().__init__(status_code=401, detail=message)


class NotFoundException(HTTPException):
    def __init__(self, message: str):
        super().__init__(status_code=404, detail=message)