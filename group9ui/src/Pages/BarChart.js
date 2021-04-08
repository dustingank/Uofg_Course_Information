import React, { Component } from 'react'
import './BarChart.css'
import * as d3 from 'd3'

const defaultSvgWidth = 640;
const defaultSvgHeight = 480;
const defaultSvgMargin = { top: 20, right: 5, bottom: 20, left: 35 };
const defaultSvgScrollHeight = 60;
const defaultPadding = 0.2;

class BarChart extends Component {
   constructor(props){
      super(props)
      const svgWidth = props.width === undefined ? defaultSvgWidth : props.width;
      const svgHeight = props.height === undefined ? defaultSvgHeight : props.height;
      const svgMargin = props.margin === undefined ? defaultSvgMargin : props.margin;
      const svgScrollHeight = props.scrollHeight === undefined ? defaultSvgScrollHeight : props.scrollHeight;
      const svgScrollMargin = { ...svgMargin, bottom: 0 };
      const padding = props.padding === undefined ? defaultPadding : props.padding;

      this.state = {
         loading:true, 
         data:null,
         scrollBars: [],

         xScrollScale: d3
        .scaleBand()
        .range([svgScrollMargin.left, svgWidth - svgScrollMargin.right])
        .padding(padding),

         yScrollScale: d3
        .scaleLinear()
        .range([svgHeight, svgHeight - svgScrollHeight + svgScrollMargin.top]),
      };

      this.createBarChart = this.createBarChart.bind(this)

   }

   async componentDidMount() {
     const url = "http://cis4250-09.socs.uoguelph.ca:443/prefixCount";
     const response = await fetch(url);
     const data = await response.json();
     this.setState({loading:false, data:data})
     this.createBarChart(this.state.data, this.props.parentCallback)
     this.scrollBars = this.calculateScrollBars(this.state.data);
   }
   
   //  componentDidMount(){ //This version is for offline testing, please don't delete
   //    this.setState({loading:false, data:this.props.data})

   //    // json.forEach(element => {
   //    //    this.props.filterList.forEach
   //    // });
   //    this.createBarChart(this.props.data, this.props.parentCallback, this.props.filterList)
   //  }
   
    UNSAFE_componentWillUpdate(prevProps){
      if (this.props.filterList !== prevProps.filterList){
         //console.log(this.props.filterList)
         console.log("you should set the state")
         document.getElementById('graph-div').innerHTML = "";
      }
   }

   componentDidUpdate(prevProps) {
      this.calculateScrollBars(this.state.data)
      this.createBarChart(this.state.data, this.props.parentCallback, this.props.filterList)
   }

