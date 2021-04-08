
# Authors: Ozair Ashfaq, Joshua Prpic
# search.py
# Functions that will enable the program to search and return courses in the
# data structure.
#

import re
from Graph import Graph

# Function: search, this function will take in a dictionary of keywords that the results
# must follow and a graph of all courses.
# Parameter(s): user_search - Dict, holds keywords and their values for the filter.
#               graph - Graph, data structure that holds all course data
# Return: An array of courses that are a result of the search filter
def search(user_search, graph):
    # Return if either the filter or graph is null
    if user_search is None or graph is None:
        return None
    
    # This block will be used to count the number of items that the filter will run
    # against the graph to find courses that match
    filter_size = 0
    for query_filter in user_search:
        # Only count filter options that have actual data
        if user_search[query_filter] is not None and str(user_search[query_filter]) != "":
            filter_size = filter_size + 1

    results = [] # The array that will hold the final search results
    if filter_size == 0: # If the filter is empty then return nothing
        return results 
    
    # Iterate through all the courses that exist within the graph
    for course in graph.print_nodes():
        data = course.to_dict() # Convert the node to a readable dictionary
        match_count = 0
        off_count = 0
        # Check to see what section the course belongs to, e.g. "CIS" or "HIST"
        course_section = look_for_match("([a-zA-Z]{3}|[a-zA-Z]{4})\*", data["course_code"], 0)

        if course_section:
            course_section = course_section.replace("*", "").strip()

        # Loop through each option in the filter (user_search)
        for query_filter in user_search:
            # If there is data for the keyword then filter otherwise skip
            if user_search[query_filter] is not None and str(user_search[query_filter]) != "":
                # Sections need to be handled differently due to them not being stored in the
                # Course object.
                if query_filter == "section":
                    # This is where the course_section from earlier is used.
                    
                    if course_section and course_section.lower() == user_search[query_filter]:
                        match_count = match_count + 1
                elif query_filter == "semesters_offered":
                    curr_off = data[query_filter]
                    comp_off = user_search[query_filter]
                    for i in comp_off:
                        if i in curr_off:
                            off_count = off_count + 1
                    if off_count == len(comp_off):
                        match_count = match_count + 1
                # Search for the provided substring inside the course description
                elif query_filter == "description":
                    if user_search[query_filter].lower() in data[query_filter].lower():
                        match_count = match_count + 1
                # Match the filter option data to the Course instance variable value
                elif data[query_filter].lower() == user_search[query_filter].lower():
                    match_count = match_count + 1
        #print(str(match_count) + "<<>>" + str(filter_size))
        # If the course met every single criteria then add it to the result array
        if match_count == filter_size:
            results.append(course)     
    return results

