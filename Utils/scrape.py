import re
from selenium import webdriver
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver import FirefoxOptions
from selenium.webdriver.firefox.options import Options
import time
import csv

class scrape():
    def mainRunner():
        opt = FirefoxOptions()
        opt.add_argument("--headless")
        opt.add_argument("marionette.actors.enabled=true")
        opt.log.level = "trace"
        driver = webdriver.Firefox(executable_path=r'/home/sysadmin/w21cis4250team9/Utils/geckodriver', firefox_options=opt, service_args=["--marionette-port", "2828"])

        # gets the website
        driver.get('https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor?TOKENIDX=6639831883&CONSTITUENCY=WBST&TYPE=M&PID=CORE-WBMAIN')

    #                               #
    # open search page and search's #
    #                               #

    # finds  and clicks the student button

    #studentBtn = driver.find_element_by_xpath('/html/body/div[4]/div/div[2]/div/div[1]/ul/li[2]/a')
    #studentBtn.click()

        driver.implicitly_wait(5)

        driver.find_element_by_xpath('/html/body/div[4]/div/div[2]/div/div[1]/ul/li[2]/a').click()

    # give it some time to load
        driver.implicitly_wait(2)

    #finds and clicks the search for section button
    #studentBtn = driver.find_element_by_xpath('/html/body/div[3]/div/div[2]/div/ul[1]/li/a')
    #studentBtn.click()
        driver.find_element_by_xpath('/html/body/div[3]/div/div[2]/div/ul[1]/li/a').click()

    # give it some time to load
        driver.implicitly_wait(2)

    # populates the term and location field

    # finds the term 
        selectField = Select(driver.find_element_by_xpath('//*[@id="VAR1"]'))

    # selects the term value -?
        selectField.select_by_value("W21")

    # finds and selects the Location
        selectField = Select(driver.find_element_by_xpath('//*[@id="VAR6"]'))
        selectField.select_by_value("G")

    # finds and clicks the search button
        searchBtn = driver.find_element_by_xpath('/html/body/div[3]/div/div[1]/div[3]/form/div/input')
        searchBtn.click()


    # give it some time to load and search
        driver.implicitly_wait(30)
        time.sleep(35)

    #                       #
    # scrape the page       #
    #                       #

    # makes sure page is loaded before handing over to soup
        try:
            WebDriverWait(driver, 20).until(EC.visibility_of_element_located((By.XPATH, "/html/body/div[3]/div/div[1]/div[3]/form/table/tbody/tr/td/div/table/tbody/tr[2]/td/div/table/tbody")))
        except TimeoutException:
            print ("page couldnt load for some reason")


    ##Grab all the course slot information
        rows = driver.find_elements_by_xpath('//p[contains(@id,"LIST_VAR5_")]')
    ##Grab all the course codes
        course = driver.find_elements_by_xpath('//a[contains(@id,"SEC_SHORT_TITLE_")]')

    ##Grab all the course meeting information
        meeting = driver.find_elements_by_xpath('//td[contains(@class,"SEC_MEETING_INFO")]')
    ##Grab all the faculty information
        faculty = driver.find_elements_by_xpath('//p[contains(@id,"SEC_FACULTY_INFO")]')

    ##Clean the meeting string s of their line ending
        meeting_strings = []
        for meet in meeting:
            meeting_strings.append(meet.text.replace('\n', ' ').replace(',', ' '))
            
    #create a dictionary out of the course code and available seats data
        course_space = []
    ##TODO: Edit the Meeting string to better show the data in their own tuples
        for course_code, seats, meet, faculty in zip(course, rows, meeting_strings, faculty):
            course_space.append([re.findall(r"([A-Z]+\*[0-9]+)+", course_code.text)[0], seats.text, meet, faculty.text])


    # opens a file to write to, writing to a csv with CourseCode,Seats data style
        with open("scrape_results.csv","w") as csv_file:
            writer = csv.writer(csv_file)
             
            for entry in course_space:
                writer.writerow(entry)

    # close file
        csv_file.close()

    # stops the scrape
        driver.close()