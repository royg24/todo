from fastapi.testclient import TestClient
from fastapi import status
import pytest
from main import app

client = TestClient(app)


@pytest.mark.order(6)
def test_update_username():
    login_response = client.post("/auth/login/", json={"username": "royg24", "password": "123456789"})
    token1 = login_response.json()["token"]

    response = client.patch("/users/username?new_username=royg89", json={"new_username": "royg89"}, headers={"Authorization": f"Bearer {token1}"})
    assert response.status_code == status.HTTP_204_NO_CONTENT

    login_response = client.post("/auth/login/", json={"username": "royg24", "password": "123456789"})
    token2 = login_response.json()["token"]

    response = client.patch("/users/username?new_username=royg89", headers={"Authorization": f"Bearer {token2}"})
    assert response.status_code == status.HTTP_409_CONFLICT
    assert response.json()["detail"] == "royg89 already exists"
