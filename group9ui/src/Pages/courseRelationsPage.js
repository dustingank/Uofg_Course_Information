import { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from "react-router-dom";
import './graphPage.css';
import CourseRelations from "./CourseRelations.js";
import Modal from "react-modal"

const CourseRelationsPage = () => {
    let history = useHistory()
    // Will either be a section (e.g. CIS) or a specific course (e.g. CIS*3110)
    const { data } = useParams()
    const [isOpen, setIsOpen] = useState(false);
    const [courseData, setCourseData] = useState({});
    /**JSON object for filtered content */
    const [filterList, setfilterList] = useState([]);
 
    function openModal(json){
        setCourseData(json[0]);
        toggleModal();
    };

    function toggleModal() {
        setIsOpen(!isOpen);
    };

    // This function will add courses to the filter
    const addFilter = event => {
        event.preventDefault();
        let course = document.getElementById("filterInput").value;
        if (course) {
            setfilterList([
                ...filterList, course.toLowerCase()
            ]);
        }
        document.getElementById("filterInput").value = "";
    };

    // This function will clear the filter
    const clearFilters = event => {
        event.preventDefault();
        setfilterList([]); // Clear the list
    };

    return (
        <Fragment>
            <div className="CourseRelationsPage">
                <div className="MenuButtons">

                    <Link to="/">
                        <button className="btn" >Home</button>
                    </Link>

                </div>

                <div class="filter-container">
                    <form className="filterForm">
                        <label class="filterItem" htmlFor="Filter" id="filterLabel"> Filter Out: </label>
                        <input class="filterItem" type="text" id="filterInput"/>
                    </form>

                    <div className="filterButtons">
                        <button class="filterItem" onClick={clearFilters}> Clear Filter</button>
                        <button class="filterItem" onClick={addFilter}>Apply Filter</button>
                    </div>

                    <ul>
                        {filterList.map(item => (
                            <li class="filterItem">{item}</li>
                        ))}
                    </ul>
                </div>

                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="Course Info Display Modal"
                    className="infoModal"
                    overlayClassName="myOverlay"
                >

                    <div className="content">
                        <div className="item">
                            <div className="title"> {courseData.course_code}  {courseData.course_title}  {courseData.credit_weight} </div>

                            <div className="line">
                                <p className="label">Semesters offered:</p>
                                <p className="text"> {courseData.semesters_offered} </p>
                            </div>

                            <div className="line">
                                <p className="label">Lecture/Lab Hours:</p>
                                <p className="text"> ( {courseData.lecture_hours} , {courseData.lab_hours} ) </p>
                            </div>
                            <div className="description"> {courseData.description} </div>

                            <div className="line">
                                <p className="label">Prereqs:</p>
                                <p className="text"> {courseData.prerequisite} </p>
                            </div>
                            <div className ="line">
                                <p className="label">Capacity:</p>
                                <p className="text"> ( {courseData.available_capacity} / {courseData.max_capacity} ) </p> 
                            </div>
                            <div className="line">
                                <p className="label">Meetings info:</p>
                                <p className="text">{courseData.lecture_info}</p>
                                <p className="text">{courseData.lab_info}</p>
                                <p className="text">{courseData.sem_info}</p>
                                <p className="text">{courseData.exam_info}</p>
                            </div>
                        </div>
                    </div>

                </Modal>
                <div className="graphPage-content">
                    <CourseRelations
                        data={data} // Code for either a section or course
                        filter={filterList} // The list of courses to filter out
                        size={[1000, 500]} // Size of the graph (WXH)
                        parentCallback={openModal} // The function to trigger the modal
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default CourseRelationsPage