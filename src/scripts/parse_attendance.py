import json

with open('attendance.csv') as file:
    lines = file.readlines()
    cleanLines = [line.strip().split(',') for line in lines][1:]

    # email, name, id, hours
    idx = [1,-5,-4,-3]
    cleanestLines = [[line[i] for i in idx] for line in cleanLines]

    x = []
    for l in cleanestLines:
        l[3] = float(l[3])
        x.append({"email": l[0], "name": l[1], "id": l[2], "hours": l[3]})

    with open('attendance.json', 'w') as outfile:
        json.dump({"attendances": x}, outfile)
