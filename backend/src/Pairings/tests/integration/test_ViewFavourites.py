import json

import pytest

from backend.src.Pairings.main import ViewFavourites


@pytest.fixture()
def fixture_event():
    return {
        "UID": "u2",
        "Sort": "Trending",
        "MealTags": [],
        "FoodTags": [],
        "DrinkTags": [],
        "Distance": None,
        "Longitude": 25.2589,
        "Latitude": -28.25897

    }


@pytest.fixture()
def incorrect_meal_tag():
    return {
        "UID": "u2",
        "Sort": "Trending",
        "MealTags": ["Something Incorrect"],
        "FoodTags": [],
        "DrinkTags": [],
        "Distance": None,
        "Longitude": 25.2589,
        "Latitude": -28.25897

    }


@pytest.fixture()
def incorrect_food_tag():
    return {
        "UID": "u2",
        "Sort": "Trending",
        "MealTags": [],
        "FoodTags": ["Something Incorrect"],
        "DrinkTags": [],
        "Distance": None,
        "Longitude": 25.2589,
        "Latitude": -28.25897

    }


@pytest.fixture()
def incorrect_drink_tag():
    return {
        "UID": "u2",
        "Sort": "Trending",
        "MealTags": [],
        "FoodTags": [],
        "DrinkTags": ["Something Incorrect"],
        "Distance": None,
        "Longitude": 25.2589,
        "Latitude": -28.25897

    }

@pytest.fixture()
def incorrect_sort_type():
    return {
        "UID": "u2",
        "Sort": "wrong sort",
        "MealTags": [],
        "FoodTags": [],
        "DrinkTags": ["Something Incorrect"],
        "Distance": None,
        "Longitude": 25.2589,
        "Latitude": -28.25897

    }

def test_view_favourites_with_valid_data_from_db(fixture_event):
    data = ViewFavourites.view_favourites(fixture_event, "")
    print(data)
    assert data["StatusCode"] == 200
    assert "Data" in data


def test_view_favourites_with_wrong_mealtag_data(incorrect_meal_tag):
    data = ViewFavourites.view_favourites(incorrect_meal_tag, "")
    print(data)
    assert data["StatusCode"] == 204
    assert "Data" in data

def test_view_favourites_with_wrong_foodtag_data(incorrect_food_tag):
    data = ViewFavourites.view_favourites(incorrect_food_tag, "")
    print(data)
    assert data["StatusCode"] == 204
    assert "Data" in data

def test_view_favourites_with_wrong_drinktag_data(incorrect_drink_tag):
    data = ViewFavourites.view_favourites(incorrect_drink_tag, "")
    print(data)
    assert data["StatusCode"] == 204
    assert "Data" in data

def test_view_favourites_with_wrong_sort_type(incorrect_drink_tag):
    data = ViewFavourites.view_favourites(incorrect_drink_tag, "")
    print(data)
    assert data["StatusCode"] == 204
    assert "Data" in data