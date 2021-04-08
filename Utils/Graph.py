from collections import defaultdict
import xml.etree.cElementTree as ET
import re

class Graph():

    #Create a graph, can recieve no connections initially or a set of connections that already exist.
    #Graph is represented using a dictionary of sets, where each set has a key which is the Course, all members of the set are the course prerequisites.
    #Ex: g = [(CIS*1500, None), (CIS*1300, None)]
   def __init__(self, connections):
       self.graph = defaultdict(set)

       if connections is not None:
        self.add_connections(connections)

    #Add a set tuple of connections to the graph
    #A connection is defined as a pair of Courses node1 being the parent and node2 being a prerequisite course.
    #Ex: For CIS*2500, graph.add_connections((cis2500, cis1300))
   def add_connections(self, connections):
       for node1, node2 in connections:
           self.add(node1, node2)
    
    #Add a new node to the graph
    #A new node is a tuple with (parent, connection) pair or (parent, None) if no connection is present
    #Ex: For CIS*2750, a single entry for this would be graph.add(CIS*2750, CIS*2520) another could be graph.add(CIS*2750, CIS*2430)
    #Return: {CIS*2750 : (CIS*2520, CIS*2430)}
   def add(self, node1, node2):
       if node2 is not None:
            self.graph[node1].add(node2)
       elif node2 is None:
           self.graph[node1]

    #Check to see if a node1 is connected to node2
    #Checks to  see if node1 is in graph, and if node2 is inside the entry for node1
    #Ex: If g = [(CIS*1500, None), (CIS*1300, None), (CIS*2500, CIS*1500)], isConnected(3, 1) returns True. While isConnected(1,2) returns false
   def is_connected(self, node1, node2):
       return node1 in self.graph and node2 in self.graph[node1]

    #Find a pathway from node1(src) to node2(dst)
    #Ex: graph.find_path(CIS2500, CIS1500), would return a list containing [CIS2500, CIS1500]
   def find_path(self, node1, node2, path=[]):
       path = path + [node1]
       if node1 == node2:
           return path
       if node1 not in self.graph:
            return None
       for node in self.graph[node1]:
           if node not in path:
               new_path = self.find_path(node, node2, path)
               if new_path:
                   return new_path
       return None

    #Return a list of all nodes in the graph
   def print_nodes(self):
       courses = []
       for node in self.graph:
            courses.append(node)
       return courses

    #Create a gexf file from the graph
   def to_gefx(self, c=""):
       
       #Create some XML tags for organization
       # root of the nodes and edges
       root = ET.Element("root")
       root.set('xmlns:viz', "http://www.gexf.new/1.3/viz")
       doc = ET.SubElement(root, "doc")

       #Get the course list to make placing prereqs easier
       courses = self.print_nodes()
       edgeid = 0
       
       for course in courses:
        if c.upper() in course.course_code:
            #Create a node
            ET.SubElement(root, "node", id=course.course_code, label=course.course_code)
            # adds size to the nodes
            self.size_node(course, root)
        
       for course in courses:
        if c.upper() in course.course_code:
            prereq = []
            #Extract any instances of the following "XX.XX credits include ABC*0000", will only grab 1 course code from the list
            prereq += re.findall(r"(\d*\d.\d\d credits including [A-Z]+\*[0-9]+)", course.prerequisite)
            if not prereq:
            #If the other rep of credit requirement isnt there check for a different code
             prereq += re.findall(r"(\d*\d.\d\d credits)", course.prerequisite)

        
        #Extract only the course code from the prerequisite place it in a list
            prereq += (re.findall(r"([A-Z]+\*[0-9]+)+", course.prerequisite))
        
            if prereq:
            #Create an edge from each course to all its prereqs
                for x in prereq:
                    ET.SubElement(root, "edge", id=str(edgeid), source=course.course_code, target=x)
                    edgeid = edgeid + 1

       #Write the xml tree
       tree = ET.ElementTree(root)
       tree.write("testSize.gexf")

   def size_node(self, course, root):
        # counts the number of pre-req's that a node will connect to
        # default size is 1
        size = 5.0
        prereq = (re.findall(r"([A-Z]+\*[0-9]+)+", course.prerequisite))
        if prereq:
            # the number is not 0
            for x in prereq:
                size = size + 1

        # idk if i can do this here
        # if not i will add it in the to_gefx function
        # find the element with its id
        node = root.find("node[@id='%s']" % course.course_code)
        
        self.color_node(node, size)
        # make a sub-element of the found node and set the size to be the number of pre-req's
        ET.SubElement(node, "viz:size", value=str(size))

   def color_node(self, node, size):
        if (size == 5):
            ET.SubElement(node, "viz:color", r=str(199), g=str(56), b=str(56), a=str(0.5))
        elif (size == 6):
            ET.SubElement(node, "viz:color", r=str(199), g=str(56), b=str(128), a=str(0.5))
        elif (size == 7):
            ET.SubElement(node, "viz:color", r=str(166), g=str(56), b=str(199), a=str(0.5))
        elif (size == 8):
            ET.SubElement(node, "viz:color", r=str(94), g=str(56), b=str(199), a=str(0.5))
        elif (size == 9):
            ET.SubElement(node, "viz:color", r=str(56), g=str(61), b=str(199), a=str(0.5))
        elif (size == 10):
            ET.SubElement(node, "viz:color", r=str(16), g=str(109), b=str(199), a=str(0.5))
        elif (size == 11):
            ET.SubElement(node, "viz:color", r=str(56), g=str(199), b=str(152), a=str(0.5))
        elif (size == 12):
            ET.SubElement(node, "viz:color", r=str(56), g=str(199), b=str(71), a=str(0.5))
        elif (size == 13):
            ET.SubElement(node, "viz:color", r=str(152), g=str(199), b=str(56), a=str(0.5))
        elif (size == 14):
            ET.SubElement(node, "viz:color", r=str(199), g=str(161), b=str(56), a=str(0.5))
        elif (size == 15):
            ET.SubElement(node, "viz:color", r=str(199), g=str(109), b=str(56), a=str(0.5))
        else:
            ET.SubElement(node, "viz:color", r=str(42), g=str(106), b=str(144), a=str(0.5))




