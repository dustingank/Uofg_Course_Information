from Graph import Graph

class Course:
    def __init__(self, courseID, courseName, desc):
        self.courseID = courseID
        self.courseName = courseName
        self.desc = desc
        self.prereq = []

    def setID(self, newID):
        self.courseID = newID
        return getattr(self, "courseID")

    def addPrereq(self, prereq):
        for x in prereq:
            self.prereq.append(x)
        return getattr(self, "prereq")

    def toString(self):
        return {'id': self.courseID, 'cName': self.courseName, 'desc': self.desc, 'prereq':self.prereq}

def main():
    graph = Graph(None)

    cis1500 = Course("cis1500", "wow", "desc")
    cis2500 = Course("cis2500", "cool", "desc")
    cis2750 = Course("cis2750", "yo", "desc")
    cis1000 = Course("cis1000", "yo", "desc")

    connections = [(cis1000, None), (cis1500, None)]

    print("Graph should be empty")
    print(graph.print_nodes())

    print("Adding a single node to the graph, currently has no connections: Should see [Course Object, set()]")
    graph.add(cis2500, None)
    print(graph.graph.items())

    print("Adding 2 courses, which will be then added to the connections for cis2500")
    graph.add_connections(connections)
    for node in graph.print_nodes():
        print(node.courseID)

    print("Adding connections for cis1500 to cis2500")
    graph.add(cis2500,cis1500)
    for node in graph.graph.items():
        print(node)

    print("Check to see that a connection between cis2500 and cis1500 exists: Should return True")
    print(graph.is_connected(cis2500, cis1500))

    print("Find a pathway between cis2500 and cis1500")
    for node in graph.find_path(cis2500, cis1500):
        print(node.courseID)

if __name__ == "__main__":
    main()