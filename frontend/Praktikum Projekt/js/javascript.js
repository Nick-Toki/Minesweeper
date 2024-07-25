let fade_state = false;
console.log("Seite geladen, fade_state:", fade_state)

function rulesOverlay() {
    let div = document.getElementById("gameRules");

    if (fade_state == false) {
        div.style.display = "flex"; // Div sichtbar machen, bevor die Animation startet
        div.classList.remove("fade-out");
        div.classList.add("fade-in");

        div.addEventListener("animationend", function handleAnimationEnd() {
            fade_state = true;
            div.classList.add("show-rules");
            div.removeEventListener("animationend", handleAnimationEnd);
            console.log("Fade-in completed, fade_state:", fade_state);
        });
    } else {
        div.classList.remove("fade-in");
        div.classList.add("fade-out");

        div.addEventListener("animationend", function handleAnimationEnd() {
            fade_state = false;
            div.style.display = "none"; // Div ausblenden nach der Animation
            div.classList.remove("show-rules");
            div.removeEventListener("animationend", handleAnimationEnd);
            console.log("Fade-out completed, fade_state:", fade_state);
        });
    }
}

function dropdownMenu() {
    document.getElementById("gameDifficulties").classList.toggle("show-diff");
}

  // Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show-diff')) {
                openDropdown.classList.remove('show-diff');
            }
        }
    }

    if (!event.target.matches('.rulebtn')) {
        let fade = document.getElementsByClassName("rules-overlay");
        for (let i = 0; i < fade.length; i++) {
            let openRules = fade[i];
            let div = document.getElementById("gameRules");

            if (openRules.classList.contains('show-rules')) {
                div.classList.remove("fade-in");
                div.classList.add("fade-out");

                div.addEventListener("animationend", function handleAnimationEnd() {
                    fade_state = false;
                    div.style.display = "none"; // Div ausblenden nach der Animation
                    openRules.classList.remove('show-rules');
                    div.removeEventListener("animationend", handleAnimationEnd);
                    console.log("Fade-out completed, fade_state:", fade_state);
                });
            }
        }
    }
}

function getFieldEasy(){ // Diese Funktion dient dem Aufruf des kleinen 9x9 Spielfelds.
    const div = document.getElementById("gameField"); // Hier wird die Seite nach dem Element mit der ID "gameField" erfasst und als "div" abgekürzt.
    div.classList.add("gameFieldEasy"); // Hier wird dem Spielfeld die Klasse "gameFieldEasy" zugeteilt. Die anderen Klassen Medium und Hard werden entfernt, falls sie vorhanden sein sollten.
    div.classList.remove("gameFieldMedium");
    div.classList.remove("gameFieldHard");

    const field = document.getElementById("gameField");
    field.innerHTML = '';

    $.ajax({ // ajax erlaubt Veränderungen der Webseite ohne dass das Neuladen erzwungen wird.
        url: 'http://localhost:50100/my-app/start?difficulty=easy', // die angegeben URL ist ein path für die Flask API
        method: 'GET', // Die GET Methode erlaubt das bloße Erhalten von Daten. In diesem Fall wird eine json Datei angefragt.
        dataType: 'json', // Der Dateityp wird nochmal angegeben.
        success: function(data) { // Nach erfolgreichem Erhalten der Daten wird folgendes gemacht ...
            console.log(data); // Die Daten in der Konsole ausgeben
            generateField(data["field"]); // Das Spielfeld mithilfe der generateField Funktion und den empfangenen Daten generieren. Da die json Datei zwei Informationen (Feld + Status) erhält, müssen in den eckigen Klammern die benötigten Daten zur Feldgenerierung abgerufen werden.
        },
        error: function(jqXHR, textStatus, errorThrown) { // Nach fehlgeschlagenem Erhalt, wird folgendes ausgeführt ...
            console.error('Fehler beim Abrufen der Daten: ' + textStatus, errorThrown);
            console.error('Status Code:', jqXHR.status);
            console.error('Antworttext:', jqXHR.responseText);
        }
    });
}

function getFieldMedium(){ // Diese Funktion funktioniert identisch wie die getFieldEasy Funktion, nur dass diese Funktion der Erstellung eines Mittelgroßen Feldes dient.
    const div = document.getElementById("gameField");
    div.classList.add("gameFieldMedium");
    div.classList.remove("gameFieldEasy");
    div.classList.remove("gameFieldHard");

    const field = document.getElementById("gameField");
    field.innerHTML = '';

    $.ajax({
        url: 'http://localhost:50100/my-app/start?difficulty=medium',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            generateField(data["field"]);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Fehler beim Abrufen der Daten: ' + textStatus, errorThrown);
            console.error('Status Code:', jqXHR.status);
            console.error('Antworttext:', jqXHR.responseText);
        }
    });
}

