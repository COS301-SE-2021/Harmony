import json

import pytest

from backend.src.Pairings.viewFavourites import ViewFavourites


@pytest.fixture()
def fixture_event():
    return {
        "UID": "u1"
    }


def test_view_favourites(fixture_event):
    data = ViewFavourites.view_favourites(fixture_event, "")
    assert data["StatusCode"] == 200
    assert "Data" in data


def test_validate_uid():
    ret = ViewFavourites.validate_uid("u1")
    assert ret == "true"
