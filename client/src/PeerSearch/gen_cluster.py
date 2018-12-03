import numpy as np
import json
import pandas as pd
import pymysql.cursors
from sklearn.metrics import mutual_info_score as mi
import kmedoids

'''
@Param
n_clusters = Number of Clusters
'''
n_clusters = 2

connection = pymysql.connect("localhost", "lechang3_root2", "qwertyuiopas", "lechang3_test")

try:
    with connection.cursor() as cursor:
        sql = "SELECT * from ResearcherRelatedArea"
        cursor.execute(sql)
        result = cursor.fetchall()
        print(result)
finally:
    connection.close()

raw = pd.DataFrame(list(result),columns = ['Researcher_id','Area_id'])

rid = list(raw.groupby('Researcher_id').groups.keys())

aid = list(raw.groupby('Researcher_id').apply(lambda x: list(x['Area_id'].values)))


'''
Mapping distinct Area_id to a index used in area_dist
'''

unique_area_idx = {}

counter = 0
for d in aid:
    for area in d:
        if area not in unique_area_idx:
            unique_area_idx[area] = counter
            counter += 1

freq = np.zeros((len(unique_area_idx),len(unique_area_idx)))

for d in aid:
    for a1 in d:
        for a2 in d:
            freq[unique_area_idx[a1],unique_area_idx[a2]] += 1

area_dist = 1-freq/np.diag(freq)

np.fill_diagonal(area_dist,0)

area_dist = (area_dist + area_dist.T) /2 * 100

def manhattan(r1,r2):
    dist = 0
    for e1 in r1:
        e1min = 100
        for e2 in r2:
            if area_dist[unique_area_idx[e1],unique_area_idx[e2]] < e1min:
                e1min = area_dist[unique_area_idx[e1],unique_area_idx[e2]]
        dist += e1min
    return dist

researcher_dist = np.ones((len(aid),len(aid)))

for x1,d1 in enumerate(aid):
    for x2,d2 in enumerate(aid):
        researcher_dist[x1,x2] = manhattan(d1,d2)

researcher_dist = np.maximum(researcher_dist,researcher_dist.T)

medoids, clusters = kmedoids.kMedoids(researcher_dist, n_clusters)

output = {}

for c in clusters.values():
    group = []
    for d in c:
        group += [rid[d]]
    for d in c:
        output[rid[d]] = list(set(group) - set([rid[d]]))

with open('data.json', 'w') as outfile:
    json.dump(output, outfile)
