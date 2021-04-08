#!/usr/bin/env python

import re
import Graph
import json

file = None

class course_obj:
    course_title = ""
    course_code = ""
    semesters_offered = []
    lecture_hours = ""
    lab_hours = ""
    credit_weight = ""
    description = ""
    prerequisite = ""
    max_capacity = 0
    available_capacity = 0
    lecture_info = ""
    lab_info = ""
    seminar_info = ""
    exam_info = ""
    faculty = ""


    def __init__ (self):
        pass
    
    def set_course_title(self,course_title):
        self.course_title = course_title

    def set_course_code(self,course_code):
        self.course_code = course_code

    def set_semester_offered(self,semesters_offered):
        self.semesters_offered = semesters_offered

    def set_lecture_hours(self,lecture_hours):
        self.lecture_hours = lecture_hours

    def set_lab_hours(self,lab_hours):
        self.lab_hours = lab_hours

    def set_credit_weight(self,credit_weight):
        self.credit_weight = credit_weight
    
    def set_description(self,description):
        self.description = description

    def set_prerequisite(self,prerequisite):
        self.prerequisite = prerequisite

    def to_dict(self):

        sem = ",".join(self.semesters_offered)
        ret_string = {
            "course_title" : self.course_title,
            "course_code" : self.course_code,
            "semesters_offered" : sem,
            "lecture_hours" : self.lecture_hours,
            "lab_hours" : self.lab_hours,
            "credit_weight" : self.credit_weight,
            "description" : self.description,
            "prerequisite" : self.prerequisite,
            "max_capacity" : str(self.max_capacity),
            "available_capacity": str(self.available_capacity),
            "lecture_info": self.lecture_info,
            "lab_info": self.lab_info,
            "seminar_info" : self.seminar_info,
            "exam_info" : self.exam_info,
            "faculty": self.faculty
        }
        return ret_string

    def to_string(self):

        ret_string = {
            "course_title" : self.course_title,
            "course_code" : self.course_code,
            "semesters_offered" : self.semesters_offered,
            "lecture_hours" : self.lecture_hours,
            "lab_hours" : self.lab_hours,
            "credit_weight" : self.credit_weight,
            "description" : self.description,
            "prerequisite" : self.prerequisite,
            "max_capacity" : self.max_capacity,
            "available_capacity": self.available_capacity,
            "lecture_info" : self.lecture_info,
            "lab_info" : self.lab_info,
            "seminar_info" : self.seminar_info,
            "exam_info" : self.exam_info,
            "faculty": self.faculty
        }
        return json.dumps(ret_string)



def check_object(obj):

    if obj.course_code == "":
        return False

    if obj.course_title == "":
        return False

    if obj.description == "":
        return False

    if obj.lecture_hours == "":
        return False

    if obj.lab_hours == "":
        return False

    if obj.credit_weight == "":
        return False

    if len(obj.semesters_offered) == 0:
        return False

    return True


# Creates an array of semester offered based on if the text is in the string.
def find_semesters(string):

    array = []

    if " S " in string:

        array.append("S")

    elif " F " in string:

        array.append("F")

    elif " W " in string:

        array.append("W")

    elif " S,F,W " in string:

        array.append("S")
        array.append("F")
        array.append("W")

    elif " F,W,S " in string:

        array.append("F")
        array.append("W")
        array.append("S")

    elif " F,W " in string:

        array.append("F")
        array.append("W")

    elif " S,F " in string:

        array.append("S")
        array.append("F")

    elif " S,W " in string:

        array.append("S")
        array.append("W")

    elif " P1 " in string:

        array.append("P1")

    elif " P2 " in string:

        array.append("P2")

    elif " P3 " in string:

        array.append("P3")

    elif " P4 " in string:

        array.append("P4")

    elif " U " in string:

        array.append("U")


    return array


