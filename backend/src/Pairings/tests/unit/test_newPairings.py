import json

import pytest

from backend.src.Pairings.NewPairing import NewPairing


@pytest.fixture()
def fixture_event():
    return {
        "DrinkDesc": "drink desc",
        "DrinkItem": "some liquid",
        "FoodDesc": "this is a food",
        "FoodItem": "edible item",
        "Location": "the dumps",
        "UID": "u1"

    }


def test_New_Pairing(fixture_event):
    ret = NewPairing.newpairing(fixture_event, "")
    data = json.loads(ret)
    assert data["isSuccessful"] == "true"
    assert "PID" in data


def test_validate_string():
    ret = NewPairing.validatestring(" ")
    ret2 = NewPairing.validatestring("test")
    assert ret == False
    assert ret2 == True
