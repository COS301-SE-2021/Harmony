import json

import pytest
import sys
import time
from functools import partial

from backend.src.Pairings.main import AddToFavourites


@pytest.fixture()
def fixture_event():
    return {
        "PID": "p1",
        "UID": "u2"
    }


def test_add_to_favourites(fixture_event,benchmark):
    ret = AddToFavourites.add_to_favourites(fixture_event, "")
    data = json.loads(ret)
    print(ret)
    assert data["StatusCode"] == 200
    assert "PID" in data
    benchmark(lambda: time.sleep(0.01))


def test_add_to_favourites_twice_error(fixture_event,benchmark):
    ret = AddToFavourites.add_to_favourites(fixture_event, "")
    data = json.loads(ret)
    print(ret)
    assert data["StatusCode"] == 400
    assert "PID" in data
    benchmark(lambda: time.sleep(0.01))


def test_if_pass_invalid_string(benchmark):
    ret = AddToFavourites.validate_event("","")
    print(ret)
    assert ret == "false"
    benchmark(lambda: time.sleep(0.01))


def test_validate_request_correct_string(benchmark):
    ret = AddToFavourites.validate_event("u1", "p1")
    print(ret)
    assert ret == "true"
    benchmark(lambda: time.sleep(0.01))




def test_remove_favourite(benchmark):
    ret = AddToFavourites.check_if_fav_exists("u1", "p9")
    print(ret)
    assert ret == "true"
    benchmark(lambda: time.sleep(0.01))