   createBarChart(data, callback, filterOps) {
      let newData = data.filter(function(d){
         let flag = true 
         if (filterOps !== undefined){
            for (var i = 0; i < filterOps.length; i++){
               if (filterOps[i].prefix == d.prefix){
                  // this is in the list return false
                  console.log(filterOps[i].prefix , d.prefix)
                  flag = false
               }
            }
         }
         return flag
      })
      const topMargin = this.props.margins[0]
      const bottomMargin = this.props.margins[1]
      const leftMargin = this.props.margins[2]
      const rightMargin = this.props.margins[3]
      const node = this.node
      const dataMax = d3.max(newData, d => d.prefix_count)
      const width = this.props.size[0] - leftMargin - rightMargin
      const height = this.props.size[1] - topMargin - bottomMargin
      const xScale = d3.scaleBand()
         .domain(newData.map(d => d.prefix))
         .range([leftMargin, width - rightMargin])
         .padding(0.1)
      const yScale = d3.scaleLinear()
         .domain([0, dataMax])
         .range([topMargin, height - bottomMargin])
      const inverse_yScale = d3.scaleLinear()
         .domain([dataMax, 0])
         .range([topMargin, height - bottomMargin])
      const xAxis = d3.axisBottom().scale(xScale)
      const yAxis = d3.axisLeft().ticks(5).scale(inverse_yScale)

      //Creates bars on the chart
      // make sure there are no bars in the chart
      let bars =  d3.select(node).selectAll('bar');
      let obsoleteBars = bars.exit();
      obsoleteBars.remove();
      // adds bars
      d3.select(node)
         .selectAll('bar')
         .data(newData)
         .enter()
         .append('rect')
         .classed('bar', true)
         .style('fill', 'blue')
         .attr('x', d => xScale(d.prefix))
         .attr('y', d => inverse_yScale(d.prefix_count))
         .attr('height', d => yScale(d.prefix_count) - bottomMargin)
         .attr('width', d => xScale.bandwidth())
         .append('title')
         .text(d => d.prefix)
      
      // Event code for bars
      d3.select(node)
         .selectAll('.bar')
         .on('mouseenter', function(){
            d3.select(this).style('fill','red')
         })
         .on('mouseleave', function(){
            d3.select(this).style('fill','blue')
         })
         .on(('click'), function(){
            console.log('Clicked on ' + d3.select(this).text());
            callback(d3.select(this).text());
         })

      //Creates text above the bars
      d3.select(node)
        .selectAll('text')
        .data(newData)
        .enter()
        .append('text')
        .classed('bar-label', true)
        .attr('x', d => xScale(d.prefix) + xScale.bandwidth()/2.5)
        .attr('dx', 0)
        .attr('y', d => (height - yScale(d.prefix_count)))
        .attr('dy', -6)
        .text(d => d.prefix_count);

      //Build the bottom axis
      d3.select(node)
         .append('g')
         .classed('x_axis', true)
         .attr('transform', `translate(0,${height - bottomMargin})`)
         .call(xAxis);

      //Build the bottom axis title
      d3.select(node)
         .select('.x_axis')
         .append('text')
         .attr('x', width/2)
         .attr('y', 60)
         .attr('fill', '#000')
         .style('font-size', '20px')
         .style('text-anchor', 'middle')
         .text('Course prefix');

      //Build the left axis
      d3.select(node)
         .append('g')
         .classed('y_axis', true)
         .attr('transform', `translate(${leftMargin},0)`)
         .call(yAxis);

      //Build the left axis title
      d3.select(node)
         .select('.y_axis')
         .append('text')
         .attr('x', 0)
         .attr('y', -leftMargin/2)
         .attr('transform', `translate(0, ${height/2}) rotate(-90)`)
         .attr('fill', '#000')
         .style('font-size', '20px')
         .style('text-anchor', 'middle')
         .text('Courses with that prefix');
         
   }

   calculateScrollBars = (data) => {
      const newData = data;
      const { xScrollScale, yScrollScale, svgHeight } = this.state;
      const scrollActivityDomain = newData.map((d) => d.activity);
      const valueMax = d3.max(newData, (d) => d.value);

      xScrollScale.domain(scrollActivityDomain);
      yScrollScale.domain([0, valueMax]);

      const scrollBars = newData.map((d, index) => {
         const scrollX = xScrollScale(d.activity);
         const scrollY = yScrollScale(d.value);
         const scrollWidth = xScrollScale.bandwidth();
         const scrollHeight = svgHeight - scrollY;
         const scrollFill = "#cccccc";
   
         return {
           index,
           scrollX,
           scrollY,
           scrollWidth,
           scrollHeight,
           scrollFill
         };
       });
   
       return scrollBars;
   }

   render() {
      if (this.state.loading){return (<div>loading...</div>)}

      return  <React.Fragment> <svg  id="graph-div" ref={node => this.node = node} width={this.props.size[0]} height={this.props.size[1]}>
               {this.state.scrollBars.map((d, i) => (
                  <rect
                     key={i}
                     x={d.scrollX}
                     y={d.scrollY}
                     width={d.scrollWidth}
                     height={d.scrollHeight}
                     fill={d.scrollFill}
                  />
               ))}
         </svg></React.Fragment>
   }
}
export default BarChart
