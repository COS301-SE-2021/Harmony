import json

import pytest
from backend.src.Filter.main.SortAndFilter import sortbydistance
from backend.src.Filter.main.SortAndFilter import sortbynew
from backend.src.Filter.main.SortAndFilter import sortbycontroversial
from backend.src.Filter.main.SortAndFilter import sort_and_filter
from backend.src.Filter.main.SortAndFilter import sortbybest
from backend.src.Filter.main.SortAndFilter import sortbytrending


@pytest.fixture()
def fixture_event():
    return {

    }