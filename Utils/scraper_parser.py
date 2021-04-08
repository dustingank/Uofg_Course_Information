from course_parse import parse
from course_parse import course_obj
import Graph
import re

def parse_scraped(graph):
  file = open('scrape_results.csv', 'r')

  for line in file:
    split_line = line.split(',')
    for node in graph.print_nodes():

      if node.course_code in split_line[0]:

        #Get the lab information from the string
        if "LAB" in split_line[2]:
          node.lab_info = (re.findall(r"((?=LAB)(.*?)(?=Room))", split_line[2]))[0][0]
        #Get the lecture info from the string
        if "LEC" in split_line[2]:
          node.lecture_info = (re.findall(r"((?=LEC)(.*?)(?=Room))", split_line[2]))[0][0]
        #Get the seminar info from the string
        if "SEM" in split_line[2]:
          node.seminar_info = (re.findall(r"((?=SEM)(.*?)(?=Room))", split_line[2]))[0][0]
        #Get the exam info from the string
        if "EXAM" in split_line[2]:
          node.exam_info = (re.findall(r"((?=EXAM)(.*?)(?=Room))", split_line[2]))[0][0]
        #Get the faculty and strip the trailing newline chars
        node.faculty = split_line[3].replace("\n", '')
        cap = split_line[1].split('/')
        node.available_capacity = node.available_capacity + int(cap[0].strip())
        node.max_capacity = node.max_capacity + int(cap[1].strip())

        print(node.to_string())

  file.close()
