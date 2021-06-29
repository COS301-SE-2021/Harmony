import json

import pytest

from backend.src.Pairings.DeletePairing import DeletePairing


@pytest.fixture()
def fixture_event():
    return {
        "PID": "p1"
    }


def test_delete_pairing(fixture_event):

    ret = DeletePairing.delete_pairing(fixture_event, "")
    data = json.loads(ret['body'])
    assert data["isSuccessful"] == "true"
    assert "PID" in data


def test_validate_request():
    ret = DeletePairing.validate_request("p1")
    assert ret == "true"


def test_remove_favourite():
    ret = DeletePairing.remove_favourite("p1")
    data = json.loads(ret)
    assert data["isSuccessful"] == "true"
    assert "PID" in data
