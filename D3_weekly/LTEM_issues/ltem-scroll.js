function getRotationalValues(radius, dynamicViscosity, temperature){
    const boltzmann = 1.380649e-23;
    const rotationalDiffusionCoefficient = (boltzmann*temperature)/(8*Math.PI * dynamicViscosity * (radius**3));
    const rotationalRelaxationTime = 1/rotationalDiffusionCoefficient;
    return  rotationalRelaxationTime;
};

function range(start, end,step, multiply = 1) {
    let range = [];
    for (let i = start; i <= end; i += step) {
      range.push(i*multiply);
    }
    return range;
  }
  

  function updateGraph(newXScale, newYScale, newXTicks, newYTicks) {
    xScale = newXScale;
    yScale = newYScale;
    xTickValues= newXTicks;
    yTickValues = newYTicks;
    // Update circles position
    motionGraph.selectAll('.motion-graph-line')
        .transition()
        .duration(1000) // Optional: Smooth transition
        .attr('cx', d => xScale(d))
        .attr('cy', (d, i) => yScale(relaxationTimes[i]));

    // Update axes
    const yAxis = d3.axisLeft(yScale).ticks(yTickValues.length)
        .tickValues(yTickValues)
        .tickFormat(d3.format('.1e'));

    const xAxis = d3.axisBottom(xScale).ticks(xTickValues.length)
        .tickValues(xTickValues)
        .tickFormat(d3.format(".1e"));

    motionGraph.select(".y-axis").transition().duration(1000).call(yAxis);
    motionGraph.select(".x-axis").transition().duration(1000).call(xAxis);
}

let xScaleLinear, yScaleLinear, xScaleLog, yScaleLog, xTickValuesLinear, xTickValuesLog,yTickValuesLinear, yTickValuesLog;
let xScale, yScale; 
let height, width;
let motionGraph = 0;

const radiusValues = range(1, 1501,1 , (1e-9));
console.log(radiusValues);
let relaxationTimes = [];
radiusValues.forEach(radius => {
    relaxationTimes.push(getRotationalValues(radius, 1e-3, 298));
});


d3.graphScroll()
    .graph(d3.selectAll('#graph'))
    .container(d3.select('#container'))
    .sections(d3.selectAll('#sections > div'))
    .on('active', function (i) { console.log(`section ${i} active`) 

    if (i==2){
        d3.select("#motion-graph")
        .transition()
        .duration(1000)
        .style("opacity", 0)  // Example: fade out
        .on("end", function() { d3.select(this).remove(); });
        motionGraph=0;
    }
    if (i==3){
        console.log(motionGraph);
        if (motionGraph===0){
        plotGraph();}
        else{
        updateGraph(xScaleLinear, yScaleLinear, xTickValuesLinear,yTickValuesLinear );};
        //updateGraph(xScaleLinear, yScaleLinear)
        //document.getElementById("#motion-graph").innerHTML("<img src='../../images/bg-reduced.jpg'>")
    }
    else if (i==4){
        d3.select("#time-limits")        
        .transition()
        .duration(1000)
        .style("opacity", 0)  // Example: fade out
        .on("end", function() { d3.select(this).remove(); });
        updateGraph(xScaleLog, yScaleLog, xTickValuesLog,yTickValuesLog);
    }
    else if (i==5){
        d3.select("#sample-sizes")        
        .transition()
        .duration(1000)
        .style("opacity", 0)  // Example: fade out
        .on("end", function() { d3.select(this).remove(); });
        annotateTimeLimits()
    }
    else if (i==6){
        addSampleSizes();
    }
})


function plotGraph(){
const margin = { top: 30, right: 30, bottom: 30, left: 50 };

width = 600 - margin.left - margin.right;
height = 400 - margin.top - margin.bottom;
motionGraph = d3.select("#motion-graph-div")
    .append("svg")
    .attr("id", "motion-graph" )
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
    .append('g')
    .attr("transform", `translate(${margin.left}, ${margin.top})`);



console.log(getRotationalValues(5e-9, 1e-3, 298));


console.log(d3.max(relaxationTimes));

xScaleLinear = d3.scaleLinear().domain([d3.min(radiusValues), d3.max(radiusValues)]).range([0, width]);
yScaleLinear = d3.scaleLinear().domain([d3.min(relaxationTimes), d3.max(relaxationTimes)]).range([height,0]);
xScaleLog = d3.scaleLog().domain([d3.min(radiusValues), d3.max(radiusValues)]).range([0, width]);
yScaleLog = d3.scaleLog().domain([d3.min(relaxationTimes), d3.max(relaxationTimes)]).range([height,0]);

xTickValuesLinear = [1e-9, 1e-7, 0.5e-6, 1e-6];
xTickValuesLog = [1e-9, 1e-8, 1e-7, 1e-6, 1e-5, 1e-4,];

yTickValuesLinear = [1e-1, 1, 10, 20];
yTickValuesLog = [1e-8, 1e-7, 1e-6, 1e-5, 1e-4, 1e-3,1e-2,1e-1, 1, 10];

xScale = xScaleLinear; 
yScale = yScaleLinear;
xTickValues = xTickValuesLinear;
yTickValues = yTickValuesLinear;

motionGraph.selectAll('.motion-graph-line')
.data(radiusValues)
.enter()
.append("circle")
.attr('cx',d => xScale(d))
.attr('cy',(d, i)=> yScale(relaxationTimes[i]))
.attr('fill', 'red')
.attr("class", "motion-graph-line")
.attr('r', 2)
.attr("stroke-width",0 );



const yAxis = d3.axisLeft(yScale).ticks(yTickValues.length)
.tickValues(yTickValues)
.tickFormat(d3.format('.1e'))
;



console.log(`tick values ${xTickValues}`)
const xAxis = d3.axisBottom(xScale).ticks(xTickValues.length)
.tickValues(xTickValues)
.tickFormat(d3.format(".1e"));;

motionGraph.append("g").attr("transform", "translate(0,0)").attr("class", "y-axis").call(yAxis);
motionGraph.append("g").attr("transform", `translate(0,${height})`).attr("class", "x-axis").call(xAxis);
};

function annotateTimeLimits(){
    const timeLimits = motionGraph.append('g')
    .attr("id", "time-limits");

    const limits = {"Flux-limited":120e-3,"Detector Transfer":13e-3, "Detector Readout":0.66e-3 }; 
    Object.keys(limits).forEach(key =>{

    const ypos  = yScale(limits[key]);
    timeLimits.append("line")
    .attr('class', "time-limit-line")
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', ypos )
    .attr('y2', ypos)
    .attr('stroke', "black")
    .attr('stoke-width', 1.5);
    timeLimits.append("text")
    .attr('x', 10)
    .attr("y", ypos-2)
    .attr("class", "annotation-text")
    .text(key)
    });

    
}

function addSampleSizes(){
    const sampleSizes = motionGraph.append("g")
    .attr("id", "sample-sizes")

    const sizeExamples = {"Apoferritin": 6e-9, "AVV":1.3e-8, "HIV": 5e-8}

    Object.keys(sizeExamples).forEach(key =>{
        const xpos = xScale(sizeExamples[key]);
        const ypos = yScale(getRotationalValues(sizeExamples[key], 1e-3, 298));
    sampleSizes.append('circle')
    .attr("cx", xpos)
    .attr("cy", ypos )
    .attr("r", 8)
    .attr("fill", "purple")
    .attr("stroke", "black");
    
    sampleSizes.append("text")
    .attr('x', xpos+15)
    .attr('y', ypos+15)
    .attr('class','annotation-text')
    .text(key);
    
    

    });
}