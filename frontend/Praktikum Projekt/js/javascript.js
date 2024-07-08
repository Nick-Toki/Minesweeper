$(document).ready(function() {
    $('#btn').click(function() {
        $.ajax({
            url: 'positions.json',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                generateField(data.positions);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Fehler: ' + textStatus, errorThrown);
            }
        });
    });
});

function rightClickFlag () {
    var rcfElements = document.querySelectorAll(".rcFlag");

    rcfElements.forEach(function(rcf) {

        rcf.dataset.currentState = "default";

        rcf.addEventListener("contextmenu", function() {
            
            var currentState = this.dataset.currentState;

            if (currentState === "default" && this.src.includes("tile.png")) {
                this.src = "./img/flagtile.png";
                this.dataset.currentState = "flag";
            }

            else if (currentState === "flag" && this.src.includes("flagtile.png")) {
                this.src = "./img/tile.png";
                this.dataset.currentState = "default";
            }
        });
    });
}

let exPosition = [
    [{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{}],
];

function randBool(threshold) {
    return Math.random() >= threshold;
}

function randValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < exPosition.length; i++) {
    for (let j = 0; j < exPosition[i].length; j++) {
        exPosition[i][j]["Mine"] = randBool(0.95);
        exPosition[i][j]["Offen"] = randBool(0.1);
        exPosition[i][j]["Value"] = randValue(1, 8);
    }
}

function generateField(position) {
    let field = document.getElementById("gameField");
    field.innerHTML = '';

    for (let i = 0; i < position.length; i++) {
        for (let j = 0; j < position[i].length; j++) {
            let createDiv = document.createElement("div");
            createDiv.classList.add("tile");

            var img = document.createElement("img");
            img.classList.add("rcFlag");

            if (position[i][j]["Mine"] === true) {
                img.src = "./img/tilebomb.png";
            } 
            
            else if (position[i][j]["Offen"] === true) {
                img.src = "./img/tileempty.png";
            } 
            
            else if (position[i][j]["Offen"] === false) {
                img.src = "./img/tile.png";
            }

            else {
                img.src = `./img/sweepertile${position[i][j]["tiles"]}.png`;
            }

            createDiv.appendChild(img);
            field.appendChild(createDiv);
        }
    }

    rightClickFlag();
}

generateField(exPosition)
