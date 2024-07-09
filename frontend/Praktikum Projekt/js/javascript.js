// value -1: Mine
// value 0: Leeres Feld
// value 1-8: Feld Nr. 1-8

// $(document).ready(function() {
//     $('#btn').click(function() {
//         $.ajax({
//             url: 'http://localhost:81/',
//             method: 'GET',
//             dataType: 'json',
//             success: function(data) {
//                 generateField(data);
//                 console.log(data)
//             },
//             error: function(jqXHR, textStatus, errorThrown) {
//                 console.error('Fehler beim Abrufen der Daten: ' + textStatus, errorThrown);
//                 console.error('Status Code:', jqXHR.status);
//                 console.error('Antworttext:', jqXHR.responseText);
//             }
//         });
//     });
// });
 
function getField(){
    $.ajax({
        url: 'http://localhost:81/',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            generateField(data);
            console.log(data)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Fehler beim Abrufen der Daten: ' + textStatus, errorThrown);
            console.error('Status Code:', jqXHR.status);
            console.error('Antworttext:', jqXHR.responseText);
        }
    });
}

function rightClickFlag () {
    var rcfElements = document.querySelectorAll(".rcFlag");

    rcfElements.forEach(function(rcf) {

        rcf.dataset.currentState = "default";

        rcf.addEventListener("contextmenu", function() {
            
            var currentState = this.dataset.currentState;

            if (currentState === "default" && this.src.includes("tile.png")) {
                this.src = "./img/flagtile.png";
                this.dataset.currentState = "flag";
                this.position[i][j]["Flagge"] === true;
            }

            else if (currentState === "flag" && this.src.includes("flagtile.png")) {
                this.src = "./img/tile.png";
                this.dataset.currentState = "default";
                this.position[i][j]["Flagge"] === false;
            }
        });
    });
}

// let exPosition = [
//     [{},{},{},{},{},{},{},{},{},{}],
//     [{},{},{},{},{},{},{},{},{},{}],
//     [{},{},{},{},{},{},{},{},{},{}],
//     [{},{},{},{},{},{},{},{},{},{}],
//     [{},{},{},{},{},{},{},{},{},{}],
//     [{},{},{},{},{},{},{},{},{},{}],
//     [{},{},{},{},{},{},{},{},{},{}],
//     [{},{},{},{},{},{},{},{},{},{}],
//     [{},{},{},{},{},{},{},{},{},{}],
//     [{},{},{},{},{},{},{},{},{},{}],
// ];

// function randBool(threshold) {
//     return Math.random() >= threshold;
// }

// function randValue(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// for (let i = 0; i < exPosition.length; i++) {
//     for (let j = 0; j < exPosition[i].length; j++) {
//         exPosition[i][j]["Mine"] = randBool(0.95);
//         exPosition[i][j]["Offen"] = randBool(0.1);
//         exPosition[i][j]["Value"] = randValue(1, 8);
//     }
// }

function generateField(position) {
    let field = document.getElementById("gameField");
    field.innerHTML = '';

    for (let i = 0; i < position.length; i++) {
        for (let j = 0; j < position[i].length; j++) {
            let createDiv = document.createElement("div");
            createDiv.classList.add("tile");

            var img = document.createElement("img");
            img.classList.add("rcFlag");

            if (position[i][j]["Mine"] === true && (position[i][j]["Value"] === -1)) {
                img.src = "./img/tilebomb.png";
            } 
            
            else if (position[i][j]["Offen"] === true && position[i][j]["Value"] !== 0) {
                img.src = `./img/sweepertile${position[i][j]["Value"]}.png`;
            } 

            else if (position[i][j]["Offen"] === true && position[i][j]["Value"] === 0) {
                img.src = "./img/tileempty.png";
            }
            
            else if (position[i][j]["Offen"] === false) {
                img.src = "./img/tile.png";
            }

            else {
                
            }

            createDiv.appendChild(img);
            field.appendChild(createDiv);
        }
    }

    rightClickFlag();
}

generateField(exPosition)

