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


@asynccontextmanager
async def lifespan(_app: FastAPI):

    Base.metadata.create_all(engine)
    print("App is running")
    print("Tables created")
    yield
    print("App shutting down")


app = FastAPI(lifespan=lifespan, title="TODO app", docs_url="/swagger")
app.include_router(router)
