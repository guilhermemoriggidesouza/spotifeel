import flask

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/python', methods=['GET'])
def home():
    return "in python"

app.run()
