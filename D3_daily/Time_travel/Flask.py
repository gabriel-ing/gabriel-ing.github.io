from flask import Flask
from flask_cors import CORS
import pandas as pd


app=Flask(__name__)
CORS(app, resources={r"/data": {"origins": "*"}})
#CORS(app)


@app.route("/data")
def return_data():
	df = pd.read_csv("Age_group_results.csv")
	return df.to_csv(index=False)


if __name__ == '__main__':
    app.run(debug=False)