#!/usr/bin/env python3
from display import print_data

class Course:

    def __init__(self, courseID, courseName, desc, creditWeight):
        self.course_code = courseID
        self.course_title = courseName
        self.description = desc
        self.offerings = ["W","F","S"]
        self.credit_weight = creditWeight
        self.lec_hours = "5"
        self.lab_hours = "3"
        self.restrictions = "none"
        self.departments = " Department of test"
        self.CoRequistes = " idek what this is"


def main():

    # Dummy data for tests
    testListOne = []

    testListTwo = []

    testListThree = []


    for i in range(100):
        testListTwo.append(Course("CIS*1500", "Intro to programming", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mauris felis, luctus ut mauris vitae, vulputate vulputate nulla. Maecenas quis justo mauris. Mauris at metus ac lorem scelerisque porttitor. Proin pulvinar purus at risus volutpat, vitae sagittis orci semper. Sed placerat iaculis lacus et ultrices. Nunc vulputate placerat sapien, vel fermentum magna convallis a. Maecenas ultrices lacinia ante pellentesque consequat. Duis a porttitor erat. Nulla ultricies urna nec imperdiet mattis. Curabitur turpis sapien, porttitor vitae tempus nec, commodo et neque. Pellentesque sagittis lacinia purus, non interdum felis ultrices eget. Vestibulum vel ante sodales, laoreet elit a, malesuada nibh. In eget.", str(i)) )

    for j in range(3):
        testListThree.append(Course("CIS*2750", "Test with three", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mauris felis,  ", str(j)))



####
#
# Tests for Displaying function
#
####
    # TestCase 1
    # input: nil
    # output: exception
    print("\nTest cases for displaying data: \n")

    print("\n********************************************Test Case 1********************************************\n")
    print("Print with a null list as input, exception should be raised.")
    try:
        print("Test case one: exception should be raised.")
        print_data(testListOne)
    except Exception as e:
        print("Test case passed exception caught: ")
        print(e)

    # testcase 2
    # input: 100 classes
    # output: all 100 classes
    print("\n********************************************Test Case 2********************************************\n")
    print("\n Print 100 course elements.")
    print_data(testListTwo)

    # testcase 3
    #  input: 1 Case
    # output: 1 case
    print("\n********************************************Test Case 3********************************************\n")
    print("Print 3 course elements.")
    print_data(testListThree)


####
#
# Tests for Searching
#
####



if __name__ == "__main__":
    main()