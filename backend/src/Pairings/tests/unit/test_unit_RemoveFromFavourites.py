import json

import pytest

from backend.src.Pairings.main import RemoveFromFavourites


@pytest.fixture()
def fixture_event():
    return {
        "PID": "p1",
        "UID": "u2",

    }


def test_if_pass_invalid_string():
    ret = RemoveFromFavourites.validate_request("", "")
    print(ret)
    assert ret == "false"


def test_if_pass_valid_string():
    ret = RemoveFromFavourites.validate_request("p1", "u1")
    assert ret == "true"
