
from fastapi.testclient import TestClient
from fastapi import status
import pytest
from models.task_status import TaskStatus
from main import app

client = TestClient(app)


@pytest.mark.order(3)
def test_get():
    login_response = client.post("/auth/login/",
                                 json={"username": "royg24", "email": "roy@goldhar.net", "password": "123456789"})
    token = login_response.json()["token"]

    response = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert len(response.json()["tasks"]) == 2

    tasks = response.json()["tasks"]
    tasks.sort(key=lambda t: t["name"])

    assert tasks[0]["name"] == "Call mom"
    assert tasks[1]["name"] == "Go to swim"

    assert tasks[0]["status"] == TaskStatus.PENDING.value
    assert tasks[1]["status"] == TaskStatus.PENDING.value

    assert tasks[0]["created_at"] is not None
    assert tasks[1]["created_at"] is not None

    task1 = {"name": "Go to the mall", "description": "Buy clothes and shoes", "due_date": "2027-01-01T12:00"}
    task2 = {"name": "Clean the house", "description": "Clean the house", "due_date": "2027-04-11T14:00"}

    task1_id = client.post("/tasks", json=task1, headers={"Authorization": f"Bearer {token}"}).json()["task_id"]
    task2_id = client.post("/tasks", json=task2, headers={"Authorization": f"Bearer {token}"}).json()["task_id"]

    response = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert len(response.json()["tasks"]) == 4

    client.patch(f"/tasks/{task1_id}", json={"status": TaskStatus.IN_PROGRESS.value},
                 headers={"Authorization": f"Bearer {token}"})
    response = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert len(response.json()["tasks"]) == 4

    client.patch(f"/tasks/{task1_id}", json={"status": TaskStatus.COMPLETED.value},
                 headers={"Authorization": f"Bearer {token}"})
    client.patch(f"/tasks/{task2_id}", json={"status": TaskStatus.COMPLETED.value},
                 headers={"Authorization": f"Bearer {token}"})

    response = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert len(response.json()["tasks"]) == 4

    response = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert len(response.json()["tasks"]) == 4

    response = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert len(response.json()["tasks"]) == 4
