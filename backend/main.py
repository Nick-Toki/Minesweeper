from flask import Flask, Response, request
import Minesweeper
import json


app = Flask(__name__)

field = Minesweeper.create_field(10, 20)

@app.route('/start', methods=['GET'])
def index():
    global field
    field = Minesweeper.create_field(10, 20)
<<<<<<< HEAD
    return Response(json.dumps(field), mimetype='application/json')
=======
    status = True
    
    res = {
    "field" : field,
    "status": status
    }
    
    return Response(json.dumps(res), mimetype='application/json')
>>>>>>> 5b55cb1918fe9f0ceef99b250605fecd9f5679cb


@app.route('/open', methods=['GET'])
def open():
    x = int(request.args.get('x')) + 1
    y = int(request.args.get('y')) + 1
    global field
<<<<<<< HEAD
    field = Minesweeper.aufdecken(field, x, y)
=======
    field = Minesweeper.aufdecken(field, 1, 1)
    print(field)
    return Response(json.dumps(field), mimetype='application/json')


app.run(host='0.0.0.0', port=81)



@app.route('/flag', methods=['GET'])
def flag():
    
    global field
    field = Minesweeper.Flag(field, 1, 2)
>>>>>>> 5b55cb1918fe9f0ceef99b250605fecd9f5679cb
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