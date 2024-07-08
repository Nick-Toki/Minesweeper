// Bestimmt die Feldgrößte. Aktuell muss noch in der .css Datei die width, height und
// grid-template-columns manuelle eingestellt werden.

$(document).ready(function() {
    $("#btn").click(function() {
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://blockchain.info/latestblock",
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Fehler: " + textStatus, errorThrown);
            }
        });
    });
});

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

// console.log(exPosition[0][1]["mine"])

function randBool(threshold) {
    return Math.random() >= threshold;
}

function randValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < exPosition.length; i++) {
    for (let j = 0; j < exPosition[i].length; j++) {
        exPosition[i][j]["mine"] = randBool(0.95);
        exPosition[i][j]["offen"] = randBool(0.1);
        exPosition[i][j]["tiles"] = randValue(1, 8);
    }
}

// Funktion zum platzieren der Flagge nach einem Rechtsklick

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

// Funktion zur Generierung des Felds

function generateField(position) {
    let field = document.getElementById("gameField");
   
    for (let i = 0; i < exPosition.length; i++) {

        for (let j = 0; j < exPosition[i].length; j++) {
        
            let createDiv = document.createElement("div");
            createDiv.classList.add("tile");

            var img = document.createElement("img");
            img.classList.add("rcFlag");

            if (position[i][j]["mine"] === true) {
            img.src = "./img/tilebomb.png";
            }
            
            else if (position[i][j]["offen"] === true) {
                img.src = "./img/tileempty.png";
            }

            else if (position[i][j]["tiles"] === 1) {
                img.src = "./img/sweepertile1.png";
            }

            else if (position[i][j]["tiles"] === 2) {
                img.src = "./img/sweepertile2.png";
            }

            else if (position[i][j]["tiles"] === 3) {
                img.src = "./img/sweepertile3.png";
            }

            else if (position[i][j]["tiles"] === 4) {
                img.src = "./img/sweepertile4.png";
            }

            else if (position[i][j]["tiles"] === 5) {
                img.src = "./img/sweepertile5.png";
            }

            else if (position[i][j]["tiles"] === 6) {
                img.src = "./img/sweepertile6.png";
            }

            else if (position[i][j]["tiles"] === 7) {
                img.src = "./img/sweepertile7.png";
            }

            else if (position[i][j]["tiles"] === 8) {
                img.src = "./img/sweepertile8.png";
            }

            else {
                img.src = "./img/tile.png";
            }

            createDiv.appendChild(img);
            field.appendChild(createDiv);

        }
    }
    
    rightClickFlag();
}

generateField(exPosition)



