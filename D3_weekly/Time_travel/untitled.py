import Flask

app=Flask(__name__)

CORS(app)


@app.route("/data")
def return_data():
	df = pd.read_csv("Age_group_results.csv")
	return df.to_csv()


