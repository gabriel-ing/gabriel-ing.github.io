import pandas as pd
import datetime as dt
import math
data = pd.read_csv("Strava_runs_GI.csv")

def preprocess_data(data):
    six_months_ago = dt.datetime.now() - dt.timedelta(6*30)
    six_months_ago = pd.to_datetime(six_months_ago, utc=True)
    datacopy = data.copy()
    datacopy["start_date"] = pd.to_datetime(datacopy["start_date"], errors='coerce', utc=True)
    datacopy['day_of_year'] = datacopy['start_date'].dt.day_of_year
    datacopy["year"] = datacopy["start_date"].dt.year
    
    datacopy['distance'] = datacopy['distance']/1000
    #run_data  = datacopy[(datacopy["sport_type"]=="Run") & (datacopy["start_date"] > pd.to_datetime(six_months_ago))].copy()
    
    run_data  = datacopy[(datacopy["sport_type"]=="Run")].copy()
    run_data['pace_min'] = (run_data['moving_time']/60)/run_data['distance']
    run_data['pace_min_sec'] = run_data['pace_min'].apply(lambda x: math.floor(x)+0.6*(x%1))
    run_data = run_data.fillna(value=0)
    run_data['start_date'] = run_data['start_date'].dt.strftime('%d-%m-%Y') 
    run_dict = run_data.to_dict(orient='records')
    return run_data

run_data = preprocess_data(data)
run_data.to_csv("out.csv")