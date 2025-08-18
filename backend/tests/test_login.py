
from fastapi.testclient import TestClient
from fastapi import status
import pytest
from main import app

client = TestClient(app)


@pytest.mark.order(2)
def test_login():
    response = client.post("/auth/login/", json={"username": "royg24", "password": "123456789"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["message"] == "Login successful"

    token = response.json()["token"]
    assert token is not None
    assert token is not ""

    response = client.post("/auth/login/", json={"username": "royg24", "password": "12345678"})
    assert response.status_code == status.HTTP_401_UNAUTHORIZED, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["detail"] == "Username is taken or password is incorrect"

    response = client.post("/auth/login/", json={"username": "royg24@^", "password": "123456789"})
    assert response.status_code == status.HTTP_400_BAD_REQUEST, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["detail"] == "Username must be alphanumeric and 3-30 characters long"

    response = client.post("/auth/login/", json={"username": "ro", "password": "12345678"})
    assert response.status_code == status.HTTP_400_BAD_REQUEST, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["detail"] == "Username must be alphanumeric and 3-30 characters long"

    response = client.post("/auth/login/", json={"username": "royg24", "password": "12345678912345678912345678912345"})
    assert response.status_code == status.HTTP_400_BAD_REQUEST, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["detail"] == "Password must be 5-30 characters long"


    response = client.post("/auth/login/", json={"username": "royg24", "password": "123456789"})
    assert response.status_code == status.HTTP_200_OK, f"code: {response.status_code}\n{response.json()['detail']}"
    assert response.json()["message"] == "Login successful"

    token = response.json()["token"]
    assert token is not None
    assert token is not ""
