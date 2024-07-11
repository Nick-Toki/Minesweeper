from flask import Flask, Response, request
from flask_cors import CORS
import Minesweeper
import json

app = Flask(__name__)
CORS(app)

field = Minesweeper.create_field(10, 20)

@app.route('/start', methods=['GET'])
def index():
    global field
    field = Minesweeper.create_field(10, 20)
    return Response(json.dumps(field), mimetype='application/json')


@app.route('/open', methods=['GET'])
def open():
    x = int(request.args.get('x')) + 1
    y = int(request.args.get('y')) + 1
    global field
    field = Minesweeper.aufdecken(field, x, y)
    print(field)
    return Response(json.dumps(field), mimetype='application/json')

@app.route('/flag', methods=['GET'])
def flag():
    q = int(request.args.get('q')) + 1
    k = int(request.args.get('k')) + 1
    global field
    field = Minesweeper.Flag(field, q, k)
    print(field)
    return Response(json.dumps(field), mimetype='application/json')

app.run(host='0.0.0.0', port=81)