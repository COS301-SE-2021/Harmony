import json

import pytest
import sys
import time

from backend.src.Pairings.main import ViewPairings


@pytest.fixture()
def fixture_event():
    return {
        "UID": "u1"
    }


"""This function expects the status code 200, and the data to be in the response if executed"""


def test_add_to_favourites(fixture_event, benchmark):
    ret = ViewPairings.View_Pairings(fixture_event, "")
    print(ret)
    assert ret["StatusCode"] == 200
    assert "Data" in ret
    benchmark(lambda: time.sleep(0.01))

