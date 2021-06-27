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

    ret = NewPairing.New_Pairing(fixture_event, "")
    data = json.loads(ret)
    print(data)
    assert data["isSuccessful"] == "true"
    assert "PID" in data
