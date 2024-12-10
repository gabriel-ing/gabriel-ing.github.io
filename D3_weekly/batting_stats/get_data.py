import pandas as pd
import requests

url = "https://stats.espncricinfo.com/ci/engine/stats/index.html?class=1;filter=advanced;orderby=runs;qualmin1=1000;qualval1=runs;size=200;template=results;type=batting;page="
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
page_range = range(1, 4)

data_list = []

for n in page_range:
    response = requests.get(url+str(n), headers=headers)
    table_list =  pd.read_html(response.text)
    data_list.append(table_list[2])

df = pd.concat(data_list, ignore_index=True)

df["HS"] = df["HS"].astype(str).str.replace("*", "", regex=False)


df["Year_of_debut"]=df["Span"].apply(lambda x: x.split('-')[0])
df["Last_played"] = df["Span"].apply(lambda x: x.split('-')[1])

df["Country"] = df["Player"].apply(lambda x: x.split("(")[-1])
df["Player"] = df["Player"].apply(lambda x: x.split("(")[:-1])

df["Country"] = df["Country"].str.replace(")", "", regex=False)
df["Country"] = df["Country"].str.replace("ICC/","")
df["Country"] = df["Country"].str.replace("/ICC","")


df.to_csv("All_time_batting_stats_over_1000_runs.csv")
