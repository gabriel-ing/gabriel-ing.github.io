from flask import Flask
from flask_cors import CORS
import pandas as pd
import datetime as dt
import math

app=Flask(__name__)
CORS(app, resources={r"/data": {"origins": "*"}})
#CORS(app)

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
    run_data['pace_min_sec'] = run_data['pace_min'].apply(lambda x: f"{math.floor(x)}:{int((x%1)*60):02d}")
    return run_data


@app.route("/data")
def return_data():
    df = pd.read_csv("Strava_runs_GI.csv")
    data = preprocess_data(df)
    data.to_csv("Strava_runs_processed.csv", index=False)
    return data.to_csv(index=False)


if __name__ == '__main__':
    app.run(debug=False)