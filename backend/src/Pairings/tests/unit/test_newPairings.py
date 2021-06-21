import json

import pytest

from backend.src.Pairings.NewPairing import app


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


def test_lambda_handler(fixture_event):

    ret = app.lambda_handler(fixture_event, "")
    data = json.loads(ret)
    print(data)
    assert data["isSuccessful"] == "true"
    assert "PID" in data