# Function: parse_user_input, this function will take in user input in the form of a query
# and will parse the string into different keywords to search for in the course data
# structure.
# Parameter(s): user_input - String, user input to be parsed.
# Return: Json structure that holds the input breakdown into seperate keywords
def parse_user_input(user_input):
    user_input = user_input.lower() # Lowercase everything for the sake of consistency
    inner_quote_regex = "\"\s*([^\"]*)\s*\"" # This regex is used to get values between quotes

    # Accepts any set of string within quotes prefaced by 'course title'
    course_title = look_for_match("course title \"[\w|\s]*\"", user_input, 0) # Value in inner quotes
    course_title = look_for_match(inner_quote_regex, course_title, 0)
    # Remove any quotation marks
    if course_title is not None:
        course_title = course_title.replace("\"", "")

    # Captures any patterns that match a course code
    course_code = look_for_match("([a-zA-Z]{3}|[a-zA-Z]{4})\*[0-9]{4}", user_input, 0)
    # Will cut out parts of the course code to get the section code, e.g. "CIS"
    section = look_for_match("\"([a-zA-Z]{3}|[a-zA-Z]{4})\" courses", user_input, 0)
    # Remove unnecessary quotes and words
    if section is not None:
        section = section.replace("courses", "")
        section = section.replace("\"", "").strip()

    # Captures 'fall/summer/winter offering/offerings' OR 'F/W/S' as a semester
    semesters_offered = look_for_match("((winter|summer|fall) offering|offerings)|(\A| )[fws]($| )", user_input, 1)
    # Clean up
    if semesters_offered is not None:
        if not semesters_offered:
            semesters_offered = None
        else:
            temp_off = []
            for i in semesters_offered[0]:
                if i.lower().strip() == "summer":
                    temp_off.append("S")
                elif i.lower().strip() == "winter":
                    temp_off.append("W")
                elif i.lower().strip() == "fall":
                    temp_off.append("F")
            semesters_offered = temp_off

    # Will match patterns for lecture hours
    lecture_hours = look_for_match("([0-9]+|no) lecture (hours|hour)", user_input, 0)
    lecture_hours = look_for_match("[0-9]+", lecture_hours, 0)

    # Will match patterns for lab hours
    lab_hours = look_for_match("([0-9]+|no) lab (hours|hour)", user_input, 0)
    lab_hours = look_for_match("[0-9]+", lab_hours, 0)

    # Will capture a substring following the format x.xx credit(s)
    credit_weight = look_for_match("([0,1].[0,2,5,7][0,5]*) credit|credits", user_input, 0)
    if credit_weight is not None:
        credit_weight = credit_weight.replace("credits", "").strip()
        credit_weight = credit_weight.replace("credit", "").strip()
        credit_weight = "[" + credit_weight + "]"

    # Captures a query on the description indicated with prefixing word 'about'
    description = look_for_match("about \"(\w|\s)*\"", user_input, 0) # Value in inner quotes
    description = look_for_match(inner_quote_regex, description, 0)
    if description is not None:
        description = description.replace("\"", "")

    # Value in inner quotes
    departments = look_for_match("department( of| ) \"[\w|\s]*\"", user_input, 0)
    departments = look_for_match(inner_quote_regex, departments, 0)
    if departments is not None:
        departments = departments.replace("\"", "")
    # These regex commands are not used currently
    prerequisites = look_for_match("prerequisites|prerequisite|pre-requisite", user_input, 0)
    restrictions = look_for_match("restrictions|restriction", user_input, 0)
    corequistes = look_for_match("corequisites|corequisite|co-requisite|co-requisites", user_input, 0)

    # The final resulting structure for the filter
    search_for = {
        "course_title" : course_title,
        "course_code" : course_code,
        "semesters_offered" : semesters_offered,
        "lecture_hours" : lecture_hours,
        "lab_hours" : lab_hours,
        "credit_weight" : credit_weight,
        "description" : description,
        "departments" : departments,
        # Treat below as flags for return data
        "prerequisites" : prerequisites,
        "restrictions": restrictions,
        "co_requistes" : corequistes,
        # Other filters
        "section" : section,
        "ranked_by" : None
    }
    return search_for

# Function: look_for_match, this is a utility function that is used to run regex commands
# against provided strings
# Parameter(s): regex_str - String, the regex command.
#               orig_string - The string the regex command is applied on
# Return: The resulting match
def look_for_match(regex_str, orig_string, re_type):
    # Make sure actual parameters exist, otherwise return
    if orig_string is None or orig_string == "":
        return None
    match_string = None
    match = None
    # Run the regex command
    if re_type == 0:
        match = re.search(regex_str, orig_string)
        if (match is not None):
            match_string = match.group()
    elif re_type == 1:
        match = re.findall(regex_str, orig_string)
        match_string = match
    return match_string

#Built off of the other search functions to allow for premade searches to be run
#Parameters graph, data structure containing the parsed data
#Returns the result of the selected premade search query
def canned_search(graph):
    premade_searches = {
        "1" : "Show me all 0.75 credit courses",
        "2" : "Does cis*1500 have a fall offering?",
        "3" : "Show me all courses with summer offerings",
        "4" : "Show me courses with only 3 lecture hours",
        "5" : "Show me courses with 0 lab hours that are fall offerings",
    }
    
    #Display premade searches
    for search_number in premade_searches:
        print ("\t" + str(search_number) + ":  " + premade_searches[search_number])    

    #get user input to determine which search is desired
    print("Please select a canned search by number from the above list:")
    selection = input()

    #run parse_user_input on premade search query
    query = parse_user_input(premade_searches[selection])

    #run search against return and print result
    result = search(query, graph)

    #Return to main
    return result
