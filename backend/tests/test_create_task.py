
from fastapi.testclient import TestClient
from fastapi import status
import pytest
from main import app

from models.task_status import TaskStatus

client = TestClient(app)


@pytest.mark.order(2)
def test_create_task():

    login_response = client.post("/auth/login/", json={"username": "royg24", "password": "123456789"})
    token = login_response.json()["token"]

    task1 = {"name": "Call mom", "description": "Don't forget to call mom", "due_date": "2028-08-05T16:00"}
    response1 = client.post("/tasks", json=task1, headers={"Authorization": f"Bearer {token}"})

    task2 = {"name": "Go to swim", "description": "Swim 750 meters at the pool", "due_date": "2028-08-10T18:30"}
    response2 = client.post("/tasks", json=task2, headers={"Authorization": f"Bearer {token}"})

    task3 = {"name": "", "due_date": ""}
    response3 = client.post("/tasks", json=task3, headers={"Authorization": f"Bearer {token}"})

    response4 = client.post("/tasks", json=task3, headers={"Authorization": f"Bearer {'token'}"})

    assert response1.status_code == status.HTTP_201_CREATED, f"code: {response1.status_code}\n{response1.json()['detail']}"
    assert response1.json()["name"] == "Call mom"
    assert response1.json()["description"] == "Don't forget to call mom"
    assert response1.json()["due_date"] == "2028-08-05T16:00:00"
    assert response1.json()["status"] == TaskStatus.PENDING.value

    assert response2.status_code == status.HTTP_201_CREATED, f"code: {response1.status_code}\n{response1.json()['detail']}"
    assert response2.json()["name"] == "Go to swim"
    assert response2.json()["description"] == "Swim 750 meters at the pool"
    assert response2.json()["due_date"] == "2028-08-10T18:30:00"
    assert response2.json()["status"] == TaskStatus.PENDING.value

    assert response3.status_code == status.HTTP_400_BAD_REQUEST or response3.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert response4.status_code == status.HTTP_401_UNAUTHORIZED or response3.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