function getFieldHard(){ // Diese Funktion funktioniert identisch wie die getFieldEasy Funktion, nur dass diese Funktion der Erstellung eines Großen Feldes dient.
    const div = document.getElementById("gameField");
    div.classList.add("gameFieldHard");
    div.classList.remove("gameFieldEasy")
    div.classList.remove("gameFieldMedium")

    const field = document.getElementById("gameField");
    field.innerHTML = '';

    $.ajax({
        url: 'http://localhost:50100/my-app/start?difficulty=hard',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            generateField(data["field"]);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Fehler beim Abrufen der Daten: ' + textStatus, errorThrown);
            console.error('Status Code:', jqXHR.status);
            console.error('Antworttext:', jqXHR.responseText);
        }
    });
}

function leftClickOpen () { // Diese Funktion dient dem Aufdecken von Kacheln.
    const lcElements = document.querySelectorAll(".tile"); // Die Variable lcElements wählt alle Elemente mit der Klasse ".tile" aus.

    lcElements.forEach(function(lc) { // Hier wird für jedes (forEach) Element separat eine Funktion definiert.

        lc.addEventListener("click", function() { // EvenListener registriert den Linksklick der Mauszeiger auf der jeweiligen Kachel.

            let state = this.dataset.currentState // Die Variable "state" gibt dem Element ein dataset Status. Dieser erlaubt die Sperrung gewisser Funktionen, die einen bestimmten Status benötigen um zu funktionieren.

            if (state === "closed") { // Wenn der Status der Elemente "closed" ist:

                const string = this.attributes["name"].value // Die Variable "string" erfasst den Namen der angeklickten Kachel.
                const words = string.split('|'); // Die Variable "words" teilt den String am Zeichen ' | ' auf. Da der Name immer die Koordinaten der Kachel enthält, wird somit der string zu einem integer aufgeteilt und stellt zwei Koordinaten zur Verfügung.

                let open_x = words[0] // Die X-Koordinate ist die Erste Hälfte des aufgeteilten strings. Da immer bei 0 angefangen wird zu zählen, steht '0' für die eigentliche Erste Hälfte, und '1' für die Zweite.
                let open_y = words[1] // Die Y-Koordinate ist die Zweite Hälfte des aufgeteilten strings.

                $.ajax({
                    url: 'http://localhost:50100/my-app/open',
                    method: 'GET',
                    data:{ open_x: open_x, open_y: open_y}, // Hier werden Daten versendet und nicht mehr erhalten. Die Variable "open_x" gibt den enthaltenen Wert an die Flask API unter dem Variablennamen "open_x" weiter. Bei "open_y" passiert dasselbe.
                    dataType: 'json',
                    success: function(data) {
                        console.log(data["field"]); // Die Felddaten werden erneut in der Konsole geloggt.
                        generateField(data["field"]); // Das Feld wird anhand der Daten generiert.
                        checkStatus(data["status"]); // Der Spielstatus wird ebenfalls anhand der Daten mit dem Stempel "status" abgerufen.
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error('Fehler beim Abrufen der Daten: ' + textStatus, errorThrown);
                        console.error('Status Code:', jqXHR.status);
                        console.error('Antworttext:', jqXHR.responseText);
                    }
                });
                console.log(words[0]);
                console.log(words[1]);
            }
        });
    });
}

function rightClickFlag () { // Diese Funktion erlaubt das Platzieren von Flaggen auf dem Spielfeld und die Absicherung der Minen.
    const rcElements = document.querySelectorAll(".tile");

    rcElements.forEach(function(rc) {

        rc.addEventListener("contextmenu", function() { // "contextmenu" achtet darauf, ob ein Element mit einem Rechtsklick geklickt worden ist.

            let state = this.dataset.currentState // Hier wird jedem Element einzeln wieder sein Status erfasst.

            if (state === "closed" || state === "flagged") { // Nur wenn der status der Elemente "closed" ODER "flagged" lautet, wird der nächste Codeblock ausgeführt.

                // In diesem Codeblock wird wie bei der leftClickOpen Funktion, der Name der Kacheln aufgeteilt und als Koordinaten an das backend gesendet. Hier wird jedoch eine andere Art Koordinaten versendet, und zwar flag_x/flag_y anstelle von open_x/open_y

                const string = this.attributes["name"].value
                const words = string.split('|');

                let flag_x = words[0]
                let flag_y = words[1]

                $.ajax({
                    url: 'http://localhost:50100/my-app/flag',
                    method: 'GET',
                    data:{ flag_x: flag_x, flag_y: flag_y},
                    success: function(data) {
                        console.log(data["field"]);
                        generateField(data["field"]);
                        checkStatus(data["status"]);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error('Fehler beim Abrufen der Daten: ' + textStatus, errorThrown);
                        console.error('Status Code:', jqXHR.status);
                        console.error('Antworttext:', jqXHR.responseText);
                    }
                });
                console.log(words[0]);
                console.log(words[1]);
            }
        });
    });
}

