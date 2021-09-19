import unittest
import json

import pytest
from backend.src.Pairings.main import Voting


@pytest.fixture()
def upvote_checked():
    return {
        "UID": "u2",
        "PID": "p2",
        "VoteType": "Upvotes",
        "IsChecked": "Checked"
    }


@pytest.fixture()
def upvote_unchecked():
    return {
        "UID": "u2",
        "PID": "p2",
        "VoteType": "Upvotes",
        "IsChecked": "Unchecked"
    }


@pytest.fixture()
def downvote_checked():
    return {
        "UID": "u2",
        "PID": "p2",
        "VoteType": "Downvotes",
        "IsChecked": "Checked"
    }


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


def test_add_to_upvote(upvote_checked):
    ret = Voting.vote(upvote_checked,"")
    print(ret)
    assert ret["StatusCode"] == 200


def test_remove_from_upvote(upvote_unchecked):
    ret = Voting.vote(upvote_unchecked,"")
    print(ret)
    assert ret["StatusCode"] == 200


def test_add_to_downvote(downvote_checked):
    ret = Voting.vote(downvote_checked,"")
    print(ret)
    assert ret["StatusCode"] == 200

def test_remove_from_downvote(downvote_unchecked):
    ret = Voting.vote(downvote_unchecked, "")
    print(ret)
    assert ret["StatusCode"] == 200

def test_negative_double_upvote_error(upvote_checked, upvote_unchecked):
    Voting.vote(upvote_checked,"")
    ret = Voting.vote(upvote_checked,"")
    Voting.vote(upvote_unchecked,"")
    print(ret)
    assert ret["StatusCode"] == 400

def test_negative_double_downvote_error(downvote_checked, downvote_unchecked):
    Voting.vote(downvote_checked,"")
    ret = Voting.vote(downvote_checked,"")
    Voting.vote(downvote_unchecked,"")
    print(ret)
    assert ret["StatusCode"] == 400

