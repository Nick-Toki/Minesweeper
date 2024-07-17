
def test(peter):
    print("Peter: " + str(peter))
    return peter


def test2(otto):
    otto = test(peter=otto)
    print (otto)
    return otto

if __name__ == "__main__":
    test2(22)