let SpielStatus = (["status"]); // Hier wird der aktuelle Spielstatus definiert und innerhalb der Variable zur Verfügung gestellt.

function checkStatus(SpielStatus) {
    const tiles = document.getElementsByClassName("tile");

    if (SpielStatus === "LOST") { // Wenn der Spielstatus "LOST" ist, also wenn das Spiel verloren ist, wird durch jedes Element auf dem Feld iteriert und dem Status "lost" zugewiesen. Durch diese Status Veränderung werden die Funktionen zum Öffnen weiterer Kacheln und dem Platzieren von Flaggen gesperrt, da sie einen bestimmten Status benötigen um zu funktionieren.
        for (let x = 0; x < tiles.length; x++) { // Hier beginnt der Iteration.
            tiles[x].dataset.currentState = "lost";
        }
        console.log(SpielStatus);
        setTimeout(function(){ // setTimeout ermöglicht die verzögerte Ausführung des folgenden Codeblocks. Ohne diese Funktion würde die Meldung erscheinen und die Aktualisierung des Feldes solange verhindern, bis auf "Okay" geklickt wurde. Jetzt wird zuerst das Feld aufgedeckt und ANSCHLIEßEND wird die Meldung angezeigt.
            alert("Du hast verloren!")
        }, 50); // Die Zeit wird in Millisekunden angegeben. 50 Millisekunden sind 0.05 Sekunden.
    }

    else if (SpielStatus === "CONTINUE") { // Falls das Spiel noch am Laufen ist, wird einfach nur der aktuelle Spielstatus in der Konsole nochmal wiedergegeben.
        console.log(SpielStatus);
    }

    else if (SpielStatus === "WON") { // Wie bei der "LOST" Bedingung wird auch hier im Falle eines Sieges ein bestimmter Code ausgeführt und der Status aller Elemente verändert.
        for (let x = 0; x < tiles.length; x++) {
            tiles[x].dataset.currentState = "won";
        }
        console.log(SpielStatus);
        setTimeout(function(){
            alert("Herzlichen Glückwunsch, du hast gewonnen!")
        }, 50);
    }
}

function generateField(position) {
    // const startTime = Date.now();
    const field = document.getElementById("gameField");
    field.innerHTML = ''; // Das Spielfeld wird nach jedem Aufruf geleert und das aktualisierte Spielfeld aufgerufen. Ohne diese Zeile würde es immer mehr Spielfelder untereinander generieren.

    for (let x = 0; x < position.length; x++) {                     // Hier wird durch jede Reihe iteriert und pro Reihe eine div Box mit dem Namen "row" hinzugefügt.
        const create_row = document.createElement("div");
        create_row.classList.add("row");

        for (let y = 0; y < position[x].length; y++) {              // Hier werden für jede Reihe die passende Anzahl an Kacheln erstellt.
            const create_tile = document.createElement("div");
            create_tile.classList.add("tile");
            create_tile.setAttribute("name", x + "|" + y);
            create_tile.dataset.currentState = "closed";

            if (SpielStatus === "CONTINUE") { // Wenn das Spiel läuft, wird jeder Kachel de
                create_tile.dataset.currentState = "closed";
            }

            let img = document.createElement("img");
            img.setAttribute("draggable", "false");

            let value = position[x][y]["Value"];
            let offen = position[x][y]["Offen"];
            let flagge = position[x][y]["Flagge"];

            if (offen === false && flagge === false) {
                img.src = "./img/tile.png";
            }

            else if (offen === false && flagge === true) {
                img.src = "./img/flagtile.png";
                create_tile.dataset.currentState = "flagged";
            }

            else if (offen === true && value === -1) {
                img.src = "./img/tilebomb.png";
                create_tile.dataset.currentState = "opened";
            }

            else if (offen === true && value === 0) {
                img.src = "./img/sweepertile0.png";
                create_tile.dataset.currentState = "opened";
            }

            else if (offen === true && value > 0) {
                img.src = `./img/sweepertile${value}.png`;
                create_tile.dataset.currentState = "opened";
            }

            create_tile.appendChild(img);
            field.appendChild(create_row);
            create_row.appendChild(create_tile);
        }
    }

    leftClickOpen();
    rightClickFlag();
    checkStatus(SpielStatus);  // Hier wird der Status überprüft
    // const endTime = Date.now();
    // console.log(endTime - startTime);
}