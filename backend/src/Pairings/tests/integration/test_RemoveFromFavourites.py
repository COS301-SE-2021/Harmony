import json

import pytest

from backend.src.Pairings.main import RemoveFromFavourites


@pytest.fixture()
def fixture_event():
    return {
        "PID": "p1",
        "UID": "u2",

    }


def test_remove_from_favourites(fixture_event):
    ret = RemoveFromFavourites.remove_from_favourites(fixture_event, "")
    data = json.loads(ret)
    print(data)
    assert data["StatusCode"] == 200
    assert "PID" in data

def test_remove_if_already_removed(fixture_event):
    ret = RemoveFromFavourites.remove_from_favourites(fixture_event, "")
    data = json.loads(ret)
    print(data)
    assert data["StatusCode"] == 400
    assert "PID" in data

def test_if_pass_invalid_string():
    ret = RemoveFromFavourites.validate_request("","")
    print(ret)
    assert ret == "false"

def test_validate_request():
    ret = RemoveFromFavourites.validate_request("p1", "u1")
    assert ret == "true"
