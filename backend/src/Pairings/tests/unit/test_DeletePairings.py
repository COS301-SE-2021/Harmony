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
    data = json.loads(ret)
    print(data)
    assert data["isSuccessful"] == "true"
    assert "PID" in data