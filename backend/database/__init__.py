import os
import sys

import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from dotenv import load_dotenv

from database.base import Base
from database.user import User
from database.task import Task


load_dotenv()

IS_TESTING = "pytest" in sys.modules or any("pytest" in arg for arg in sys.argv)

db_user = "tests_user" if IS_TESTING else "user"
db_password = "tests_password" if IS_TESTING else "password"
db_host = "tests_host" if IS_TESTING else "host"

USER = os.getenv(db_user)
PASSWORD = os.getenv(db_password)
HOST = os.getenv(db_host)
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")

DATABASE_URL = f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}?sslmode=require"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="session", autouse=True)
def clear_tables_before_tests():
    if not IS_TESTING:
        return

    with engine.begin() as conn:
        conn.execute(text("SET session_replication_role = 'replica';"))

        for table in reversed(Base.metadata.sorted_tables):
            conn.execute(text(f'TRUNCATE TABLE "{table.name}" RESTART IDENTITY CASCADE;'))

        conn.execute(text("SET session_replication_role = 'origin';"))


def get_session() -> Session:
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
