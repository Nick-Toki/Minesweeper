import random  # Importiert das Modul für zufällige Zahlengenerierung
import pprint  # Importiert das Modul für "pretty printing" von Datenstrukturen

# -------------------------------------------------------------------------------------
# gamefield = Das gesamte Spielfeld [[{...}{...}{...}{...}{...}]]


# field_x = Die Reihe vom Feld
# field_y = Die Zeile vom Feld

# open_x = Die Reihe die geöffnet wird/wurde
# open_y = Die Zeile die geöffnet wird/wurde

# flag_x = Die Reihe in der eine Flagge platziert wird/wurde
# flag_y = Die Zeile in der eine Flagge platziert wird/wurde





# -------------------------------------------------------------------------------------






# Funktion, die die Anzahl der benachbarten Minen zählt
def check_number(gamefield, first, second):
    check_minen = 0  # Zählt die Anzahl der benachbarten Minen
    for field_x in range(first-1, first+2):
        for field_y in range(second-1, second+2):
            if not (field_x < 0 or field_x >= len(gamefield)):  # Überprüft, ob field_x innerhalb der Feldgrenzen liegt
                if not (field_y < 0 or field_y >= len(gamefield[field_x])):  # Überprüft, ob field_y innerhalb der Feldgrenzen liegt
                    if (gamefield[field_x][field_y]["Mine"]) == True:
                        check_minen = check_minen + 1  # Erhöht die Zählung, wenn eine Mine gefunden wird
    return check_minen  # Gibt die Anzahl der benachbarten Minen zurück




# Funktion zur Erstellung des Spielfelds
def create_field(field_range_x, field_range_y, probability):
    """
    Test
    """
    gamefield = []  # Initialisiert das Spielfeld als leere Liste
    for field_x in range(field_range_x):        
        reihe = []  # Initialisiert eine neue Zeile
        for field_y in range(field_range_y):
            if random.randint(1, 100) < probability:
                mine_tile = {'Mine': True, 'Flagge': False, 'Offen': False, 'Value': -1}  # Fügt ein Minenfeld hinzu
                reihe.append(mine_tile)
            else:
                empty_tile = {'Mine': False, 'Flagge': False, 'Offen': False, 'Value': 0}  # Fügt ein leeres Feld hinzu
                reihe.append(empty_tile)
        gamefield.append(reihe)  # Fügt die Zeile zum Spielfeld hinzu
    
    for field_x in range(len(gamefield)):
        for field_y in range(len(gamefield[field_x])):
            if not gamefield[field_x][field_y]["Mine"]:
                gamefield[field_x][field_y]["Value"] = check_number(gamefield, field_x, field_y)  # Setzt den Wert für nicht-minen Felder

    return gamefield  # Gibt das erstellte Spielfeld zurück

def create_safe_field(open_x, open_y, field_range_x, field_range_y, probability):
    safe_field = create_field(field_range_x, field_range_y, probability)
    attempt = 0
    while safe_field[open_x-1][open_y-1]["Mine"]:
        safe_field = create_field(field_range_x, field_range_y, probability)
        attempt = attempt + 1
    print("Attempts:", attempt)
    return safe_field

# Funktion zur Überprüfung des Spielzustands
def get_game_status(gamefield, open_x, open_y):
    if gamefield[open_x-1][open_y-1]["Mine"] == True and gamefield[open_x-1][open_y-1]["Offen"]:
        return "LOST"  # Spiel verloren, wenn eine Mine aufgedeckt wurde
    
    anzahl_minen = 0  # Zählt die Gesamtanzahl der Minen
    anzahl_geschlossene_felder = 0  # Zählt die Anzahl der nicht aufgedeckten Felder
    
    for field_x in range(len(gamefield)):
        for field_y in range(len(gamefield[field_x])):
            if gamefield[field_x][field_y]["Mine"] == True:
                anzahl_minen = anzahl_minen + 1
            if gamefield[field_x][field_y]["Offen"] == False:
                anzahl_geschlossene_felder = anzahl_geschlossene_felder + 1
    
    if anzahl_geschlossene_felder == anzahl_minen:
        return "WON"  # Spiel gewonnen, wenn nur noch Minen übrig sind, die nicht aufgedeckt wurden
    else:
        return "CONTINUE"  # Spiel geht weiter

