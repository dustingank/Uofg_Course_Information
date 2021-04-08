#!/usr/bin/env python

from course_parse import parse
from course_parse import course_obj
from Graph import Graph
import xml.etree.cElementTree as ET
from display import print_data
import search
import os.path
from os import path



def main():

    print("\n********************************************Test Case 1********************************************\n")
    print("\t Check if gexf file is being created\n")

    # parse the information and loads it into datastructure
    graph = parse(0)

    Graph.to_gefx(graph, "")

    print ("\t File exists:"+str(path.exists('testSize.gexf')))


    print("\n********************************************Test Case 2********************************************\n")
    print("\t Check if node element has size attribute\n")

    # parse the information and loads it into datastructure
    
    root = ET.parse("testSize.gexf") 

    size = root.find("node[@id='MCS*4100']/{http://www.gexf.new/1.3/viz}size")

    if size != None:
        print("\t success")
    else:
        print("\t fail")


    
    ## TO DO
    print("\n********************************************Test Case 3********************************************\n")
    print("\t Check if node element has colour attribute\n")

    # parse the information and loads it into datastructure
    root = ET.parse("testSize.gexf")
    
    color = root.find("node[@id='MCS*4100']/{http://www.gexf.new/1.3/viz}color")

    if color != None:
        print("\t success")
    else:
        print("\t fail")

if __name__ == "__main__":
    main()
