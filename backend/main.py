from flask import Flask, Response, request
import Minesweeper
import json


app = Flask(__name__)

@app.route('/')
def index():
    field = Minesweeper.create_field(2, 1, 10, 20, ["1", "2", "3" , "0"])
    return Response(json.dumps(field), mimetype='application/json')


@app.route('/update')
def update():
    var = request.args.get("var")

    return var


app.run(host='0.0.0.0', port=81)


app = Flask(__name__)

@app.route('/')
def index():
    field = Minesweeper.aufdecken(field)
    
    return Response(json.dumps(field), mimetype='application/json')


@app.route('/update')
def update():
    var = request.args.get("var")

    return var


app.run(host='0.0.0.0', port=81)