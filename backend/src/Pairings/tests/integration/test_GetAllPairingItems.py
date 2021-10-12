import pytest

from backend.src.Pairings.main import GetAllPairingItems

# def test_New_Pairing(fixture_event):
#     ret = NewPairing.newpairing(fixture_event, "")
#     data = json.loads(ret)
#     assert data["isSuccessful"] == "true"
#     assert "PID" in data

"""Test 1 : test that all data is being returned"""


def test_get_food_drink_tag_data():
    ret = GetAllPairingItems.get_all_items("", "")
    assert ret["StatusCode"] == 200


"""Test 2 : test that all food data is being returned"""


def test_get_all_food_data():
    ret = GetAllPairingItems.get_all_foods()
    assert len(ret) > 0


"""Test 3 : test that all drink data is being returned"""


def test_get_all_drink_data():
    ret = GetAllPairingItems.get_all_drinks()
    assert len(ret) > 0


"""Test 4 : test that all mealtag data is being returned"""


def test_get_all_mealtag_data():
    ret = GetAllPairingItems.get_all_mealtags()
    assert len(ret) > 0
