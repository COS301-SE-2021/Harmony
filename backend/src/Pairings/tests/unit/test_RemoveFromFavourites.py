import json

import pytest

from backend.src.Pairings.removeFromFavourites import RemoveFromFavourites


@pytest.fixture()
def fixture_event():
    return {
        "PID": "p1",
        "UID": "u1",

    }


def test_remove_from_favourites(fixture_event):
    ret = RemoveFromFavourites.remove_from_favourites(fixture_event, "")
    data = json.loads(ret)
    print(data)
    assert data["isSuccessful"] == "true"
    assert "PID" in data


def test_validate_request():
    ret = RemoveFromFavourites.validate_request("p1", "u1")
    assert ret == "true"
