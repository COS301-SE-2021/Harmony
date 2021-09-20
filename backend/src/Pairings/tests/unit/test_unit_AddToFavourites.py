import json

import pytest

from backend.src.Pairings.main import AddToFavourites


@pytest.fixture()
def fixture_event():
    return {
        "PID": "p1",
        "UID": "u2"
    }



def test_if_pass_invalid_string():
    ret = AddToFavourites.validate_event("","")
    print(ret)
    assert ret == "false"

def test_validate_request_correct_string():
    ret = AddToFavourites.validate_event("u1", "p1")
    print(ret)
    assert ret == "true"

