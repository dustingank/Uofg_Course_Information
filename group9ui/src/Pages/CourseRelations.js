import React, { Component, useState } from 'react'
//import './CourseRelations.css'
import * as d3 from 'd3'

/**
 * React component for graph for course relations
 */
class CourseRelations extends React.Component {
    constructor(props) {
        super(props)
        this.drawChart = this.drawChart.bind(this)

        this.state = {
            change: false
        };
    }

    // This function will build the original graph
    componentDidMount() {
        // This will be used to get course codes
        var re = "([A-Z]{3,5}\\*[0-9]+)";

        const responseOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            
        };
        // This will be used to identify if the graph needs to be for an entire
        // section, or just for a subset of courses
        if (this.props.data.search(re) != -1) {
            fetch(`http://cis4250-09.socs.uoguelph.ca:443/relationGraph/${this.props.data}`, responseOptions)
                .then(response => response.json())
                .then((json) => {
                    let nodes = [];
                    let links = [];
                    let temp = "";
                    // This loop will build the list of nodes and linls
                    json.forEach(element => {
                        temp = JSON.stringify({ "id": element.course_code.trim() })
                        if (!nodes.includes(temp)) {
                            nodes.push(JSON.stringify({ "id": element.course_code.trim() }));
                        }
                        let prereqs = element.prerequisite.trim().split(",")
                        // Create nodes for the prerequisites as well whenever they exist
                        if (prereqs[0] !== "NONE") {
                            prereqs.forEach(prereq => {
                                temp = JSON.stringify({ "id": prereq.trim() })
                                if (!nodes.includes(temp)) {
                                    nodes.push(JSON.stringify({ "id": prereq.trim() }));
                                }
                                links.push({ "source": element.course_code.trim(), "target": prereq.trim() });
                            })
                        }
                    });

                    let objectNodes = []
                    nodes.forEach(element => {
                        objectNodes.push(JSON.parse(element));
                    });
                    // Call the graph creation method
                    this.drawChart(objectNodes, links, this.props.parentCallback);
                });
        } else {
            // This block follows the same pattern as above but now is used to build
            // the nodes and links for a subgraph.
            fetch(`http://cis4250-09.socs.uoguelph.ca:443/relationGraph/${this.props.data}`, responseOptions)
                .then(response => response.json())
                .then((json) => {
                    let nodes = [];
                    let links = [];
                    let temp = "";
                    json.forEach(element => {
                        temp = JSON.stringify({ "id": element.course_code.trim() })
                        if (!nodes.includes(temp)) {
                            nodes.push(JSON.stringify({ "id": element.course_code.trim() }));
                        }
                        let prereqs = element.prerequisite.trim().split(",")
                        if (prereqs[0] !== "NONE") {
                            prereqs.forEach(prereq => {
                                temp = JSON.stringify({ "id": prereq.trim() })
                                if (!nodes.includes(temp)) {
                                    nodes.push(JSON.stringify({ "id": prereq.trim() }));
                                }
                                links.push({ "source": element.course_code.trim(), "target": prereq.trim() });
                            })
                        }
                    });

                    let objectNodes = []
                    nodes.forEach(element => {
                        objectNodes.push(JSON.parse(element));
                    });
                    this.drawChart(objectNodes, links, this.props.parentCallback);
                });
        }
    }

    // This function triggers whenever new information is present that must be
    // displayed.
    UNSAFE_componentWillUpdate(prevProps) {
        // Determine if the filter has been updated
        if (JSON.stringify(this.props.filter) !== JSON.stringify(prevProps.filter)) {
            this.state.change = true;
            document.getElementById("graph-svg").innerHTML = "";
        }

        const responseOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            
        };

        // If the filter has been updated then rebuild the graph.
        if (this.state.change == true) {
            let filterList = prevProps.filter;
            console.log("Courses to be filtered: ");
            console.log(filterList);
            fetch(`http://cis4250-09.socs.uoguelph.ca:443/relationGraph/${this.props.data}`, responseOptions)
                .then(response => response.json())
                .then((json) => {
                    let nodes = [];
                    let links = [];
                    let temp = "";
                    json.forEach(element => {
                        // Filter out nodes that the user does not want to see.
                        if (!(filterList.includes(element.course_code.trim().toLowerCase()))) {
                            temp = JSON.stringify({ "id": element.course_code.trim() })
                            if (!nodes.includes(temp)) {
                                nodes.push(JSON.stringify({ "id": element.course_code.trim() }));
                            }
                            let prereqs = element.prerequisite.trim().split(",")
                            if (prereqs[0] !== "NONE") {
                                prereqs.forEach(prereq => {
                                    // Filter prereqs that match any filtered courses
                                    if (!(filterList.includes(prereq.trim().toLowerCase()))) {
                                        temp = JSON.stringify({ "id": prereq.trim() })
                                        if (!nodes.includes(temp)) {
                                            nodes.push(JSON.stringify({ "id": prereq.trim() }));
                                        }
                                        links.push({ "source": element.course_code.trim(), "target": prereq.trim() });
                                    }
                                })
                            }
                        }
                    });

                    let objectNodes = []
                    nodes.forEach(element => {
                        objectNodes.push(JSON.parse(element));
                    });
                    this.state.change = false;
                    this.drawChart(objectNodes, links, this.props.parentCallback);
                });
        }
    }

    // This function builds the relation graph, which is a force-directed graph.
    drawChart(nodes, links, callback, filter) {
        const svg = this.node
        const width = this.props.size[0]
        const height = this.props.size[1]
        let filterList = [];

        // This function adds the abilty for the user to zoom.
        let zoom = d3.zoom()
            .scaleExtent([1 / 2, 8])
            .on("zoom", zoomed);

        const color = () => {
            return "#" +
                Math.floor(Math.random() * 16777215).toString(16);
        };

        // These function add interactivity to the graph.
        const drag = (simulation) => {
            const dragstarted = (event) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            };

            const dragged = (event) => {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            };

            const dragended = (event) => {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            };

            return d3
                .drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        };

        // The "heart" of the simulation, a lot of the graph settings are
        // set here.
        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) {
                return d.id;
            }).distance(50))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .force("collide", d3.forceCollide(30))
            .on("tick", ticked);

        let graphSvg = d3.select(svg)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height]);

        let graphSvgGroup = d3.select(svg)
            .append("g")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height]);

        function zoomed(event) {
            graphSvgGroup.attr("transform", event.transform);
        }

        function center() {
            return d3.zoomIdentity
                .scale(0.75);
        }

        // Create the links
        let link = d3.select(svg).select("g")
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke-width", d => 1)
            .style("stroke", "#000000");

        nodes.forEach(currNode => {
            currNode.numLinks = 0
            links.forEach(currLink => {
                if (currLink.target === currNode.id) {
                    currNode.numLinks++;
                }
            })
        })

        // Create the nodes
        let node = d3.select(svg).select("g")
            .append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(nodes)
            .enter().append("g");

        // Set the course "bubble" size
        node.append("circle")
            .attr("r", function (d) {
                return 10 + (d.numLinks * 2);
            })
            .attr("data-numlinks", function (d) {
                return 10 + (d.numLinks * 2);
            })
            .attr("fill", color)
            .style("stroke-width", 3)    // set the stroke width
            .style("stroke", "white")
            .call(drag(simulation))
            // Styling, makes the node bigger and more readable
            .on("mouseenter", function () {
                let rad = d3.select(this).attr("data-numlinks");
                d3.select(this)
                    .attr("r", rad * 1.5);
                
                let tempId = d3.select(this.parentNode).select("text").text();
                d3.select(svg).select("g").select(".nodes").selectAll("g")
                    .each(function (d) {
                        if (tempId !== d3.select(this).select("text").text()) {
                            d3.select(this).style("opacity", 0.5);
                        } else {
                            d3.select(this).select("text")
                            .style("font-weight", "bold")
                        }
                    });
                d3.select(svg).select("g").select(".links")
                    .each(function (d) {
                        d3.select(this).style("opacity", 0.05);
                    });
            })
            // Styling, makes the node go back to normal after the mouse leaves
            .on("mouseleave", function () {
                let rad = d3.select(this).attr("data-numlinks");
                d3.select(this)
                    .attr("r", rad);
                d3.select(this.parentNode).select("text")
                    .style("font-weight", "normal");
                d3.select(svg).select("g").select(".nodes").selectAll("g")
                    .each(function (d) {
                        d3.select(this).style("opacity", 1.0);
                    });
                d3.select(svg).select("g").select(".links")
                    .each(function (d) {
                        d3.select(this).style("opacity", 1.0);
                    });
            })
            .on("click", function (event) {
                var conditions = ["or", "credits", "of", "4U", "(", ")"]
                //Check if the selected node contains any invalid characters for the query, if no continue
                if (!conditions.some(el => d3.select(this.parentNode).select("text").text().includes(el))) {
                    let courseCode = d3.select(this.parentNode)
                    .select("text").text();
                
                const responseOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    
                };
        
                const url = `http://cis4250-09.socs.uoguelph.ca:443/searchDB?course_code=${courseCode}`;

                fetch(url, responseOptions)
                    .then(response => response.json())
                    .then((json) => {
                        console.log(json);
                        callback(json);
                    });
                }
                
            });

        // Add the course label
        node.append("text")
            .text(function (d) {
                return d.id;
            })
            .attr('x', -30)
            .attr('y', function (d) {
                let newY = d3.select(this.parentNode).select("circle").attr("r");
                return ((-1) * (newY)) - 10;
            });

        simulation
            .nodes(nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(links);

        // The simulation happens in 'ticks' and this function determines
        // what happens when a 'tick' occurs.
        function ticked() {
            link
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
        }
        // Call the zoom and transform functions to make them apply to the graph.
        graphSvg.call(zoom);
        graphSvg.call(zoom.transform, center);
    }
    
    render() {
        return <div>
            <svg id="graph-svg" ref={node => this.node = node} width={this.props.size[0]} height={this.props.size[1]}></svg>
        </div>
    }
}

export default CourseRelations;