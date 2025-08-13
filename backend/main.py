from contextlib import asynccontextmanager

from fastapi import FastAPI
from routes.routes import router
from dotenv import load_dotenv
import os
import secrets

from database import engine
from database.base import Base

load_dotenv()

os.environ["JWT_SECRET_KEY"] = secrets.token_urlsafe()

app = FastAPI(title="TODO app", docs_url="/swagger")

app.include_router(router)


@asynccontextmanager
async def lifespan():
    Base.metadata.create_all(engine)
    print("Tables created")
