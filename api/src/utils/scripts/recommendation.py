import numpy as np
import scipy as sp
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import sys
import json

companyId = sys.argv[1]
page = int(sys.argv[2])
offset = int(sys.argv[3])
start = ((page - 1) * offset) + 1
end = start + offset


def recommendation(companyId):
    ratings_ = pd.read_csv("src/assets/data/ratings.csv")
    df_companies = ratings_.loc[
        (ratings_["companyId"] == companyId)
        & (ratings_["rating"] == ratings_["rating"].max())
    ] # filter df by companyId get the register with the max rating value
    if df_companies.size == 0:
        employeeId = ratings_['employeeId'][0]
    else :
        employeeId = df_companies.head(1).iloc[0]["employeeId"] # get one register and obtain the id
    rated_movies_ = ratings_.copy()
    df_inDuplica = rated_movies_.drop_duplicates(
        subset=["companyId", "employeeId"], keep="last"
    )
    rating_pivot = df_inDuplica.pivot_table(
        index="companyId", columns="employeeId", values="rating", aggfunc=np.mean
    )  # mean
    rating_pivot.fillna(0, inplace=True)  # fill NA
    sparse_ratings = sp.sparse.csr_matrix(
        rating_pivot.values
    )  # Compressed Sparse Row matrix
    item_similarity = cosine_similarity(sparse_ratings.T)  # items similarity
    item_similarity_df = pd.DataFrame(
        item_similarity, index=rating_pivot.columns, columns=rating_pivot.columns
    )
    # Get EmployeesIds
    employeesIds = []
    for employee in item_similarity_df.sort_values(
        by=employeeId, ascending=False
    ).index[start:end]:
        employeesIds.append(employee)
    print(json.dumps(employeesIds))
    # Get Average rating for employees Ids above
    employeesRatingAverage = []
    for employeeId in employeesIds:
        average = df_inDuplica.loc[ratings_["employeeId"] == employeeId]['rating'].mean()
        employeesRatingAverage.append(average)
    print(employeesRatingAverage)

recommendation(companyId)
