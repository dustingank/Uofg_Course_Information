
import { useState, Fragment } from 'react';
import './homePage.css';
import SearchPage from "./Pages/searchPage.js";
import DisplayPage from "./Pages/displayPage.js";
import GraphPage from "./Pages/graphPage.js";
import CourseRelationsPage from "./Pages/courseRelationsPage.js"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import profileSym from './guy.png';



export default function MainPage() {

    return (
        <Router>
            <div className="homePage">
                <header className="homePage-header">
                    <p>
                        Group 9: Guelph Course Visualiser
                    </p>
                </header>

                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/search">
                        <SearchPage />
                    </Route>
                    <Route exact path="/display">
                        <DisplayPage />
                    </Route>
                    <Route exact path="/graph">
                        <GraphPage />
                    </Route>
                    <Route exact path="/relationGraph/:data">
                        <CourseRelationsPage />
                    </Route>
                </Switch>

            
            </div>

            <div className="footer">

                    <div className="footerTitle">
                        Our Team
                    </div>

                    <div className="teamProfiles">

                        <div className="profile">

                            <img src={profileSym}/>

                            <div className="profileInfo">Jacob Vink</div>
                            <div className="profileInfo">0963050</div>
                            <div className="profileInfo">vinkj@uoguelph.ca</div>

                        </div>

                        <div className="profile">

                            <img src={profileSym}/>

                            <div className="profileInfo">Clayton Darlington</div>
                            <div className="profileInfo">0963286</div>
                            <div className="profileInfo">darlingc@uoguelph.ca</div>

                        </div>

                        <div className="profile">

                            <img src={profileSym}/>

                            <div className="profileInfo">Ozair Ashfaq</div>
                            <div className="profileInfo">0936757</div>
                            <div className="profileInfo">oashfaq@uoguelph.ca</div>

                        </div>

                        <div className="profile">

                            <img src={profileSym}/>

                            <div className="profileInfo">Joshua Pripic</div>
                            <div className="profileInfo">0971107</div>
                            <div className="profileInfo">jprpic@uoguelph.ca</div>

                        </div>

                        <div className="profile">

                            <img src={profileSym}/>

                            <div className="profileInfo">Austin Bailie</div>
                            <div className="profileInfo">0963370</div>
                            <div className="profileInfo">abailie@uoguelph.ca</div>

                        </div>

                        <div className="profile">

                            <img src={profileSym}/>

                            <div className="profileInfo">Yizhou Wang</div>
                            <div className="profileInfo">1013411</div>
                            <div className="profileInfo">wang15@uoguelph.ca</div>

                        </div>



                    </div>
                </div>
        </Router>

    );

}

const HomePage = () => {

    const [showSearch, setSearch] = useState(false);

    return (
        <Fragment>
            <div className="homePage-content">
                <div className="MenuButtons">

                    <Link to="/search" >
                        <button className="btn" >Search Courses</button>
                    </Link>
                    
                    <Link to="/graph">
                        <button className="btn" >Graph Courses</button>
                    </Link>

                </div>

                <div className="homePage-description">
                    <p>
                        Hello and welcome to our University of Guelph Course Visualiser website! <br></br><br></br> Through this website you will be able to search through all the courses that the University provides!
                        You will have the option to view the searched courses directly or to see the coursed displayed on a graph. <br></br><br></br> To get started please click the buttons above to enter our webapp.
                    </p>
                    
                </div>



            </div>
        </Fragment>
    );
}

