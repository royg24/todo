from fastapi.testclient import TestClient
from fastapi import status
import pytest
from main import app

client = TestClient(app)


@pytest.mark.order(5)
def test_delete_task():

    login_response = client.post("/auth/login/", json={"username": "royg24", "password": "123456789"})
    token = login_response.json()["token"]

    task1 = {"name": "Wash car", "description": "Make the car shining, no single dirt", "due_date": "2027-09-04T16:00"}
    task2 = {"name": "Make dinner", "description": "Make meal for all the family", "due_date": "2027-09-02T20:30"}

    task1_id = client.post("/tasks/", json=task1, headers={"Authorization": f"Bearer {token}"}).json()["task_id"]
    task2_id = client.post("/tasks/", json=task2, headers={"Authorization": f"Bearer {token}"}).json()["task_id"]

    num_of_tasks = len(client.get("/tasks/", headers={"Authorization": f"Bearer {token}"}).json()["tasks"])

    response1 = client.delete(f"/tasks/{task1_id}", headers={"Authorization": f"Bearer {token}"})
    assert response1.status_code == status.HTTP_204_NO_CONTENT

    tasks = client.get("/tasks/", headers={"Authorization": f"Bearer {token}"}).json()["tasks"]
    assert [task for task in tasks if task["task_id"] == task1_id] == []

    updated_num_of_tasks = len(tasks)
    assert updated_num_of_tasks == num_of_tasks - 1

    response2 = client.delete(f"/tasks/{task2_id}", headers={"Authorization": f"Bearer {token}"})
    assert response2.status_code == status.HTTP_204_NO_CONTENT

    tasks = client.get("/tasks/", headers={"Authorization": f"Bearer {token}"}).json()["tasks"]
    assert [task for task in tasks if task["task_id"] == task2_id] == []

    updated_num_of_tasks = len(tasks)
    assert updated_num_of_tasks == num_of_tasks - 2
