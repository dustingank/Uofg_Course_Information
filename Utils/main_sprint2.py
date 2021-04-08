from course_parse import parse
from course_parse import course_obj
from scraper_parser import parse_scraped
from Graph import Graph
from Database import Database
import xml.etree.cElementTree as ET
from display import print_data
import search
import os.path
from os import path

# main flow of the program
def main():

    # parse the information and loads it into datastructure
    graph = parse(0)
    parse_scraped(graph)

    # connect to the DB
    # write to the DB
    Database.create()
    
    Database.insert(graph)

    print("Welcome to our second sprint project")
    quit_shell = False

    while quit_shell is False:
        print('Please input the section abbrevation (e.g. CIS) to create the .gefx file (enter blank for all courses) or type \"quit\" or \"exit\" to exit: ')

        user_input = input("> ")
        user_input = user_input.lower().strip()
        if user_input == "quit" or user_input == "exit":
            # user exits
            quit_shell = True
        else:
            Graph.to_gefx(graph, user_input)
            # user exits
            quit_shell = True

if __name__ == "__main__":
    main()