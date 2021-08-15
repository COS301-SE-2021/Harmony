import json

import pytest

from backend.src.Pairings.main import AddToFavourites


@pytest.fixture()
def fixture_event():
    return {
        "PID": "p1",
        "UID": "u1"
    }


def test_add_to_favourites(fixture_event):
    ret = AddToFavourites.add_to_favourites(fixture_event, "")
    data = json.loads(ret)
    assert data["isSuccessful"] == "false"
    assert "PID" in data


def test_validate_request():
    ret = AddToFavourites.validate_event("u1", "p1")
    assert ret == "true"


def test_remove_favourite():
    ret = AddToFavourites.check_if_fav_exists("u1", "p9")
    assert ret == "true"
