import bcrypt
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jwt import decode, encode, ExpiredSignatureError, InvalidTokenError
from uuid import UUID
import os
from datetime import datetime, timezone, timedelta
from exceptions_handler import AuthenticationException

security = HTTPBearer()


def create_token(user_id: UUID, expires_hours=2):
    payload = {
        "id": str(user_id),
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


def hash_password(password: str) -> str:
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed.decode('utf-8')


def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
