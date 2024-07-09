from flask import Flask, Response, request
import Minesweeper
import json


app = Flask(__name__)

field = Minesweeper.create_field(10, 20)

@app.route('/start', methods=['GET'])
def index():
    return Response(json.dumps(field), mimetype='application/json')


@app.route('/open', methods=['GET'])
def open():
    global field
    field = Minesweeper.aufdecken(field, 1, 2)
    print(field)
    return Response(json.dumps(field), mimetype='application/json')


app.run(host='0.0.0.0', port=81)