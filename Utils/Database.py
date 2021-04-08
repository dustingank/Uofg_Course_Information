import mysql.connector
from Graph import Graph
from course_parse import course_obj

class Database():


    # creates the DB table if it does not exits
    def create():

        # connect to the DB
        mydb = mysql.connector.connect(
            host="localhost",
            user="sysadmin",
            database="Classes"
        )
        myCursor = mydb.cursor()


        # THE ID IS THE PRIMARY KEY FOR NOW.
        sql_create = "CREATE TABLE IF NOT EXISTS Courses (id INT AUTO_INCREMENT PRIMARY KEY, course_title VARCHAR(255), course_code VARCHAR(255), semesters_offered VARCHAR(255), lecture_hours VARCHAR(255), lab_hours VARCHAR(255), credit_weight VARCHAR(255), description TEXT, prerequisite VARCHAR(255), max_capacity VARCHAR(50), available_capacity VARCHAR(50), lab_info VARCHAR(255), lecture_info VARCHAR(255), seminar_info VARCHAR(255), exam_info VARCHAR(255), faculty VARCHAR(255))"

        myCursor.execute(sql_create)
        mydb.commit()

    # populates our db table with the data we have stored in our data structure. 
    def insert(graph):
        # connect to the DB
        mydb = mysql.connector.connect(
            host="localhost",
            user="sysadmin",
            database="Classes"
        )
        myCursor = mydb.cursor()

        # get the courses out of the graph and into a string
        courses = Graph.print_nodes(graph)

        for course in courses:
            #convert into dictionairy so i can use .join on all the keys
            course_dict = course_obj.to_dict(course)


            placeholders = ', '.join(['%s'] * len(course_dict))
            columns = ', '.join(course_dict.keys())

            # genereate the sql insert query
            sql = "INSERT INTO Courses ( %s ) VALUES ( %s )" % (columns, placeholders)

            # executes the SQL query and fills in the place holder values. 
            myCursor.execute(sql, list(course_dict.values()))

        #commits and saves the db    
        mydb.commit()

    def updateAll(graph):
        #conncet to the db with require credentials
        mydb = mysql.connector.connect(
            host="localhost",
            user="sysadmin",
            database="Classes"
        )
        myCursor = mydb.cursor()
        #get all the courses in the graph
        courses = Graph.print_nodes(graph)

        for course in courses:
            course_dict = course_obj.to_dict(course)
            #concert the semesters offered to a string
            semOffered = ','.join(course.semesters_offered)

            #Update the entries based on thier course codes
            sql = "UPDATE Courses SET faculty = %s, lab_info = %s, lecture_info = %s, seminar_info = %s, exam_info = %s, course_title = %s, course_code = %s, semesters_offered = %s, lecture_hours = %s, lab_hours = %s, credit_weight = %s, description = %s, prerequisite = %s, max_capacity = %s, available_capacity = %s WHERE course_title = %s"
            myCursor.execute(sql, (course.faculty, course.lab_info, course.lecture_info, course.seminar_info, course.exam_info, course.course_title, course.course_code, semOffered, course.lecture_hours, course.lab_hours, course.credit_weight, course.description, course.prerequisite, course.max_capacity, course.available_capacity ,course.course_title))
        mydb.commit()
        #Testing purposes
        #myCursor.execute("SELECT * FROM Courses WHERE course_code = 'CIS*2750'")
        #myres = myCursor.fetchone()
        #for x in myres:
            #print(x)


