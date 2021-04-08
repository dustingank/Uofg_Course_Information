# Sprint 9

** Setup **
Currently the website can be accesed through the URL `http://cis4250-09.socs.uoguelph.ca`. Alternitvely the same Setup steps can be used from sprint 5. These steps are doccumented below.

# Sprint 8

** Setup **
Currently the website can be accesed through the URL `http://cis4250-09.socs.uoguelph.ca`. Alternitvely the same Setup steps can be used from sprint 5. These steps are doccumented below.

# Sprint 7

** Setup **
Currently the website can be accesed through the URL `http://cis4250-09.socs.uoguelph.ca:5000/`. Alternitvely the same Setup steps can be used from sprint 5. These steps are doccumented below.

# Sprint 5

**Setup**
Make sure the api is up and running before starting the electron app or the web app. To start the api, from the node-api directory:
`npm run start`

**Installation instructions for electron**
For a development version of the electron application, run the following from the group9ui directory:
`npm run start`
The application will launch automatically.


Currently electron does not launch on the provided servers due to missing chromium libraries.

To install a production version of the electron application you need to run the build script on your system. From the group9ui directory enter and run:
`npm run build`
This will create a dist folder inside the project directory containing the desktop application for your specific operating system. Following the standard Os specific installation process will install the application on your device. The application is named:
`group9ui`

**Accessing the web application**
To run the web application, run the following from the group9ui directory command for developer access:
`npm run react-start`
This will start a development server for the web application.

To create and run a production build, do the following from the group9ui directory:
`npm run react-build`
`node_modules/.bin/serve -s build`

This will launch a production verison that is accessible at port 5000


# Sprint 3

**How to run the main application and visualize the output:**

Install Dependencies:
- `pip install -U selenium`
- `pip install beautifulsoup4`
- Firefox Web Browser

Export the path to the gecko-driver in sprint3 (Below for MacOS):
- `export PATH=$PATH:/path/to/geckodriver/in/sprint3`

*Note* Must use Firefox browser.

Our project can be run throught the terminal to generate the .CSV file consisting of the web scraped data.
 1. Open our project file in the terminal
 2. Navagate to our root directory '/sprint-3/'
 3. run: ```py main_sprint3.py```
 4. Take the output file named ```testSize.gexf``` and input it into Gephi

**How to use the main application:**
 1. Follow the on screen prompt and enter either a valid course prefix (ex,'cis', 'phys', etc...) or nothing to get all courses. Once it is complete a file called ```scrape_results.csv``` and ```testSize.gexf``` will be produced.
 2. Take the GEFX fle and input it into Gephi.

**How to run tests:**
Our tests can be run through the terminal.  
  1. Open our project file in the terminal
  2. Navagate to our root directory '/sprint-3/'
  3. run: ```py scrape_test.py```, ```py testToGEFXSplit.py ```

Our project can be run throught the terminal to generate the .CSV file consisting of the web scraped data.
 1. Open our project file in the terminal
 2. Navagate to our root directory '/sprint-3/'
 3. run: ```py main_sprint3.py```
 4. Take the output file named ```testSize.gexf``` and input it into Gephi

**How to use the main application:**
 1. Follow the on screen prompt and enter either a valid course prefix (ex,'cis', 'phys', etc...) or nothing to get all courses. Once it is complete a file called ```scrape_results.csv``` and ```testSize.gexf``` will be produced.
 2. Take the GEFX fle and input it into Gephi.

**How to run tests:**
Our tests can be run through the terminal.  
  1. Open our project file in the terminal
  2. Navagate to our root directory '/sprint-3/'
  3. run: ```py scrape_test.py```, ```py testToGEFXSplit.py ```


# Sprint 2

**How to run the main application and visualize the output:**
  Our project can be run throught the terminal to generate the .gexf file then that can be put into Gephi to visualize the data.  
  1. Open our project file in the terminal
  2. Navagate to our root directory '/sprint-2/'
  3. run: ```py main_sprint2.py```
  4. Take the output file named ```testSize.gexf``` and input it into Gephi


  **How to use the main application:**  
  1. Follow the on screen prompt and enter either a valid course prefix (ex,'cis', 'phys', etc...) or nothing to get all courses
  2. If you choose to not create a file enter 'exit' or 'quit' to leave without generating a file


  **How to run tests:**
  Our tests can be run through the terminal.  
  1. Open our project file in the terminal
  2. Navagate to our root directory '/sprint-2/'
  3. run: ```py ToGefx.py```, ```python -m unittest```, or ```py testGraph.py```

# Sprint 1

**Assumptions:**
  The only assumption we made about our project this sprint was that we were able to dicard revisions in the TXT file.


**Limitations:**
Our project has a few limitations when it comes to information however the main elements of each course are present. 

We did not parse or store course information relating to:
- departments
- pre-requisites
- Restrictions
- CoRequistes

**How to run main application:**
Our project can be run through the terminal. 
1. Open our project file in the terminal
2. Navagate to our root directory '/sprint-1/'
3. run: ```py main.py```


**How to run tests:**
Our tests can be run through the terminal. 
1. Open our project file in the terminal
2. Navagate to our root directory '/sprint-1/'
3. run: ```py testGraph.py```, ```py testParser.py```, ```py testSearch.py``` or ```py testSearchAndDisplay.py```

**How to use:**
1. Follow the on screen prompt and enter either "1" or "2" to view courses
2. For option 1: Type in your search query for example "Does cis*1500 have a fall offering?" or "Show me all 0.25 credit courses"
3. or for option 2 select one of our pre build search queries for easy access. 
4. To exit type 'quit" or 'exit'

**How to use the dynamic search:** 
With how we implemented our query system there are a few rules/syntax we need to follow to guarantee the correct results.
The following formats are to be followed depending on what keyword you are searching for:

**Course Titles:** _course title \"\<name of course\>\"_, e.g. _Show me course title \"Software Design V\"_

**Course Codes:** _\<course code\>_, e.g. _Show me MATH*4310_

**Semesters Offered:** _\<Season[Summer|Fall|Winter]\> offerings_, e.g. _Show me all summer offerings_

**Lecture Hours:** _\<#\> lecture hours_, e.g. _Show me courses with 3 lecture hours_

**Lab Hours:** _\<#\> lab hours_, e.g. _Show me courses with 3 lab hours_

**Credit Weight:** _\<credit amount\> credits_, e.g. _Show me courses with 0.25 credits_

**Description:** _about \"\<string of interest\>\"_, e.g. _Show me courses about "Scottish History"_

**Section:** _\"\<section abbreviation\>\" courses_, e.g. _Show me "CIS" courses_


