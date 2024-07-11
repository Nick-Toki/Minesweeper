import random
import pprint
# Hier beginnt Minesweeper Beginn mit dem Feld an
                  
             
def check_number(fie, first, second):
    n = 0
    for i in range(first-1, first+2):
        for j in range(second-1, second+2):
            if not (i < 0 or i>= len(fie)):
                if not (j < 0 or j>= len(fie[i])):
                    if (fie[i][j]["Mine"]) == True:
                       n = n + 1        
    return n


def create_field(f_range, prob):
    fie = []
    for i in range(f_range):        
        fly = []
        for j in range(f_range):
            if random.randint(1,100) < prob :
                d = {'Mine': True, 'Flagge': False, 'Offen': False, 'Value': -1}
                fly.append(d)
            else:
                e = {'Mine': False, 'Flagge': False, 'Offen': False, 'Value': 0 }
                fly.append(e)
            
        fie.append(fly)
    
    for i in range(len(fie)):
        for j in range(len(fie[i])):
            if not fie[i][j]["Mine"]:
                fie[i][j]["Value"] = check_number(fie, i, j)

               
                  
    return fie

    # durch alle felder gehen {
      # if not mine
            # n = check_number
            # Value = n
    # }

def Ziel(fie, x, y):
    
    if fie[x-1][y-1]["Mine"] == True and fie[x-1][y-1]["Offen"] :
        return "LOST"
    
    
    anzahl_minen = 0
    anzahl_geschlossene_felder = 0
    
    
    for i in range(len(fie)):
        for j in range(len(fie[i])):
            if fie[i][j]["Mine"] == True:
                anzahl_minen = anzahl_minen + 1
            if fie[i][j]["Offen"] == False:
                anzahl_geschlossene_felder = anzahl_geschlossene_felder + 1
                
                
    # print(anzahl_geschlossene_felder, anzahl_minen)
    if anzahl_geschlossene_felder == anzahl_minen:
        return "Won"
            
    else:
        return "Go on"
  
    
                

def ausgabe(fie):    
    for row in fie:
        zeile = ""
        for element in row:
            if not element["Offen"]:
                if element["Flagge"] == True:
                    zeile = zeile + ("F ")
                else:
                    zeile = zeile + ("X ")
            else:
                if element["Mine"]:
                    zeile = zeile + ("M ")
                else:
                    zeile = zeile + str(element["Value"]) + " "
        print(zeile)               

def aufdecken(fie, x, y):
    fie[x-1][y-1]["Offen"] = True
    fie[x-1][y-1]["Flagge"] = False
    # for i in range(x-2, x+1):
    #     for j in range(y-2, y+1):
    #         if not (i < 0 or i>= len(fie)):
    #             if not (j < 0 or j>= len(fie[i])):
    #                 if (not fie[i][j]["Mine"]) and (not fie[i][j]["Offen"]) and n>0:
    #                     fie = aufdecken(fie, i, j, n-1)
    # print(fie)
  
    return fie


def Flag(fie, q, k):
    fie[q-1][k-1]["Flagge"] = not fie[q-1][k-1]["Flagge"]
    return fie


# Hier gehts ans "Hauptspiel" ab hier werden die Felder ausgewählt
def play(fie):
    while True:
        
        g = int(input("Flagge: 1, Feld auslösen: 2 was möchtest du tun: "))
        # ausgabe(field)

        if g == 1:
            q = int(input("X: "))
            k = int(input("Y: "))
            
            Flag(field, q, k) 
            ausgabe(fie)
            if Ziel(field, q, k) == "WON" :
                print("!WIN!(*-*)!WIN!")
                quit()
            if Ziel(field, q, k) == "LOST":
                print("GAME OVER")
                quit()
            if Ziel(field, q, k) == "Go on":
                pass
        if g == 2:
                x = int(input("X: "))
                y = int(input("Y: "))
                check_number(fie, x, y)
                if fie [x-1][y-1]["Flagge"] == True:
                    inp = input("Sicher hier ist eine Flagge, trotzdem auslösen: 1:JA 2:NEIN: ")
                    if inp == "1":
                        if fie[x-1][y-1]["Offen"] == False:
                            fie = aufdecken(fie, x, y)
                            ausgabe(fie)
                        elif fie[x-1][y-1]["Offen"] == True:
                            ausgabe(fie)
                        if Ziel(field, x, y) == "LOST":
                            print("GAME OVER")
                            quit()
                        if Ziel(field, x, y) == "WON" :
                            print("!WIN!(*-*)!WIN!")
                            quit()
                        if Ziel(field, x, y) == "Go on":
                            pass
                    else:
                        print("Ok, dann nicht")
                if fie[x-1][y-1]["Flagge"] == False:
                    if fie[x-1][y-1]["Offen"] == False:
                        fie = aufdecken(fie, x, y)
                        ausgabe(fie)
                    elif fie[x-1][y-1]["Offen"] == True:  
                        ausgabe(fie)
                    if Ziel(field, x, y) == "LOST":
                            print("GAME OVER")
                            quit()
                    if Ziel(field, x, y) == "Won":
                        print("!WIN!(*-*)!WIN!")
                        quit()
                    if Ziel(field, x, y) == "Go on":
                        pass

                

if __name__ == "__main__":
    a = int(input("Wie groß soll das Feld sein. Bsp: 10 = (10*10 = 100): "))
    pr = int(input("Wieviele Minen willst du in %? (Wahrscheinlichkeit auf 100): ")) 
    # fie = []
    # x = int(input("X: "))
    # y = int(input("Y: "))
    # g = int(input("Flagge: 1, Feld auslösen: 2 was möchtest du tun: "))
    field = create_field(a, pr)
    # updatedField = aufdecken(fie, x, y) 
    # pprint.pprint(field)
    ausgabe(field)
    play(field)