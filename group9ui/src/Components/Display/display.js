import React from 'react';
import { BrowserRouter as Link, useHistory } from "react-router-dom";
import './display.css';

export default function Display(props) {
 
      console.log(props.courseData)

      let history = useHistory()
      function navigate(code){
        console.log("Go to page " + code)
        history.push({
            pathname: `/relationGraph/${code}`
        })
    };
    
      return(
        <div className="content">
            <div className="item">
                
                <div className="title"> {props.courseData.course_code}  {props.courseData.course_title}  {props.courseData.credit_weight} </div>

                <div className ="line">
                    <p className="label">Semesters offered:</p> 
                    <p className="text"> {props.courseData.semesters_offered} </p>
                </div>

                <div className ="line">
                    <p className="label">Lecture/Lab Hours:</p>
                    <p className="text"> ( {props.courseData.lecture_hours} , {props.courseData.lab_hours} ) </p> 
                </div>
                <div className ="description"> {props.courseData.description} </div>
                   
                <div className ="line">
                    <p className="label">Prereqs:</p>
                    <p className="text"> {props.courseData.prerequisite} </p> 
                </div>
                <div className ="line">
                    <p className="label">Capacity:</p>
                    <p className="text"> ( {props.courseData.available_capacity} / {props.courseData.max_capacity} ) </p> 
                </div>
                <div className="line">
                    <p className="label">Meetings info:</p>
                    <p className="text">{props.courseData.lecture_info}</p>
                    <p className="text">{props.courseData.lab_info}</p>
                    <p className="text">{props.courseData.sem_info}</p>
                    <p className="text">{props.courseData.exam_info}</p>
                  </div>
                  <div className="line">
                      <p className="label">Faculty:</p>
                      <p className="text"> {props.courseData.faculty} </p>
                  </div>
                  <div className="filterButtons graphBtn">

                <button onClick={() => navigate(props.courseData.course_code)}>Graph Relation's</button>
                </div>
            </div>

        </div>
      );
}