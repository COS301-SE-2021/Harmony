import json

import pytest

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
@pytest.fixture()
def invalid_input():
    return {

        "UID" : "",
        "Foodid" : 200,
        "Drinkid" : "d1",
        "Mealtagid" : "m1",
        "Latitude" :  "l",
        "Longitude" : 29.461550

    }

@pytest.fixture()
def invalid_input_no_keys():
    return {

    }

@pytest.fixture()
def invalid_input_incorrect_keys():
    return {

        "UD" : "u2",
        "Fodid" : "f1",
        "Dnkid" : "d1",
        "Magid" : "m1",
        "Laude" :  -26.457240,
        "Loude" : 29.461550

    }

@pytest.fixture()
def invalid_input_missing_keys():
    return {

        "UID" : "u2",
        "Foodid" : "f1",
        "Latitude" :  -26.457240,
        "Longitude" : 29.461550

    }



def test_if_pass_valid_event_keys(valid_input):
    ret = CreatePairing.check_if_key_exists(valid_input)
    assert ret == True

def test_if_fail_no_event_keys(invalid_input_no_keys):
    ret = CreatePairing.check_if_key_exists(invalid_input_no_keys)
    assert ret == False

def test_if_fail_invalid_event_keys(invalid_input_incorrect_keys):
    ret = CreatePairing.check_if_key_exists(invalid_input_incorrect_keys)
    assert ret == False

def test_if_fail_missing_event_keys(invalid_input_missing_keys):
    ret = CreatePairing.check_if_key_exists(invalid_input_missing_keys)
    assert ret == False

def test_if_pass_valid_event_input(valid_input):
    ret = CreatePairing.check_if_input_is_valid(valid_input)
    assert ret == True

def test_if_fail_invalid_event_input(invalid_input):
    ret = CreatePairing.check_if_input_is_valid(invalid_input)
    assert ret == False