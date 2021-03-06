@ECHO OFF
ECHO Invoking Lambda's locally in a docker container
ECHO Testing ViewUserPairings.py
CALL sam local invoke ViewUserPairingsFunction -e events/viewUserPairingsRequest.json
ECHO ============================================================
ECHO Testing ViewFavourites.py
CALL sam local invoke viewFavouritesFunction -e events/viewFavRequest.json
ECHO ============================================================
ECHO Testing AddtoFavourites.py
CALL sam local invoke AddtoFavouritesFunction -e events/AddToFavRequest.json
ECHO ============================================================
ECHO Testing RemoveFromFavourites.py
CALL sam local invoke RemoveFromFavouritesFunction -e events/RemoveFromFavRequest.json