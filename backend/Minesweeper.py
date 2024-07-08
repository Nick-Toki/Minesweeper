import random
import pprint
# Hier beginnt Minesweeper Beginn mit dem Feld an
a = int(input("Wie groß soll das Feld sein. Bsp: 10 = (10*10 = 100): "))
pr = int(input("Wieviele Minen willst du in %? (Wahrscheinlichkeit auf 100): "))                   
             
def check_number(fie, first, second):
    n = 0
    for i in range(first-1, first+2):
        for j in range(second-1, second+2):
            if not (i < 0 or i>= len(fie)):
                if not (j < 0 or j>= len(fie[i])):
                    if (fie[i][j]["Mine"]) == True:
                       n = n + 1        
    return n


def create_field(Mine, Flagge, f_range, prob, pow):
    fie = []
    for i in range(f_range):        
        fly = []
        for j in range(f_range):
            if random.randint(1,100) < prob :
                d = {'Mine': True, 'Flagge': False, 'Offen': False, 'value': -1}
                fly.append(d)
            else:
                e = {'Mine': False, 'Flagge': False, 'Offen': False, 'value': 0 }

                fly.append(e)
            
        fie.append(fly)
    
    for i in range(len(fie)):
        for j in range(len(fie[i])):
            if not fie[i][j]["Mine"]:
                fie[i][j]["value"] = check_number(fie, i, j)

               
                  
    return fie

    # durch alle felder gehen {
      # if not mine
            # n = check_number
            # value = n
    # }

def Ziel(fie):
    for i in range(len(fie)):
        for j in range(len(fie[i])):
            if fie[i][j]["Mine"] == True:
                if not fie [i][j]["Flagge"] == True:
                    return False
                    
    return True
                

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
                    zeile = zeile + str(element["value"]) + " "
        print(zeile)               

def aufdecken(fie, x, y):
    fie[x-1][y-1]["Offen"] = True
    # for i in range(x-2, x+1):
    #     for j in range(y-2, y+1):
    #         if not (i < 0 or i>= len(fie)):
    #             if not (j < 0 or j>= len(fie[i])):
    #                 if (not fie[i][j]["Mine"]) and (not fie[i][j]["Offen"]) and n>0:
    #                     fie = aufdecken(fie, i, j, n-1)
    # print(fie)
  
    return fie

# Hier gehts ans "Hauptspiel" ab hier werden die Felder ausgewählt
def play(fie):
    while True:
        
        g = int(input("Flagge: 1, Feld auslösen: 2 was möchtest du tun: "))
     

        if g == 1:
            q = int(input("X: "))
            k = int(input("Y: "))
            
            fie[q-1][k-1]["Flagge"] = not fie[q-1][k-1]["Flagge"] 
            ausgabe(fie)
            if Ziel(field) == True:
                print("!WIN!(*-*)!WIN!")
                quit()

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
                        else:
                            ausgabe(fie)
                        if fie[x-1][y-1]["Mine"] == True:
                            print("Game Over")
                            quit()
                        else:
                            print("Alles Gut")
                    else:
                        print("Ok, dann nicht")
                if fie[x-1][y-1]["Flagge"] == False:
                    if fie[x-1][y-1]["Offen"] == False:
                        fie = aufdecken(fie, x, y)
                        ausgabe(fie)
                    elif fie[x-1][y-1]["Offen"] == True:  
                        ausgabe(fie)
                    if fie[x-1][y-1]["Mine"] == True:
                        print("Game Over")
                        quit()

                


                    
field = create_field(2, 1, a, pr, ["1", "2", "3", "0"])
pprint.pprint(field)
ausgabe(field)
play(field)



