#!/usr/bin/env python

from course_parse import parse
from course_parse import course_obj
from Graph import Graph
from display import print_data
import search


# main flow of the program
def main():

    # parse the information and loads it into datastructure
    graph = parse(0)

    print("Welcome to our first sprint project")
    quit_shell = False

    while quit_shell is False:
        print('Please select your option by typing the coresponding number or type \"quit\" or \"exit\" to exit: ')
        print("1: Enter in your own search query")
        print("2: Select from a list of pre built queries")

        user_input = input("> ")
        user_input = user_input.lower()
        if user_input == "quit" or user_input == "exit":
            # user exits
            quit_shell = True
        elif user_input == "1":

            print(" please enter your search query, (e.g \" Show me all 0.25 credit courses \"): ")

            user_input = input("> ")
            user_input = user_input.lower()

            # user inputs search option
            # parse user input
            user_input = search.parse_user_input(user_input)

            # searches datastructure for results
            search_result = search.search(user_input, graph)
            
            print("***TEST***")
            print(user_input)
            
            # prints out the result's
            print_data(search_result)


        elif user_input == "2":
            # user selects a pre built query
            print("Please select from our pre-build queries by typing the coresponding number: ")

            search_result = search.canned_search(graph)

            print_data(search_result)

            # print("1: ")
            # print("2: ")
            # print("3: ")
            # print("4: ")
            # print("5: ")

            # user_selection = input("> ")
            # if user_selection ==1:
            #     print("1: ")
            # elif user_selection == 2:
            #     print("2: ")
            # elif user_selection == 3:
            #     print("3: ")
            # elif user_selection == 4:
            #     print("4: ")
            # elif user_selection == 5:
            #     print("5: ")
            # else:
            #     print("sorry you did not enter a valid option, returning to main menu")
                
        else:
            print("That is not a valid option please try again")
        



if __name__ == "__main__":
    main()