def open_all_mines(gamefield):
    for reihe in gamefield:
        for element in reihe:
            if element["Mine"] and element["Flagge"] == False:
                element["Offen"] = True
    return gamefield
        

# Funktion zur Ausgabe des Spielfelds
def ausgabe(gamefield):
    for reihe in gamefield:
        zeile = ""  # Initialisiert eine leere Zeile für die Ausgabe
        for element in reihe:
            if not element["Offen"]:  # Wenn das Feld nicht offen ist
                if element["Flagge"] == True:
                    zeile = zeile + ("F ")  # Fügt ein "F" für Flagge hinzu
                else:
                    zeile = zeile + ("X ")  # Fügt ein "X" für ein geschlossenes Feld hinzu
            else:
                if element["Mine"]:
                    zeile = zeile + ("M ")  # Fügt ein "M" für Mine hinzu, wenn das Feld offen und eine Mine ist
                else:
                    zeile = zeile + str(element["Value"]) + " "  # Fügt den Wert des Feldes hinzu
        print(zeile)  # Gibt die Zeile aus




def count_mines(gamefield, open_x, open_y):
        minen = 0  # Zählt die Anzahl der benachbarten Minen
        for field_x in range(max(0, open_x-2), min(len(gamefield), open_x+1)):
            for field_y in range(max(0, open_y-2), min(len(gamefield[field_x]), open_y+1)):
                if gamefield[field_x][field_y]["Mine"] == True:
                    minen += 1 # Erhöht die Zählung, wenn eine Mine gefunden wird
        return minen  # Gibt die Anzahl der benachbarten Minen zurück

# Funktion zum Aufdecken eines Feldes
def aufdecken(gamefield, open_x, open_y):
    if gamefield[open_x-1][open_y-1]["Offen"]:
        return gamefield  # Wenn das Feld schon offen ist, nichts tun
    
    gamefield[open_x-1][open_y-1]["Offen"] = True  # Markiert das Feld als offen
    gamefield[open_x-1][open_y-1]["Flagge"] = False  # Entfernt eine Flagge, falls vorhanden
    
    if gamefield[open_x-1][open_y-1]["Mine"]:
        return gamefield  # Falls es eine Mine ist, keine weiteren Felder aufdecken

    minen = count_mines(gamefield, open_x, open_y)

    if minen == 0:
        for field_x in range(max(0, open_x-2), min(len(gamefield), open_x+1)):
            for field_y in range(max(0, open_y-2), min(len(gamefield[field_x]), open_y+1)):
                if not (field_x < 0 or field_x >= len(gamefield)):  # Überprüft, ob field_x innerhalb der Feldgrenzen liegt
                    if not (field_y < 0 or field_y >= len(gamefield[field_x])):
                        if not gamefield[field_x][field_y]["Offen"]:
                            if gamefield[field_x][field_y]["Flagge"] == False:
                                gamefield = aufdecken(gamefield, field_x+1, field_y+1)

    return gamefield  # Gibt das aktualisierte Spielfeld zurück



# Funktion zum Setzen oder Entfernen einer Flagge auf einem Feld
def place_flag(gamefield, flag_x, flag_y):
    gamefield[flag_x-1][flag_y-1]["Flagge"] = not gamefield[flag_x-1][flag_y-1]["Flagge"]  # Schaltet den Flaggenstatus um
    return gamefield  # Gibt das aktualisierte Spielfeld zurück



















# Hauptspielfunktion
# def play(gamefield):
    
#     while True:
#         choice = int(input("Flagge: 1, Feld auslösen: 2 was möchtest du tun: "))

