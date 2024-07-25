from flask import Flask, Response, request
from flask_cors import CORS
from waitress import serve
import Minesweeper
import orjson as json
import time

app = Flask(__name__)
CORS(app)

status = None
field = None
rows = None
columns = None
probability = None
first_open = None

@app.route('/start', methods=['GET'])
def index():
    start_time = time.time()
    global status
    global field
    global rows
    global columns
    global probability
    global first_open
    status = "CONTINUE"
    first_open = True
    
    difficulty = request.args.get('difficulty')
    if difficulty == "easy":
        rows = 9
        columns = 9
        probability = 12.3
        field = Minesweeper.create_field(rows, columns, probability)
    elif difficulty == "medium":
        rows = 16
        columns = 16
        probability = 15.6
        field = Minesweeper.create_field(rows, columns, probability)
    elif difficulty == "hard":
        rows = 16
        columns = 30
        probability = 20.6
        field = Minesweeper.create_field(rows, columns, probability)
    else:
        return Response(json.dumps({"error": "Invalid difficulty level"}), mimetype='application/json', status=400)

    data = {
        "field": field,
        "status": status
    }
    end_time = time.time()
    print(end_time - start_time)
    return Response(json.dumps(data), mimetype='application/json')

@app.route('/open', methods=['GET'])
def open():
    start_time = time.time()
    open_x = int(request.args.get('open_x')) + 1
    open_y = int(request.args.get('open_y')) + 1

    global first_open
    global status
    global field

    if field[open_x-1][open_y-1]["Mine"] and first_open:
        print("----------------------------------------------------")
        field = Minesweeper.create_safe_field(open_x, open_y, rows, columns, probability)
    first_open = False
    
    field = Minesweeper.aufdecken(field, open_x, open_y)
    status = Minesweeper.get_game_status(field, open_x, open_y) 

    if status == "LOST":
        print("lost")
        field = Minesweeper.open_all_mines(field)

    elif status == "WON":
        print("won")

    elif status == "CONTINUE":
        print("continue")

    data = {
        "field": field,
        "status": status
    }
    end_time = time.time()
    print(end_time - start_time)
    return Response(json.dumps(data), mimetype='application/json')

@app.route('/flag', methods=['GET'])
def flag():
    start_time = time.time()
    flag_x = int(request.args.get('flag_x')) + 1
    flag_y = int(request.args.get('flag_y')) + 1
    
    global status
    global field

    field = Minesweeper.place_flag(field, flag_x, flag_y)
    status = Minesweeper.get_game_status(field, flag_x, flag_y)

    data = {
        "field": field,
        "status": status
    }

    end_time = time.time()
    print(end_time - start_time)
    return Response(json.dumps(data), mimetype='application/json')

# app.run(host='0.0.0.0', port=81, debug=False)

mode = "dev"

if __name__ == '__main__':
   serve(app, host='0.0.0.0', port=50100, threads=2, url_prefix="/my-app")