import { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './displayPage.css';
import Display from "../Components/Display/display.js"

const DisplayPage = (props) => {

    const location = useLocation();

    let hasData = false

    function EmptyDisplay(props) {
        return <h1> No data returned </h1>;
    }

    //Conditional Rendering for no data present
    function DisplayCheck() {
        if (location.state.courseData === undefined || location.state.courseData == 0) {
            hasData = false
            return false
        }
        hasData = true
        return true
    }
    
    DisplayCheck()
    
    
    

    return (
        <Fragment>

            <div className="MenuButtons">

                <Link to="/">
                    <button className="btn" >Home</button>
                </Link>

            </div>

            <div className="displayPage-content">
                <div className="displayPage-main">

                    <div className="row">

                        {hasData ? (location.state.courseData.map((x) => ( <div className="column"> <Display courseData={x} /> </div>))) : <EmptyDisplay />}                      
                    </div> 
                </div>
            </div>
        </Fragment>
        );
}

export default DisplayPage
