import os
import sys
from typing import Any, Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from dotenv import load_dotenv

from database.base import Base
from database.user import User
from database.task import Task


load_dotenv()

IS_TESTING = "pytest" in sys.modules or any("pytest" in arg for arg in sys.argv)

db_user = "TESTS_DB_USER" if IS_TESTING else "DB_USER"
db_password = "TESTS_DB_PASSWORD" if IS_TESTING else "DB_PASSWORD"
db_host = "TESTS_DB_HOST" if IS_TESTING else "DB_HOST"

USER = os.getenv(db_user)
PASSWORD = os.getenv(db_password)
HOST = os.getenv(db_host)
PORT = os.getenv("DB_PORT")
DBNAME = os.getenv("DB_NAME")

DATABASE_URL = f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}?sslmode=require"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_session() -> Generator[Session, Any, None]:
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
