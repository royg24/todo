
from fastapi.testclient import TestClient
from fastapi import status
from models.task_status import TaskStatus
import pytest
from main import app

client = TestClient(app)


@pytest.mark.order(4)
def test_update_task():
    login_response = client.post("/auth/login/", json={"username": "royg24", "password": "123456789"})
    token = login_response.json()["token"]

    task = {"name": "Buy groceries", "description": "Buy apples and bananas", "due_date": "2028-08-05T16:00"}
    response = client.post("/tasks", json=task, headers={"Authorization": f"Bearer {token}"})
    task_id = response.json()["task_id"]

    update_name = {"name": "Buy fruits"}
    assert response.json()["name"] != update_name["name"]
    response = client.patch(f"/tasks/{task_id}", json=update_name, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["name"] == update_name["name"]

    tasks = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    for task in tasks.json()["tasks"]:
        if task["task_id"] == task_id:
            assert task["name"] == update_name["name"]
            break

    update_description = {"description": "Buy apples, oranges and bananas"}
    assert response.json()["description"] != update_description["description"]
    response = client.patch(f"/tasks/{task_id}", json=update_description, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["description"] == update_description["description"]

    tasks = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    for task in tasks.json()["tasks"]:
        if task["task_id"] == task_id:
            assert task["description"] == update_description["description"]
            break

    update_due_date = {"due_date": "2029-02-24T10:00:00"}
    assert response.json()["due_date"] != update_due_date["due_date"]
    response = client.patch(f"/tasks/{task_id}", json=update_due_date, headers={'Authorization': f"Bearer {token}"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["due_date"] == update_due_date["due_date"]

    tasks = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    for task in tasks.json()["tasks"]:
        if task["task_id"] == task_id:
            assert task["due_date"] == update_due_date["due_date"]
            break

    update_name_and_description = {"name": "Buy vegetables", "description": "Buy tomato and carrot"}
    assert response.json()["name"] != update_name_and_description["name"]
    assert response.json()["description"] != update_name_and_description["description"]

    response = client.patch(f"/tasks/{task_id}", json=update_name_and_description, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["name"] == update_name_and_description["name"]
    assert response.json()["description"] == update_name_and_description["description"]

    tasks = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    for task in tasks.json()["tasks"]:
        if task["task_id"] == task_id:
            assert task["name"] == update_name_and_description["name"]
            assert task["description"] == update_name_and_description["description"]
            break

    update_status = {"status": TaskStatus.COMPLETED.value}
    assert response.json()["status"] != update_status["status"]
    response = client.patch(f"/tasks/{task_id}", json=update_status, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["status"] == update_status["status"]

    tasks = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    for task in tasks.json()["tasks"]:
        if task["task_id"] == task_id:
            assert task["status"] == update_status["status"]
            break

    assert response.json()["status"] == update_status["status"]
    response = client.patch(f"/tasks/{task_id}", json=update_status, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["status"] == update_status["status"]

    tasks = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    for task in tasks.json()["tasks"]:
        if task["task_id"] == task_id:
            assert task["status"] == update_status["status"]
            break

    update_all = {
                    "name": "Buy snacks",
                    "description": "Buy chips and pretzels",
                    "due_date": "2029-12-12T12:00:00",
                    "status": TaskStatus.CANCELLED.value
    }

    assert response.json()["name"] != update_all["name"]
    assert response.json()["description"] != update_all["description"]
    assert response.json()["due_date"] != update_all["due_date"]
    assert response.json()["status"] != update_all["status"]
    response = client.patch(f"/tasks/{task_id}", json=update_all, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["name"] == update_all["name"]
    assert response.json()["description"] == update_all["description"]
    assert response.json()["due_date"] == update_all["due_date"]
    assert response.json()["status"] == update_all["status"]

    tasks = client.get("/tasks", headers={"Authorization": f"Bearer {token}"})
    for task in tasks.json()["tasks"]:
        if task["task_id"] == task_id:
            assert task["name"] == update_all["name"]
            assert task["description"] == update_all["description"]
            assert task["due_date"] == update_all["due_date"]
            assert task["status"] == update_all["status"]
            break
