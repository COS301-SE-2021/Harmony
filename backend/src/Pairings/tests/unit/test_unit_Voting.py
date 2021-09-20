import unittest
import json

import pytest
from backend.src.Pairings.main import Voting


@pytest.fixture()
def downvote_unchecked():
    return {
        "UID": "u2",
        "PID": "p2",
        "VoteType": "Downvotes",
        "IsChecked": "Unchecked"
    }


"""
TEST_1 : Testing if a Checked input adds to the numvotes variable
"""


def test_add_vote_for_checked_input():
    ret = Voting.addvote("Checked", 5)
    assert ret == 6


"""
TEST_2 : Testing if a Unchecked input subtracts the numvotes variable
"""


def test_subtract_vote_for_checked_input():
    ret = Voting.addvote("Unchecked", 1234)
    assert ret == 1233


"""
TEST_3 : Testing if a Unchecked input does not subtract to a negative integer
"""


def test_subtract_vote_for_zero_numvote():
    ret = Voting.addvote("Unchecked", 0)
    assert ret == 0




