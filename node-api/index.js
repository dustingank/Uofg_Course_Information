const express = require('express');
const cors = require('cors');
var mysql = require('mysql');

const app = express();
const port = 443;

app.use(cors({ origin: 'http://cis4250-09.socs.uoguelph.ca'}));

//MySQL login credentials.
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "Classes"
});

//Connects to database and queries for all courses.
function queryDB(fn) {

    con.query("SELECT course_code FROM Courses", function (err, result, fields) {
        if (err) throw err;
        console.log(result[1]);
        
        fn(result);
        
    });
}


app.get('/', (req, res) => {
    res.send("Hit endpoint");
});

// An endpoint that returns all courses.
app.get('/courses', (req, res) => {

    queryDB(function(courses) { 

        console.log(courses);

        res.send(`${JSON.stringify(courses)}\n`);
        
    });

});

// An endpoint that returns your search query string. Likely will become a POST method.
app.get('/search/:search_request', (req, res) => {

    const search = req.params.search_request;

    res.send(`You searched for: ${search}\n`);
});

// An endpoint that returns courses related information based on a given course prefix. E.g. CIS
app.get('/relationGraph/:coursePre', function(req, res) {

    var coursePrefix = req.params.coursePre;
    console.log(coursePrefix)

    con.query(`select * from Courses where course_code like '%${coursePrefix}%'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });

});

app.get('/prefixCount', function(req, res) {

    con.query(`select substr(course_code, 1, length(course_code)-5) as prefix, count(*) as prefix_count from Courses group by substr(course_code, 1, length(course_code)-5) order by 2 desc`, function (err, result, fields) {
        if (err) throw err;
        res.send(`${JSON.stringify(result)}\n`);
    });

});

// An endpoint that builds and executes a search query baised on the input given, if no additionial input is given i believe it will search everything.
app.get('/searchDB', (req, res) => {

    let queryStr = "select * from Courses "
    let length = Object.keys(req.query).length
    let i = 0;

    for (const property in req.query){
        

        if (req.query[property] != ""){
            
            if( i==0 ) {

                queryStr = queryStr.concat("WHERE ")

            }
            else if (( i != length-1 )){

                queryStr = queryStr.concat(" AND ")

            }

            prop = req.query[property];
            if (property == "available_capacity" ){
                if (prop == "FULL"){
                    // return where 0 = available_available_capacity

                    queryStr = queryStr.concat(`${property} = 0`);
                    // if this does not work try messing with the %
                    // queryStr = queryStr.concat(`${property} = '0'`);
                    // queryStr = queryStr.concat(`${property}=0`);
                }
                else if (prop == "OPEN"){
                    // return where 0<available_available_capacity
                    queryStr = queryStr.concat(`${property} > 0`);
                }
                else{
                    queryStr = queryStr.concat(`${property} >= 0`);
                }
                // if it is ALL then nothing will be appeneded
            }
            else{
                queryStr = queryStr.concat(`${property} LIKE '%${prop}%'`);
            }

            i++;
            
        }

    }

    queryStr = queryStr.concat(` ORDER BY course_code`);

    console.log(queryStr)

    con.query(queryStr, function (err, result, fields) {
         if (err) throw err;
         res.status(200).send(result);
    });

});

app.listen(port, () => console.log(`Node API listening on port ${port}!`));