import unittest
import json

import pytest
from backend.src.Pairings.main.Voting import addvote


@pytest.fixture()
def fixture_event():
    return {

    }


"""
TEST_1 : Testing if a Checked input adds to the numvotes variable
"""


def test_add_vote_for_checked_input():
    ret = addvote("Checked", 5)
    assert ret == 6


"""
TEST_2 : Testing if a Unchecked input subtracts the numvotes variable
"""


def test_subtract_vote_for_checked_input():
    ret = addvote("Unchecked", 1234)
    assert ret == 1233


"""
TEST_3 : Testing if a Unchecked input does not subtract to a negative integer
"""


def test_subtract_vote_for_zero_numvote():
    ret = addvote("Unchecked", 0)
    assert ret == 0

