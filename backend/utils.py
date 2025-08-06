from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jwt import decode, encode, ExpiredSignatureError, InvalidTokenError
from uuid import UUID
import os
from datetime import datetime, timezone, timedelta
from models.user import User
from exceptions_handler import AuthenticationException

security = HTTPBearer()


def create_token(user: User, expires_hours=2):
    payload = {
        "id": str(user.id),
        "exp": datetime.now(timezone.utc) + timedelta(hours=expires_hours)
    }
    return encode(payload, os.getenv("JWT_SECRET_KEY"), algorithm='HS256')


def decode_token(token: str) -> UUID:

    try:
        decoded = decode(token, os.getenv("JWT_SECRET_KEY"), algorithms=['HS256'])
        return UUID(decoded["id"])
    except ExpiredSignatureError:
        raise AuthenticationException("Token has expired")
    except InvalidTokenError:
        raise AuthenticationException("Invalid token")


def get_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    return credentials.credentials
