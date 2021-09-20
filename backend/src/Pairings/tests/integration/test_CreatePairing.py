import json

import pytest
import sys
import time

from backend.src.Pairings.main import CreatePairing


@pytest.fixture()
def valid_input():
    return {

        "UID" : "u2",
        "Foodid" : "f1",
        "Drinkid" : "d1",
        "Mealtagid" : "m1",
        "Latitude" :  -26.457240,
        "Longitude" : 29.461550

    }

def test_if_pass_valid_event_keys(valid_input,benchmark):
    ret = CreatePairing.create_pairing(valid_input,"")
    assert ret["StatusCode"] == 200
    benchmark(lambda: time.sleep(0.01))
