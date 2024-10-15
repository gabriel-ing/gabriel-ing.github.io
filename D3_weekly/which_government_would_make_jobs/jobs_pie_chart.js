d3.csv("All_adults_grouped_by_party.csv").then(function(data){
    const margin = {top: 20, right: 30, bottom: 30, left:30};
    const width = 850 - margin.right - margin.left;
    const height = 650 - margin.top -margin.bottom;

    const radius =  Math.min(width, height) / 2;; 

    const svg = d3.select("#chart1")
    .append('svg')
    .attr("width", width)
    .attr("height", height)
    .append('g')
    .attr("transform", `translate(${width/2}, ${height/2})`)


    const columnHeaders = Object.keys(data[0]);

    const date = "2019-08-06";

    createPie(data, date, radius, svg);

    createSlider(columnHeaders.slice(1), svg, data, radius);

    //svg.append('rect')
    //.attr('top', 195)
    //.attr('left', -100)
    //.attr("width", 200)
    //.attr("height", 10)
    //.attr("fill", 'black')
    //.on("click", (d,i)=>{
    //    createPie(data, "2024-09-30", radius, svg)
    //});




    

});
function playButton(svg, dateRange, updateValue){
    const playButton = svg.append("g").attr("class", "play-button");

    playButton.append('rect')
    .attr("x", -40)
    .attr("y", -60)
    .attr("width", 80)
    .attr("height", 30)
    .attr("border-radius", "100px")
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("rx", 10)
    .attr("ry", 10)
    .on("click", (event, d)=>{
        let i=0;
        const intervalId = setInterval(() => {
            if (i >= dateRange.length - 1) {
                clearInterval(intervalId); // Stop when we reach the last value
                return;
            }

            //console.log(i);
            updateValue(i);  // This calls the pie chart update

            i++;
        }, 250); 
    })
    playButton.append("text")
    .attr("x", 0)
    .attr("y", -40)
    .attr("text-anchor", "middle")
    .text("Play");

    

}
function createSlider(dateRange, svg, data, radius){
    

    const sliderWidth = 160;

    const maxValue = dateRange.length-1;
    const slider = svg.append('g');
    //console.log(maxValue)

    slider.append('text')
    .attr("id", "date-display")
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text(dateRange[0])

    slider.append("line")
    .attr("x1", -(sliderWidth/2))
    .attr("x2", sliderWidth/2)
    .attr("y1", 60)
    .attr("y2", 60)
    .attr("stroke", "rgba(30,30,30,0.7)")
    .attr("stroke-width", 5);;

    const handle = slider.append('circle')
    .attr("class", "slider")
    .attr("cx", -(sliderWidth/2))
    .attr("cy", 60)
    .attr("r", 10)
    .attr("fill", "black");

    const sliderScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([-(sliderWidth / 2), sliderWidth / 2]);

    const updateValue = (newValue) => {
        handle.attr("cx", sliderScale(newValue));
        //console.log(`value: ${newValue}`);
        d3.select("#date-display").text(`${dateRange[newValue]}`);
        createPie(data, dateRange[newValue], radius, svg);
    };

    const dragHandler = d3.drag()
    .on("start", (event)=>{
        event.sourceEvent.stopPropagation();
    })
    .on("drag", (event)=>{
        const sliderPosition = slider.node().getBoundingClientRect();
        const x = event.sourceEvent.clientX - sliderPosition.left -80; 
        //console.log(`x = ${x}`)
        const clampedX = Math.max(-(sliderWidth / 2), Math.min(x, sliderWidth / 2));

        const value = sliderScale.invert(clampedX);
        updateValue(Math.round(value));
    });
    handle.call(dragHandler);
    playButton(svg, dateRange, updateValue);


};

function createPie(data, date, radius, svg){
    svg.selectAll('.pie-chart')
    .remove();

    let dataset  ={};
    data.forEach(row =>{
        dataset[row["Party"]]= +row[date];
    });
    //console.log(dataset)
    const topSegments = ["Labour"]
        
    pieChart = svg.append("g").attr("class", "pie-chart")

    const pie = d3.pie().value(d=> d[1])        
    .sort((a, b) => {
        const indexA = topSegments.indexOf(a[0]);
        const indexB = topSegments.indexOf(b[0]);
        return indexA - indexB; 
    });

    const data_ready = pie(Object.entries(dataset));
        //console.log(data_ready)
    const arc = d3.arc()
        .innerRadius(180)
        .outerRadius(radius);
    
    
    pieChart.selectAll('.segment')
        .data(data_ready)
        .enter()
        .append("path")
        .attr("id", d=> `seg-${d.data[0]}`)
        .attr("class", "segment")
        .attr('d', arc)
        .attr('fill', (d, i) => d3.schemeCategory10[i]);
    
    pieChart.selectAll("slices")
        .data(data_ready)
        .enter()
        .each(function(d){
            const centroid = arc.centroid(d);
            //console.log(centroid);
            
            
        const segmentLabel = pieChart.append("text")
                .attr("transform", `translate(${centroid[0]}, ${centroid[1]})`)
                .attr("class", "segment-text")  
                .attr("id", `segment-text-${d.data[0]}`) 
                .attr("text-anchor", "middle");  
            
            
        segmentLabel.append("tspan")
                .attr("x", 0) 
                .attr("dy", "0em")  
                .text(`${d.data[0]}`); 
            
            
        segmentLabel.append("tspan")
                .attr("x", 0) 
                .attr("dy", "1.2em") 
                .text(`${(d.data[1] * 100).toFixed(0)}%`); 
            
            
        });
        
    };