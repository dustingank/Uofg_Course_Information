
from colorama import init, Fore, Back, Style
init()

# function will be called in other files
def print_data(myList):

    # some error checking for good mesure
    if myList is None or (not myList):
        raise ValueError('An empty list was passed in. Nothing to print')
    
    # loops through list of objects and prints them out
    for obj in myList:

        print( Fore.CYAN + "\n***********************************")
        print(Style.RESET_ALL)
        print( Fore.GREEN + Style.BRIGHT + "Code: "+ Style.RESET_ALL + obj.course_code +","+ Fore.GREEN + Style.BRIGHT + " Title: "+ Style.RESET_ALL + obj.course_title + ","+ Fore.GREEN + Style.BRIGHT + " Credits: " + Style.RESET_ALL + obj.credit_weight )
        print( Fore.GREEN + Style.BRIGHT + "Semesters Offered:", end=" ")
        print(Style.RESET_ALL, end="")
        print( obj.semesters_offered)
        print( Fore.GREEN + Style.BRIGHT + "Lecture/Lab Hours: " + Style.RESET_ALL + "(" +  obj.lecture_hours + "," + obj.lab_hours + ")")
        print( Fore.GREEN + Style.BRIGHT +"Course Description: " + Style.RESET_ALL + obj.description)
        print(Style.RESET_ALL)
        