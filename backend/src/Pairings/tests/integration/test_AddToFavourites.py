import json

import pytest

from backend.src.Pairings.main import AddToFavourites


@pytest.fixture()
def fixture_event():
    return {
        "PID": "p1",
        "UID": "u2"
    }


def test_add_to_favourites(fixture_event):
    ret = AddToFavourites.add_to_favourites(fixture_event, "")
    data = json.loads(ret)
    print(ret)
    assert data["StatusCode"] == 200
    assert "PID" in data

def test_add_to_favourites_twice_error(fixture_event):
    ret = AddToFavourites.add_to_favourites(fixture_event, "")
    data = json.loads(ret)
    print(ret)
    assert data["StatusCode"] == 400
    assert "PID" in data

def test_if_pass_invalid_string():
    ret = AddToFavourites.validate_event("","")
    print(ret)
    assert ret == "false"

def test_validate_request_correct_string():
    ret = AddToFavourites.validate_event("u1", "p1")
    print(ret)
    assert ret == "true"


def test_remove_favourite():
    ret = AddToFavourites.check_if_fav_exists("u1", "p9")
    print(ret)
    assert ret == "true"

