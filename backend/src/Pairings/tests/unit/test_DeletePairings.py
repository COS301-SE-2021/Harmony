import json

import pytest

from backend.src.Pairings.main import DeletePairing


@pytest.fixture()
def fixture_event():
    return {
        "PID": "p1",
        "UID" : "u2",
    }

def test_validate_request():
    ret = DeletePairing.validate_request("p1")
    assert ret == "true"

def test_invalid_request_value():
    ret = DeletePairing.validate_request(10)
    assert ret == "false"

def test_invalid_request_emptystring():
    ret = DeletePairing.validate_request("")
    assert ret == "false"

def test_remove_favourite():
    ret = DeletePairing.remove_favourite("p1")
    data = json.loads(ret)
    assert data["isSuccessful"] == "true"
    assert "PID" in data
