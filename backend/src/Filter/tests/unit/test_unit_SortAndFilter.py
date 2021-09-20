import json

import pytest
from backend.src.Filter.main.SortAndFilter import sortbydistance
from backend.src.Filter.main.SortAndFilter import sortbynew
from backend.src.Filter.main.SortAndFilter import sortbycontroversial
from backend.src.Filter.main.SortAndFilter import sort_and_filter
from backend.src.Filter.main.SortAndFilter import sortbybest
from backend.src.Filter.main.SortAndFilter import sortbytrending
from backend.src.Filter.main.SortAndFilter import add_distances


@pytest.fixture()
def fixture_event():
    return {

    }

#mock input and output
inputresponse = [
  {
    'FoodDesc': 'Pizza is an Italian dish consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients, which is then baked at a high temperature, traditionally in a wood-fired oven.',
    'FoodTags': [
      'Savoury',
      'Hot',
      'Warm'
    ],
    'DateAdded': '2021-07-22',
    'FoodItem': 'Pizza',
    'PID': 'iciyrtdfucyr6556',
    'DrinkDesc': 'Fanta is a brand of fruit-flavored carbonated soft drinks',
    'DrinkItem': 'Fanta',
    'FoodImage': 'https://imagepairings.s3.eu-west-1.amazonaws.com/Foods/Pizza.jpg',
    'UID': 'u9',
    'DrinkImage': 'https://imagepairings.s3.eu-west-1.amazonaws.com/Drinks/Fanta.jpg',
    'FoodID': 'f5',
    'Coordinates': [
      '-26.006919',
      '29.119774'
    ],
    'MealTag': 'Supper',
    'Location': 'Everywhere',
    'DrinkTags': [
      'Sweet',
      'Cold',
      'Fizzy'
    ],
    'DrinkID': 'd2'
  }]
output = [
  {
    'FoodDesc': 'Pizza is an Italian dish consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients, which is then baked at a high temperature, traditionally in a wood-fired oven.',
    'FoodTags': [
      'Savoury',
      'Hot',
      'Warm'
    ],
    'DateAdded': '2021-07-22',
    'FoodItem': 'Pizza',
    'PID': 'iciyrtdfucyr6556',
    'DrinkDesc': 'Fanta is a brand of fruit-flavored carbonated soft drinks',
    'DrinkItem': 'Fanta',
    'FoodImage': 'https://imagepairings.s3.eu-west-1.amazonaws.com/Foods/Pizza.jpg',
    'UID': 'u9',
    'DrinkImage': 'https://imagepairings.s3.eu-west-1.amazonaws.com/Drinks/Fanta.jpg',
    'FoodID': 'f5',
    'Coordinates': [
      '-26.006919',
      '29.119774'
    ],
    'MealTag': 'Supper',
    'Location': 'Everywhere',
    'DrinkTags': [
      'Sweet',
      'Cold',
      'Fizzy'
    ],
    'DrinkID': 'd2',
    'Distance': 466
  }
]

"""
This function takes in a response and a coordinates and calculates the distance between the coordinates
in the input response and the passed in coordinates. It then adds the distance to a response which is
eventually returned.
"""
def test_add_distances():
    response = add_distances(inputresponse, -29.8579, 31.0292)
    assert response == output