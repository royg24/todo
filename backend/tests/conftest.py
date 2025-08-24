
import pytest
from sqlalchemy import text

from database import IS_TESTING, engine, Base


@pytest.fixture(scope="session", autouse=True)
def clear_tables_around_tests():
    if not IS_TESTING:
        return

    with engine.begin() as conn:
        # Pre-test cleanup
        conn.execute(text("SET session_replication_role = 'replica';"))
        for table in reversed(Base.metadata.sorted_tables):
            conn.execute(text(f'TRUNCATE TABLE "{table.name}" RESTART IDENTITY CASCADE;'))
        conn.execute(text("SET session_replication_role = 'origin';"))

    yield  # run tests here

    with engine.begin() as conn:
        # Post-test cleanup
        conn.execute(text("SET session_replication_role = 'replica';"))
        for table in reversed(Base.metadata.sorted_tables):
            conn.execute(text(f'TRUNCATE TABLE "{table.name}" RESTART IDENTITY CASCADE;'))
        conn.execute(text("SET session_replication_role = 'origin';"))

