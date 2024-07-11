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
        url: 'http://localhost:81/start',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            generateField(data);
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Fehler beim Abrufen der Daten: ' + textStatus, errorThrown);
            console.error('Status Code:', jqXHR.status);
            console.error('Antworttext:', jqXHR.responseText);
        }
    });
}

function placeFlag(){
    let qcord = 1
    let kcord = 1

    $.ajax({
        url: 'http://localhost:81/flag',
        method: 'GET',
        data:{ q: qcord, k: kcord},
        success: function(data) {
            generateField(data);
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Fehler beim Abrufen der Daten: ' + textStatus, errorThrown);
            console.error('Status Code:', jqXHR.status);
            console.error('Antworttext:', jqXHR.responseText);
        }
    });
};

function tileClicked () {
    var tcElements = document.querySelectorAll(".tile");

    tcElements.forEach(function(tc) {

        tc.addEventListener("click", function() {
            const string = this.attributes["name"].value
            const words = string.split('|');

            let xcord = words[0]
            let ycord = words[1]
        
            $.ajax({
                url: 'http://localhost:81/open',
                method: 'GET',
                data:{ x: xcord, y: ycord},
                success: function(data) {
                    generateField(data);
                    console.log(data);
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Fehler beim Abrufen der Daten: ' + textStatus, errorThrown);
                    console.error('Status Code:', jqXHR.status);
                    console.error('Antworttext:', jqXHR.responseText);
                }
            });

            console.log(words[0]);
            console.log(words[1]);

        });
    });
}

function rightClickFlag () {
    var rcfElements = document.querySelectorAll(".tile");

    rcfElements.forEach(function(rcf) {

        rcf.addEventListener("contextmenu", function() {
            const string = this.attributes["name"].value
            const words = string.split('|');

            let qcord = words[0]
            let kcord = words[1]
        
            $.ajax({
                url: 'http://localhost:81/flag',
                method: 'GET',
                data:{ q: qcord, k: kcord},
                success: function(data) {
                    generateField(data);
                    console.log(data);
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Fehler beim Abrufen der Daten: ' + textStatus, errorThrown);
                    console.error('Status Code:', jqXHR.status);
                    console.error('Antworttext:', jqXHR.responseText);
                }
            });

            console.log(words[0]);
            console.log(words[1]);
        });
    });
}

function generateField(position) {
    let field = document.getElementById("gameField"); 
    field.innerHTML = '';

    for (let i = 0; i < position.length; i++) {
        for (let j = 0; j < position[i].length; j++) {
            let createDiv = document.createElement("div");
            createDiv.classList.add("tile");
            createDiv.setAttribute("name", i + "|" + j)

            var img = document.createElement("img");
            var value = position[i][j]["Value"]
            var offen = position[i][j]["Offen"]
            var flagge = position[i][j]["Flagge"]

            if (offen === false && flagge === false) {
                img.src = "./img/tile.png";
            }

            else if (offen === false && flagge === true) {
                img.src = "./img/flagtile.png";
            }

            else if (offen === true && value === -1) {
                img.src = "./img/tilebomb.png";
            }
            
            else if (offen === true && value === 0) {
                img.src = "./img/sweepertile0.png";
            }

            else if (offen === true && value > 0) {
                img.src = `./img/sweepertile${value}.png`;
            }

            createDiv.appendChild(img);
            field.appendChild(createDiv);
        }
    }
    tileClicked();
    rightClickFlag();
}

    


// generateField(exPosition)
