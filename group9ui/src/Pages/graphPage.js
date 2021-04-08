import { useEffect, useState, Fragment, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import './graphPage.css';
import BarChart from './BarChart';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { filter, interpolateMagma } from 'd3';



const GraphPage = function(){
    /**JSON object for filtered content */
    const[input, setInput] = useState('');
    const[filterList, setfilterList] = useState([]);

    const addFilter = event => {
        event.preventDefault();
        setfilterList([
            ...filterList,
            {
                id: filterList.length,
                prefix: input
            }
        ]);
        setInput("");
    };
    
    const dataEntry=[]

    const clearFilters = event  => {
        event.preventDefault();
        setfilterList([
            filterList.length = [],
        ]);
    };

    let history = useHistory()
    function callBack(prefix){
        console.log("Go to page " + prefix)
        history.push({
            pathname: `/relationGraph/${prefix}`
        })
    };
    return (
        <Fragment>
            <div className="graphPage">
                
                <div className="MenuButtons">

                    <Link to="/">
                        <button className="btn" >Home</button>
                    </Link>

                </div>

                <div class="filter-container">
                    <form className="filterForm">
                        <label htmlFor="Filter" id="filterLabel"> Filter Out: </label>
                        {/** Users can enter a course prefix to remove from the bar chart */}
                        <input type="text" value={input} id="filterInput" onChange={e => setInput(e.target.value)}/>
                    </form>

                    <div className="filterButtons">
                        <button onClick={clearFilters}> Clear Filters</button>
                        <button onClick={addFilter}>Apply Filters</button>
                    </div>

                    <ul>
                        {filterList.map(item => (
                            <li key={item.id} class="filterItem">{item.prefix}</li>
                        ))}
                    </ul>
                </div>
                <div className="graphPage-content">
                    
                    <div>
                        {/* might need to add something here to re-render the graph?*/}
                        {console.log("filter list: ",filterList)} 
                        <BarChart data={dataEntry}
                            size={[5000, 800]}
                            filterList={filterList}
                            //top, bottom, left, right
                            margins={[50, 50, 50, 25]}
                            parentCallback = {callBack}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}




export default GraphPage
