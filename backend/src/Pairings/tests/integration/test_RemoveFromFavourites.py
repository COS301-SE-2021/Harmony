import json

import pytest
import sys
import time

from backend.src.Pairings.main import RemoveFromFavourites


@pytest.fixture()
def fixture_event():
    return {
        "PID": "p1",
        "UID": "u2",

    }


def test_remove_from_favourites(fixture_event,benchmark):
    ret = RemoveFromFavourites.remove_from_favourites(fixture_event, "")
    data = json.loads(ret)
    print(data)
    assert data["StatusCode"] == 200
    assert "PID" in data
    benchmark(lambda: time.sleep(0.01))


def test_remove_if_already_removed(fixture_event,benchmark):
    ret = RemoveFromFavourites.remove_from_favourites(fixture_event, "")
    data = json.loads(ret)
    print(data)
    assert data["StatusCode"] == 400
    assert "PID" in data
    benchmark(lambda: time.sleep(0.01))


def test_if_pass_invalid_string(benchmark):
    ret = RemoveFromFavourites.validate_request("","")
    print(ret)
    assert ret == "false"
    benchmark(lambda: time.sleep(0.01))


def test_validate_request(benchmark):
    ret = RemoveFromFavourites.validate_request("p1", "u1")
    assert ret == "true"
    benchmark(lambda: time.sleep(0.01))

