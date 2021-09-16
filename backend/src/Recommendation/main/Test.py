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
def example_function(event, context):
    # df = pd.DataFrame({'user_0': [0, 3, 0, 5, 0, 0, 4, 5, 0, 2], 'user_1': [0, 0, 3, 2, 5, 0, 4, 0, 3, 0],
    #                    'user_2': [3, 1, 0, 3, 5, 0, 0, 4, 0, 0], 'user_3': [4, 3, 4, 2, 0, 0, 0, 2, 0, 0],
    #                    'user_4': [2, 0, 0, 0, 0, 4, 4, 3, 5, 0], 'user_5': [1, 0, 2, 4, 0, 0, 4, 0, 5, 0],
    #                    'user_6': [2, 0, 0, 3, 0, 4, 3, 3, 0, 0], 'user_7': [0, 0, 0, 3, 0, 2, 4, 3, 4, 0],
    #                    'user_8': [5, 0, 0, 0, 5, 3, 0, 3, 0, 4], 'user_9': [1, 0, 2, 0, 4, 0, 4, 3, 0, 0]},
    #                   index=['movie_0', 'movie_1', 'movie_2', 'movie_3', 'movie_4', 'movie_5', 'movie_6', 'movie_7',
    #                          'movie_8', 'movie_9'])
    # print(df)
    # print(df.values)
    # knn = NearestNeighbors(metric='cosine', algorithm='brute')
    # knn.fit(df.values)
    # distances, indices = knn.kneighbors(df.values, n_neighbors=3)
    #
    # print(indices)
    # print(distances)
    #
    # for title in df.index:
    #
    #     index_user_likes = df.index.tolist().index(title)  # get an index for a movie
    #     sim_movies = indices[index_user_likes].tolist()  # make list for similar movies
    #     movie_distances = distances[index_user_likes].tolist()  # the list for distances of similar movies
    #     id_movie = sim_movies.index(index_user_likes)  # get the position of the movie itself in indices and distances
    #
    #     print('Similar Movies to ' + str(df.index[index_user_likes]) + ':\n')
    #
    #     sim_movies.remove(index_user_likes)  # remove the movie itself in indices
    #     movie_distances.pop(id_movie)  # remove the movie itself in distances
    #
    #     j = 1
    #
    #     for i in sim_movies:
    #         print(str(j) + ': ' + str(df.index[i]) + ', the distance with ' + str(title) + ': ' + str(
    #             movie_distances[j - 1]))
    #         j = j + 1
    #
    #     print('\n')
    #
    # def recommend_movie(title):
    #
    #     index_user_likes = df.index.tolist().index(title)  # get an index for a movie
    #     sim_movies = indices[index_user_likes].tolist()  # make list for similar movies
    #     movie_distances = distances[index_user_likes].tolist()  # the list for distances of similar movies
    #     id_movie = sim_movies.index(index_user_likes)  # get the position of the movie itself in indices and distances
    #
    #     print('Similar Movies to ' + str(df.index[index_user_likes]) + ': \n')
    #
    #     sim_movies.remove(index_user_likes)  # remove the movie itself in indices
    #     movie_distances.pop(id_movie)  # remove the movie itself in distances
    #
    #     j = 1
    #
    #     for i in sim_movies:
    #         print(str(j) + ': ' + str(df.index[i]) + ', the distance with ' + str(title) + ': ' + str(movie_distances[j - 1]))
    #         j = j + 1
    #
    # recommend_movie('movie_3')
    #
    # print(df)
    #
    # knn = NearestNeighbors(metric='cosine', algorithm='brute')
    # knn.fit(df.values)
    # distances, indices = knn.kneighbors(df.values, n_neighbors=3)
    #
    # index_for_movie = df.index.tolist().index('movie_0')  # it returns 0
    # sim_movies = indices[index_for_movie].tolist()  # make list for similar movies
    # movie_distances = distances[index_for_movie].tolist()  # the list for distances of similar movies
    # id_movie = sim_movies.index(index_for_movie)  # get the position of the movie itself in indices and distances
    # sim_movies.remove(index_for_movie)  # remove the movie itself in indices
    # movie_distances.pop(id_movie)  # remove the movie itself in distances
    #
    # print('The Nearest Movies to movie_0:', sim_movies)
    # print('The Distance from movie_0:', movie_distances)
    #
    # movie_similarity = [-x + 1 for x in movie_distances]  # inverse distance
    #
    # predicted_rating = (movie_similarity[0] * df.iloc[sim_movies[0], 7] + movie_similarity[1] * df.iloc[
    #     sim_movies[1], 7]) / sum(movie_similarity)
    # print(predicted_rating)
    #
    # # find the nearest neighbors using NearestNeighbors(n_neighbors=3)
    # number_neighbors = 3
    # knn = NearestNeighbors(metric='cosine', algorithm='brute')
    # knn.fit(df.values)
    # distances, indices = knn.kneighbors(df.values, n_neighbors=number_neighbors)
    #
    # # copy df
    # df1 = df.copy()
    #
    # # convert user_name to user_index
    # user_index = df.columns.tolist().index('user_4')
    #
    # # t: movie_title, m: the row number of t in df
    # for m, t in list(enumerate(df.index)):
    #
    #     # find movies without ratings by user_4
    #     if df.iloc[m, user_index] == 0:
    #         sim_movies = indices[m].tolist()
    #         movie_distances = distances[m].tolist()
    #
    #         # Generally, this is the case: indices[3] = [3 6 7]. The movie itself is in the first place.
    #         # In this case, we take off 3 from the list. Then, indices[3] == [6 7] to have the nearest NEIGHBORS in the list.
    #         if m in sim_movies:
    #             id_movie = sim_movies.index(m)
    #             sim_movies.remove(m)
    #             movie_distances.pop(id_movie)
    #
    #             # However, if the percentage of ratings in the dataset is very low, there are too many 0s in the dataset.
    #         # Some movies have all 0 ratings and the movies with all 0s are considered the same movies by NearestNeighbors().
    #         # Then,even the movie itself cannot be included in the indices.
    #         # For example, indices[3] = [2 4 7] is possible if movie_2, movie_3, movie_4, and movie_7 have all 0s for their ratings.
    #         # In that case, we take off the farthest movie in the list. Therefore, 7 is taken off from the list, then indices[3] == [2 4].
    #         else:
    #             sim_movies = sim_movies[:number_neighbors - 1]
    #             movie_distances = movie_distances[:number_neighbors - 1]
    #
    #             # movie_similarty = 1 - movie_distance
    #         movie_similarity = [1 - x for x in movie_distances]
    #         movie_similarity_copy = movie_similarity.copy()
    #         nominator = 0
    #
    #         # for each similar movie
    #         for s in range(0, len(movie_similarity)):
    #
    #             # check if the rating of a similar movie is zero
    #             if df.iloc[sim_movies[s], user_index] == 0:
    #
    #                 # if the rating is zero, ignore the rating and the similarity in calculating the predicted rating
    #                 if len(movie_similarity_copy) == (number_neighbors - 1):
    #                     movie_similarity_copy.pop(s)
    #
    #                 else:
    #                     movie_similarity_copy.pop(s - (len(movie_similarity) - len(movie_similarity_copy)))
    #
    #             # if the rating is not zero, use the rating and similarity in the calculation
    #             else:
    #                 nominator = nominator + movie_similarity[s] * df.iloc[sim_movies[s], user_index]
    #
    #         # check if the number of the ratings with non-zero is positive
    #         if len(movie_similarity_copy) > 0:
    #
    #             # check if the sum of the ratings of the similar movies is positive.
    #             if sum(movie_similarity_copy) > 0:
    #                 predicted_r = nominator / sum(movie_similarity_copy)
    #
    #             # Even if there are some movies for which the ratings are positive, some movies have zero similarity even though they are selected as similar movies.
    #             # in this case, the predicted rating becomes zero as well
    #             else:
    #                 predicted_r = 0
    #
    #                 # if all the ratings of the similar movies are zero, then predicted rating should be zero
    #         else:
    #             predicted_r = 0
    #
    #         # place the predicted rating into the copy of the original dataset
    #         df1.iloc[m, user_index] = predicted_r
    #
    # def recommend_movies(user, num_recommended_movies):
    #
    #     print('The list of the Movies {} Has Watched \n'.format(user))
    #
    #     for m in df[df[user] > 0][user].index.tolist():
    #         print(m)
    #
    #     print('\n')
    #
    #     recommended_movies = []
    #
    #     for m in df[df[user] == 0].index.tolist():
    #         index_df = df.index.tolist().index(m)
    #         predicted_rating = df1.iloc[index_df, df1.columns.tolist().index(user)]
    #         recommended_movies.append((m, predicted_rating))
    #
    #     sorted_rm = sorted(recommended_movies, key=lambda x: x[1], reverse=True)
    #
    #     print('The list of the Recommended Movies \n')
    #     rank = 1
    #     for recommended_movie in sorted_rm[:num_recommended_movies]:
    #         print('{}: {} - predicted rating:{}'.format(rank, recommended_movie[0], recommended_movie[1]))
    #         rank = rank + 1
    #
    # recommend_movies('user_4', 5)
    #
    # df1 = df.copy()
    #
    # def movie_recommender(user, num_neighbors, num_recommendation):
    #
    #     number_neighbors = num_neighbors
    #
    #     knn = NearestNeighbors(metric='cosine', algorithm='brute')
    #     knn.fit(df.values)
    #     distances, indices = knn.kneighbors(df.values, n_neighbors=number_neighbors)
    #
    #     user_index = df.columns.tolist().index(user)
    #
    #     for m, t in list(enumerate(df.index)):
    #         if df.iloc[m, user_index] == 0:
    #             sim_movies = indices[m].tolist()
    #             movie_distances = distances[m].tolist()
    #
    #             if m in sim_movies:
    #                 id_movie = sim_movies.index(m)
    #                 sim_movies.remove(m)
    #                 movie_distances.pop(id_movie)
    #
    #             else:
    #                 sim_movies = sim_movies[:num_neighbors - 1]
    #                 movie_distances = movie_distances[:num_neighbors - 1]
    #
    #             movie_similarity = [1 - x for x in movie_distances]
    #             movie_similarity_copy = movie_similarity.copy()
    #             nominator = 0
    #             for s in range(0, len(movie_similarity)):
    #                 if df.iloc[sim_movies[s], user_index] == 0:
    #                     if len(movie_similarity_copy) == (number_neighbors - 1):
    #                         movie_similarity_copy.pop(s)
    #
    #                     else:
    #                         movie_similarity_copy.pop(s - (len(movie_similarity) - len(movie_similarity_copy)))
    #
    #                 else:
    #                     nominator = nominator + movie_similarity[s] * df.iloc[sim_movies[s], user_index]
    #
    #             if len(movie_similarity_copy) > 0:
    #                 if sum(movie_similarity_copy) > 0:
    #                     predicted_r = nominator / sum(movie_similarity_copy)
    #
    #                 else:
    #                     predicted_r = 0
    #
    #             else:
    #                 predicted_r = 0
    #
    #             df1.iloc[m, user_index] = predicted_r
    #     recommend_movies(user, num_recommendation)
    #
    # movie_recommender('user_4', 4, 5)

    ratings = pd.read_csv('ml-latest-small/ratings.csv', usecols=['userId', 'movieId', 'rating'])
    movies = pd.read_csv('ml-latest-small/movies.csv', usecols=['movieId', 'title'])
    ratings2 = pd.merge(ratings, movies, how='inner', on='movieId')
    """test"""
    pairingresponse = pairingtable.scan()
    pairingresponse = pairingresponse["Items"]

    ratingresponse = ratingtable.scan()
    ratingresponse = ratingresponse["Items"]




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



    """test ends"""

    # df = ratings2.pivot_table(index='title', columns='userId', values='rating').fillna(0)
    # df1 = df.copy()

    def recommend_movies(user, num_recommended_movies):

        print('The list of the Movies {} Has Watched \n'.format(user))

        for m in df[df[user] > 0][user].index.tolist():
            print(m)

        print('\n')

        recommended_movies = []

        for m in df[df[user] == 0].index.tolist():
            index_df = df.index.tolist().index(m)
            predicted_rating = df1.iloc[index_df, df1.columns.tolist().index(user)]
            recommended_movies.append((m, predicted_rating))

        sorted_rm = sorted(recommended_movies, key=lambda x: x[1], reverse=True)

        print('The list of the Recommended Movies \n')
        rank = 1
        for recommended_movie in sorted_rm[:num_recommended_movies]:
            print('{}: {} - predicted rating:{}'.format(rank, recommended_movie[0], recommended_movie[1]))
            rank = rank + 1

    def movie_recommender(user, num_neighbors, num_recommendation):

        number_neighbors = num_neighbors

        knn = NearestNeighbors(metric='cosine', algorithm='brute')
        knn.fit(df.values)
        distances, indices = knn.kneighbors(df.values, n_neighbors=number_neighbors)

        user_index = df.columns.tolist().index(user)

        for m, t in list(enumerate(df.index)):
            if df.iloc[m, user_index] == 0:
                sim_movies = indices[m].tolist()
                movie_distances = distances[m].tolist()

                if m in sim_movies:
                    id_movie = sim_movies.index(m)
                    sim_movies.remove(m)
                    movie_distances.pop(id_movie)

                else:
                    sim_movies = sim_movies[:num_neighbors - 1]
                    movie_distances = movie_distances[:num_neighbors - 1]

                movie_similarity = [1 - x for x in movie_distances]
                movie_similarity_copy = movie_similarity.copy()
                nominator = 0

                for s in range(0, len(movie_similarity)):
                    if df.iloc[sim_movies[s], user_index] == 0:
                        if len(movie_similarity_copy) == (number_neighbors - 1):
                            movie_similarity_copy.pop(s)

                        else:
                            movie_similarity_copy.pop(s - (len(movie_similarity) - len(movie_similarity_copy)))

                    else:
                        nominator = nominator + movie_similarity[s] * df.iloc[sim_movies[s], user_index]

                if len(movie_similarity_copy) > 0:
                    if sum(movie_similarity_copy) > 0:
                        predicted_r = nominator / sum(movie_similarity_copy)

                    else:
                        predicted_r = 0

                else:
                    predicted_r = 0

                df1.iloc[m, user_index] = predicted_r
        recommend_movies(user, num_recommendation)

    movie_recommender("jd1", 2, 3)


    return


example_function("", "")