# Parses text file and creates objects of courses. Adds them to a graph.
def parse(option):
    
    file = open("c12.txt", "r", encoding="ISO-8859-1")

    file_content = ""

    graph = Graph.Graph(None)

    test_mode = False

    if option == 1:
        test_mode = True
        obj_list = list()

    # Adds new line character after each department. Fixes bug where all courses were not being found
    for line in file:

        dept = re.findall(r"(Department\(s\))(.*?)(?=[A-Z]+\*[0-9]{4})", line)

        if dept:

            new_str = ""
            for d in dept[0]:
                new_str += d

            final_str = new_str + "\n"

            line = line.replace(new_str, final_str)

            file_content += line

    # Find chunk of text from course code to end of description
    reg = re.compile("(?=[A-Z]+\*[0-9]{4})(.*?)(?<=Department\(s\):)")
    block = re.findall(reg, file_content)  

    for text in block:

        matches = re.findall(r"(([A-Z]+\*[0-9]+)(.*?)(\[([0-9]\.[0-9]+)\]))", text) # Find course, title, etc. E.g: BUS*4550 Applied Business Project I S,F,W (3-0) [0.50]

        if matches:

            for match in matches:

                obj = course_obj()

                course_code = re.findall(r"([A-Z]+\*[0-9]+)+", match[0]) # Find course code in found line

                if len(course_code) == 1: # If more than one course_code is returned, means bad data returned.

                    obj.set_course_code(course_code[0])
                    
                else: 
                    continue


                course_credit = re.findall(r"(\[([0-9]\.[0-9]+)\])", match[0]) # Find course credit in found line

                if len(course_credit) == 1: # If more than one course_credit is returned, means bad data returned.

                    obj.set_credit_weight(course_credit[0][0])

                # Grabs course description, remove trailing unwanted words.
                description = re.search("(?<=" + re.escape(course_credit[0][0]) + ")(.*?)(?=\(s\):)", text)
                formatted_description = re.search("(.*)(?=Department|Prerequisite|Offering|Restriction|Co-requisite|Equate)", description.group())
                obj.set_description(formatted_description.group())

                # Find course prerequisite in found line
                course_prereq = re.search(r"(?<=Prerequisite\(s\):)(.*?)(?=(Department\(s\):|Prerequisite\(s\):|Offering\(s\):|Restriction\(s\):|Co-requisite\(s\):|Equate\(s\):))", text) 
                
                if course_prereq:
                    obj.set_prerequisite(course_prereq.group())
                else:
                    obj.set_prerequisite("NONE")
                
                course_hours = re.findall(r"(\([0-9]-[0-9]\))", match[0]) # Find course hours in found line

                if len(course_hours) == 0:
                    course_hours = re.findall(r"(\([A-Z]-[A-Z]\))", match[0])

                if len(course_hours) == 0:
                    course_hours = re.findall(r"(\(\d\.\d-[0-9]\))", match[0])

                if len(course_hours) == 0:
                    course_hours = re.findall(r"(\([0-9]-\d\.\d\))", match[0])

                pre_format_hours = None

                if len(course_hours) == 1: # If more than one course_hours is returned, means bad data returned, skip to next iteration.

                    pre_format_hours = course_hours[0]
                    formatted_values = course_hours[0]

                    formatted_values = formatted_values.replace('(', '') # Make so data can be split. E.g: (3-0) -> ,3,0,
                    formatted_values = formatted_values.replace('-', ',')
                    formatted_values = formatted_values.replace(')', '')

                    split = re.split(',', formatted_values)

                    obj.set_lecture_hours(split[1])
                    obj.set_lab_hours(split[0])

                
                # Find semesters with function above
                obj.semesters_offered = find_semesters(match[0])

                # Remove everything from match and just leave course title behind
                course_title = match[0]
                course_title = course_title.replace(course_code[0], "")

                if pre_format_hours:

                    if pre_format_hours[0] != '(':

                        new_string = "(" + pre_format_hours
                        course_title = course_title.replace(new_string, "")

                    else:

                        course_title = course_title.replace(pre_format_hours, "")

                course_title = course_title.replace(course_credit[0][0], "")
                semester_string = ""
                index = 0

                for semester in obj.semesters_offered:

                    index = index + 1

                    semester_string += semester

                    if index < len(obj.semesters_offered):
                        semester_string += ","

                course_title = course_title.replace(semester_string, "")
                course_title = " ".join(course_title.split())
                obj.set_course_title(course_title)


                #Temporary print
                '''
                print("\n")
                print(obj.course_code + ", " + obj.course_title + ", " + obj.lecture_hours + ", " + obj.lab_hours + ", " + obj.credit_weight),
                print(obj.semesters_offered)
                print(obj.description)
                print("PREREQ: " + obj.prerequisite)
                print("\n")
                '''

                # Add to graph
                if check_object(obj) == True:
                    graph.add(obj, None)
                    
                
                if test_mode:
                    obj_list.append(obj)

    if test_mode:
        return obj_list 

    return graph