#         if choice == 1:
#             flag_x = int(input("X: "))
#             flag_y = int(input("Y: "))
#             place_flag(gamefield, flag_x, flag_y)  # Setzt oder entfernt eine Flagge auf dem ausgewählten Feld
#             ausgabe(gamefield)
#             status = get_game_status(gamefield, flag_x, flag_y)  # Überprüft den Spielstatus
#             if status == "LOST":
#                 print("GAME OVER")  # Spiel verloren
#                 gamefield = open_all_mines(gamefield)  # Deckt alle Minen auf
#                 ausgabe(gamefield)
#                 quit()
#             elif status == "WON":
#                 print("!WIN!(*-*)!WIN!")  # Spiel gewonnen
#                 quit()
#             elif status == "CONTINUE":
#                 pass

#         if choice == 2:
#             open_x = int(input("X: "))
#             open_y = int(input("Y: "))
            
#             check_number(gamefield, open_x, open_y)  # Überprüft die Anzahl der benachbarten Minen
#             if gamefield[open_x-1][open_y-1]["Flagge"] == True:
#                 inp = input("Sicher hier ist eine Flagge, trotzdem auslösen: 1: JA, 2: NEIN: ")
#                 if inp == "1":
#                     if gamefield[open_x-1][open_y-1]["Offen"] == False:
#                         gamefield = aufdecken(gamefield, open_x, open_y)  # Deckt das ausgewählte Feld auf
#                         ausgabe(gamefield)
#                     elif gamefield[open_x-1][open_y-1]["Offen"] == True:
#                         ausgabe(gamefield)
#                     status = get_game_status(gamefield, open_x, open_y)  # Überprüft den Spielstatus
#                     if status == "LOST":
#                         print("GAME OVER")  # Spiel verloren
#                         gamefield = open_all_mines(gamefield)  # Deckt alle Minen auf
#                         ausgabe(gamefield)
#                         quit()
#                     elif status == "WON":
#                         print("!WIN!(*-*)!WIN!")  # Spiel gewonnen
#                         quit()
#                     elif status == "CONTINUE":
#                         pass
#                 else:
#                     print("Ok, dann nicht")
#             if gamefield[open_x-1][open_y-1]["Flagge"] == False:
#                 if gamefield[open_x-1][open_y-1]["Offen"] == False:
#                     gamefield = aufdecken(gamefield, open_x, open_y)  # Deckt das ausgewählte Feld auf
#                     ausgabe(gamefield)
#                 elif gamefield[open_x-1][open_y-1]["Offen"] == True:
#                     ausgabe(gamefield)
#                 status = get_game_status(gamefield, open_x, open_y)  # Überprüft den Spielstatus
#                 if status == "LOST":
#                     print("GAME OVER")  # Spiel verloren
#                     gamefield = open_all_mines(gamefield)  # Deckt alle Minen auf
#                     ausgabe(gamefield)
#                     quit()
#                 elif status == "WON":
#                     print("!WIN!(*-*)!WIN!")  # Spiel gewonnen
#                     quit()
#                 elif status == "CONTINUE":
#                     pass

# # Hauptprogrammstart
# if __name__ == "__main__":
#     a = int(input("Wie groß soll das Feld sein. Bsp: 10 = (10*10 = 100): "))  # Größe des Spielfelds
#     b = int(input(""))
#     pct = int(input("Wieviele Minen willst du in %? (Wahrscheinlichkeit auf 100): "))  # Wahrscheinlichkeit, dass ein Feld eine Mine ist
#     field = create_field(a, b, pct)  # Erstellt das Spielfeld
#     pprint.pprint(field)  # Gibt das Spielfeld für Debugging-Zwecke aus
#     ausgabe(field)  # Gibt das Spielfeld für den Spieler aus
#     play(field)  # Startet das Spiel
#     status = get_game_status(field)
#     pprint.pprint(status)