from Graph import Graph
from course_parse import parse
from course_parse import course_obj
from scraper_parser import parse_scraped
from Database import Database
from scrape import scrape

def main():
    #run the scrape -- CURRENTLY BROKEN
    ##scrape.mainRunner()

    # parse the information and loads it into datastructure
    graph = parse(0)
    parse_scraped(graph)

    # Will update all rows based on the generated graph
    print("Updating Courses.....")
    Database.updateAll(graph)
    print("Finished updating Courses!")
if __name__ == "__main__":
    main()
