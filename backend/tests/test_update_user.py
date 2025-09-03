from fastapi.testclient import TestClient
from fastapi import status
import pytest
from main import app

client = TestClient(app)


@pytest.mark.order(6)
def test_update_username():
    login_response = client.post("/auth/login/",
                                 json={"username": "royg24", "email": "roy@goldhar.net", "password": "123456789"})
    token1 = login_response.json()["token"]

    response = client.patch("/users", json={"username": "royg89"}, headers={"Authorization": f"Bearer {token1}"})
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["username"] == "royg89"
    assert response.json()["email"] == "roy@goldhar.net"
    assert response.json()["message"] == "User updated successfully"

    login_response = client.post("/auth/login/",
                                 json={"username": "royg24", "email": "roy@goldhar.com", "password": "123456789"})
    token2 = login_response.json()["token"]
    assert token1 != token2

    response = client.patch("/users", json={"username": "royg89"}, headers={"Authorization": f"Bearer {token2}"})
    assert response.status_code == status.HTTP_409_CONFLICT
    assert response.json()["detail"] == "Username royg89 is already in use"

    response = client.patch("/users", json={"email": "email@email.com"}, headers={"Authorization": f"Bearer {token2}"})
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["email"] == "email@email.com"
    assert response.json()["username"] == "royg24"
    assert response.json()["message"] == "User updated successfully"

    response = client.patch("/users", json={"email": "email@email.com"}, headers={"Authorization": f"Bearer {token1}"})
    assert response.status_code == status.HTTP_409_CONFLICT
    assert response.json()["detail"] == "Email email@email.com is already in use"
