import json

import pytest
from backend.src.ImageRecognition.IdentifyFoodItem import identify_food_item
from backend.src.ImageRecognition.IdentifyFoodItem import validatestring


@pytest.fixture()
def fixture_event():
    return {

    }


"Testing if an empty string with no space is invalid"


def test_validate_string_for_empty_string():
    ret = validatestring("")
    assert ret == False


"Testing if an empty string with a space/s is invalid"


def test_validate_string_for_empty_string_with_spaces():
    ret = validatestring("  ")
    assert ret == False
