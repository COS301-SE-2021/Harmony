import json

# import the AWS SDK (for Python the package name is boto3)
import boto3
import csv
from botocore.exceptions import ClientError

# importing libraries
import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
pairingtable = dynamodb.Table('PairingData')
ratingtable = dynamodb.Table('UserInteractions')

# define the handler function that the Lambda service will use as an entry point
def recommender_function(event, context):

    """Get users from dynamodb table"""
    pairingresponse = pairingtable.scan()
    pairingresponse = pairingresponse["Items"]

    ratingresponse = ratingtable.scan()
    ratingresponse = ratingresponse["Items"]



    """Convert Dynamodb json to csv to be used by recommender system"""

    with open("pairings.csv", "w", newline="") as f:  # python 2: open("output.csv","wb")
        title = "PID,MealName".split(",")  # quick hack
        cw = csv.DictWriter(f, title, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        cw.writeheader()
        cw.writerows(pairingresponse)

    pairings = pd.read_csv('pairings.csv', usecols=['PID', 'MealName'])

    with open("users.csv", "w", newline="") as f:  # python 2: open("output.csv","wb")
        title = "RatingId,InteractionScore,PID,UID".split(",")  # quick hack
        cw = csv.DictWriter(f, title, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        cw.writeheader()
        cw.writerows(ratingresponse)

    users = pd.read_csv('users.csv', usecols=['RatingId', 'InteractionScore','PID','UID'])
    users2 = pd.merge(pairings, users, how='inner', on='PID')
    df = users2.pivot_table(index='MealName', columns='UID', values='InteractionScore').fillna(0)
    df1 = df.copy()





    def recommend_pairings(user, num_recommended_pairings):

        print('The list of the Pairings {} has interacted with \n'.format(user))

        for m in df[df[user] > 0][user].index.tolist():
            print(m)

        print('\n')

        recommended_pairings = []

        for m in df[df[user] == 0].index.tolist():
            index_df = df.index.tolist().index(m)  # get an index for a pairing
            predicted_rating = df1.iloc[index_df, df1.columns.tolist().index(user)]
            recommended_pairings.append((m, predicted_rating))

        sorted_rm = sorted(recommended_pairings, key=lambda x: x[1], reverse=True)

        print('The list of the interacted Pairings \n')
        rank = 1
        for recommended_pairing in sorted_rm[:num_recommended_pairings]:
            print('{}: {} - predicted rating:{}'.format(rank, recommended_pairing[0], recommended_pairing[1]))
            rank = rank + 1

    def pairing_recommender(user, num_neighbors, num_recommendation):

        number_neighbors = num_neighbors

        # find the nearest neighbors using NearestNeighbors(num_neighbors=3)
        knn = NearestNeighbors(metric='cosine', algorithm='brute')
        knn.fit(df.values)
        distances, indices = knn.kneighbors(df.values, n_neighbors=number_neighbors)

        # convert user_name to user_index
        user_index = df.columns.tolist().index(user) # get an index for a pairing

        for m, t in list(enumerate(df.index)):
            if df.iloc[m, user_index] == 0:
                sim_pairings = indices[m].tolist() # make list for similar pairings
                pairing_distances = distances[m].tolist() # the list for distances of similar pairings

                if m in sim_pairings:
                    id_pairing = sim_pairings.index(m) # get the position of the movie itself in indices and distances
                    sim_pairings.remove(m)              # remove the pairing itself in indices
                    pairing_distances.pop(id_pairing)   # remove the pairing itself in distances

                else:
                    sim_pairings = sim_pairings[:num_neighbors - 1]
                    pairing_distances = pairing_distances[:num_neighbors - 1]

                pairing_similarity = [1 - x for x in pairing_distances]
                pairing_similarity_copy = pairing_similarity.copy()
                nominator = 0

                for s in range(0, len(pairing_similarity)):
                    if df.iloc[sim_pairings[s], user_index] == 0:
                        if len(pairing_similarity_copy) == (number_neighbors - 1):
                            pairing_similarity_copy.pop(s)

                        else:
                            pairing_similarity_copy.pop(s - (len(pairing_similarity) - len(pairing_similarity_copy)))

                    else:
                        nominator = nominator + pairing_similarity[s] * df.iloc[sim_pairings[s], user_index]

                if len(pairing_similarity_copy) > 0:
                    if sum(pairing_similarity_copy) > 0:
                        predicted_r = nominator / sum(pairing_similarity_copy)

                    else:
                        predicted_r = 0

                else:
                    predicted_r = 0

                df1.iloc[m, user_index] = predicted_r
        recommend_pairings(user, num_recommendation)


    pairing_recommender("jd1", 2, 3)


    return


recommender_function("", "")
