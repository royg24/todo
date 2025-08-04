from fastapi import FastAPI
from routes.routes import router
from dotenv import load_dotenv
import os
import secrets

load_dotenv()
users = []
os.environ["JWT_SECRET_KEY"] = secrets.token_urlsafe()

app = FastAPI(title="TODO app", docs_url="/swagger")

app.include_router(router)
