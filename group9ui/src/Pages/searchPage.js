import { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import './searchPage.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Weight from "../Components/Search/Weight/weight.js"
import Capacity from "../Components/Search/Capacity/capacity.js"
import Semesters from "../Components/Search/Semesters/semesters.js"
import Department from "../Components/Search/Department/departments.js"
import MeetingTime from '../Components/Search/MeetingTime/meetingTime';

const SearchPage = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            background: 'linear-gradient(45deg, rgba(250,22,2,1) 0%, rgba(0,0,1,1) 33%, rgba(194,181,41,1) 100%)',
            border: 0,
            borderRadius: 3,
            color: 'white',
            padding: '0 30px',
            '&:hover': {
                background: '#575551',
                borderColor: '#0062cc',
                boxShadow: 'none',
              },
            '&:focus': {
                boxShadow: 'none',
                background: '#575551',
                borderColor: '#white',
              },
        },
      }));
    
    const classes = useStyles();
    const[showWeight, setWeightComp] = useState(false);
    const[showSem, setSem] = useState(false);
    const[showDepartment, setDepartmentComp] = useState(false);
    const[showTitle, setTitle] = useState(false);
    const[showCode, setCode] = useState(false);
    const[showPrequisite, setPre] = useState(false);
    const[showDescription, setDes] = useState(false);
    const[showCapacity, setCap] = useState(false);
    const[showMeetingTime, setMeet] = useState(false);
    const[showProf, setProf] = useState(false);

    const[courseCode, setCourseCode] = useState('');
    const[courseTitle, setCourseTitle] = useState('');
    const[department, setDepartment] = useState('');
    const[weight, setWeight] = useState('');
    const[capacity, setCapacity] = useState('');
    const[prequisite, setPrequisite] = useState('');
    const[description, setDescription] = useState('');
    const[location, setLocation] = useState('');
    const[meetingType, setMeetingType] = useState('');
    const[meetingDay, setMeetingDay] = useState('');
    const[startTime, setStartTime] = useState('');
    const[endTime, setEndTime] = useState('');
    const[faculty, setFaculty] = useState('');

    const history = useHistory();

    function searchByOption() {
        
        const responseOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            
        };

        var meetingTime = '';
        if (startTime !== ''){
            meetingTime = `${startTime}`;
            if (endTime !== ''){
            meetingTime = meetingTime + ` - ${endTime}`;
                if (location !== ''){
                    meetingTime = meetingTime + ` ${location}`;
                }
            }
        }

        if(meetingDay !== ''){
            meetingTime = meetingDay + ` ${meetingTime}`;
        }else if(meetingTime === '' && endTime !== ''){
            meetingTime = `${endTime}`;
            if (location !== ''){
                meetingTime = meetingTime + ` ${location}`;
            }
        }

        if(meetingTime === '' && location !== ''){
            meetingTime = `${location}`
        }
        
        if (meetingType === 'LEC'){
            meetingTime = 'lecture_info=' + meetingTime;
        }else if(meetingType === 'LAB'){
            meetingTime = 'lab_info=' + meetingTime;
        }else if(meetingType === 'SEM'){
            meetingTime = 'seminar_info=' + meetingTime;
        }else if(meetingType === 'EXAM'){
            meetingTime = 'exam_info=' + meetingTime;
        }else{
            meetingTime = 'lecture_info=' + meetingTime + '&lab_info=' + meetingTime + '&seminar_info=' + meetingTime + '&exam_info=' + meetingTime;
        }

        const url = `http://cis4250-09.socs.uoguelph.ca:443/searchDB?course_code=${department}*${courseCode}&course_title=${courseTitle}&credit_weight=${weight}&prerequisite=${prequisite}&description=${description}&faculty=${faculty}&available_capacity=${capacity}&${meetingTime}`;

        console.log(url);        
        
        fetch(url, responseOptions)
            .then(response => response.json())
            .then((json) => {
                console.log(json);

                history.push({
                    pathname: '/display',
                    state: {courseData: json}
                });
            });
    }

    return (
        <Fragment>
            
            <div className="searchPage">

                <div className="MenuButtons">

                    <Link to="/">
                        <button className="btn" >Home</button>
                    </Link>

                </div>

                <div className="searchPage-content">
                    <div className="searchPage-description">
                        Please enter in your search string below or click on the buttons below to indicate what specific fields you want to search by.<br></br> Multiple options can be selected. 
                    </div>
                    <div className="search">
                        <label htmlFor="search"> Search String: </label>
                        <input type="text"/>
                    </div>

                    {/* These buttons will show the coresponding search UI Components */}
                    
                    <div className="btnSearchOptions">

                        <ButtonGroup className="btnGroup" aria-label="contained button group">
                            <Button onClick={() => setTitle(!showTitle)} >Course Title</Button>
                            <Button onClick={() => setCode(!showCode)}>Course Code</Button>
                            <Button onClick={() => setWeightComp(!showWeight)}>Course Weight</Button>
                            <Button onClick={() => setSem(!showSem)}>Semesters Offered</Button>
                            <Button onClick={() => setDepartmentComp(!showDepartment)}>Department</Button>
                            
                        </ButtonGroup>

                        <ButtonGroup className="btnGroup" aria-label="contained button group">

                            <Button onClick={() => setPre(!showPrequisite)}>Prerequisite</Button>
                            <Button onClick={() => setDes(!showDescription)}>Course Description</Button>
                            <Button onClick={() => setCap(!showCapacity)}>Course Capacity</Button>                   
                            <Button onClick={() => setMeet(!showMeetingTime)}>Meeting Times</Button>              
                            <Button onClick={() => setProf(!showProf)}>Course Professor</Button>

                        </ButtonGroup>

                    </div>

                    <div>
                        {showTitle ? 
                            <div style={{marginTop: "15px"}}>
                                <label htmlFor="search"> Course Title: </label>
                                <input type="text" id="courseTitleInput" onChange={event => setCourseTitle(event.target.value)}/>
                            </div> : null }
                        {showCode ? 
                            <div style={{marginTop: "15px"}}>
                                <label htmlFor="search"> Course Code: </label>
                                {/** on any change to the courseCode input, set the courseCode to this textfields value */}
                                <input type="text" id="courseCodeInput" onChange={event => setCourseCode(event.target.value)}/>
                            </div> : null }
                        {showPrequisite ?
                            <div style={{marginTop: "15px"}}>
                                <label htmlFor="search">Prerequisite: </label>
                                <input type="text" id="prerequisiteInput" onChange={event => setPrequisite(event.target.value)}/>
                            </div>:null}
                        {showDescription ?
                            <div style={{marginTop: "15px"}}>
                                <label htmlFor="search">Course Description: </label>
                                <input rows={4} type="text" id="courseDescription" onChange={event => setDescription(event.target.value)}/>
                            </div>:null}
                        {showWeight ? <Weight setWeight={setWeight} weight={weight}/> : null }
                        {showSem ? <Semesters /> : null }
                        {showDepartment ? <Department setDepartment={setDepartment} department={department} /> : null }
                        {showCapacity ? <Capacity setCapacity={setCapacity} capacity={capacity}/> : null }
                        {showMeetingTime ? <MeetingTime 
                                                setLocation={setLocation} 
                                                location={location} 
                                                setMeetingType={setMeetingType} 
                                                meetingType={meetingType} 
                                                setMeetingDay={setMeetingDay} 
                                                meetingDay={meetingDay} 
                                                setStartTime={setStartTime} 
                                                startTime={startTime}
                                                setEndTime={setEndTime} 
                                                endTime={endTime}
                                            /> : null }
                        {showProf ?
                            <div style={{ marginTop: "15px" }}>
                                <label htmlFor="search">Professor: </label>
                                <input type="text" id="professorInput" onChange={event => setFaculty(event.target.value)} />
                            </div> : null}
                    </div>

                    {/* use the search data to generate a query that is passed in the URL */}
                    
                    <button className="btnSearch" onClick={() => searchByOption()}>Search</button>
                    
                
    
                </div>
            </div>
        </Fragment>
        );
}

export default SearchPage
