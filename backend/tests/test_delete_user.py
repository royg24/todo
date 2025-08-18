from fastapi.testclient import TestClient
from fastapi import status
import pytest
from main import app

client = TestClient(app)


@pytest.mark.order(8)
def test_delete_task():
    login_response = client.post("/auth/login/", json={"username": "royg24", "password": "123456789"})
    token1 = login_response.json()["token"]

    login_response = client.post("/auth/login/", json={"username": "royg89", "password": "123456789"})
    token2 = login_response.json()["token"]

    response = client.delete("/users", headers={"Authorization": f"Bearer {token1}"})
    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = client.get("/tasks", headers={"Authorization": f"Bearer {token1}"})
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Unauthorized user"}

    response = client.delete("/users", headers={"Authorization": f"Bearer {token2}"})
    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = client.get("/tasks", headers={"Authorization": f"Bearer {token2}"})
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Unauthorized user"}
