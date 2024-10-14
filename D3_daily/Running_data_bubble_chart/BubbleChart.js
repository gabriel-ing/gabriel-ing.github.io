

d3.csv("Strava_runs_processed.csv").then(function(data){
    
    const dist = data.map(d => d.distance); 
    const pace = data.map(d => d.pace_min)
    
    const dayOfYear = data.map(d => d.day_of_year)
    const year  =data.map(d => d.year)
    
    const margin = { top: 20, right: 30, bottom: 50, left: 80 };
    const width = 850 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    console.log(dayOfYear);
    console.log(d3.max(dayOfYear));
    const xScale = d3.scaleLinear().domain([d3.min(dayOfYear)-5, 365]).range([0, width]);
    const yScale = d3.scaleLinear().domain([8, d3.min(pace)-0.5]).range([0,height]);
    const bubbleScale = d3.scaleLinear().domain([0, d3.max(dist)+1]).range([1, 10]);
    
    const colorDict  = { 
        2018: "rgba(187.0, 173.000000000000007, 94.99999999999982, 0.5)",
        2019:"rgba(187.0, 14.000000000000007, 94.99999999999982, 0.5)", 
        2020:"rgba(220, 187, 234, 0.5)", 
        2021:"rgba(131.00000000000003, 186.00000000000003, 203.99999999999997, 0.5)", 
        2022: "rgba(80.00000000000006, 38.00000000000001, 114.99999999999999, 0.5)", 
        2023:"rgba(139.00000000000006, 154.00000000000003, 40.999999999999964, 0.5)", 
        2024: "rgba(91, 14, 52, 0.5)" };



    const svg = d3.select('#bubbleChart svg')
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.right})`);
    
    const background = svg.append("rect")
    .attr('fill', 'rgba(245, 245, 245, 0.8)')
    .attr("class", "plotBackground")
    .attr("width", width+margin.left+margin.right-20)
    .attr("height", height + margin.top+margin.bottom-12)
    .attr("transform", `translate(-${margin.left-15}, -${margin.top})`)
    .attr("stroke", "black")
    .attr("stroke-width", '0.5')
    .on("click", (event, d)=>{
        svg.selectAll(".points")
        .attr("opacity", "1");

    });

    const tooltip = d3.select("#tooltip")



    svg.selectAll(".points")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "points")
    .attr("cx", (d,i) => xScale(d.day_of_year))
    .attr("cy", (d, i) => yScale(d.pace_min))
    .attr("r", (d, i)=>bubbleScale(d.distance))
    .attr("fill", (d, i) => colorDict[d.year])
    .attr("stroke", "rgb(50,50,50)")
    .attr("stroke-width", '0.5')
    .attr("z-index", 1)
    .on("mouseover", (event,d)=>{
        
        svg.insert('line', ".points")
        .attr("class", "guidelines")
        .attr("x1", xScale(d.day_of_year))
        .attr("x2", xScale(d.day_of_year))
        .attr("y1", height)
        .attr("y2", yScale(d.pace_min))
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", 2);

        svg.insert('line', ".points")
        .attr("class", "guidelines")
        .attr("x1", 0)
        .attr("x2", xScale(d.day_of_year))
        .attr("y1", yScale(d.pace_min))
        .attr("y2", yScale(d.pace_min))
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", 2);

        tooltip.transition().duration(200).style("opacity", 0.9)
        tooltip.html(`${d.name}<br>${d.start_date}<br> Distance: ${Number(d.distance).toFixed(1)}<br>Pace: ${d.pace_min_sec}`)
            .style("left", (event.pageX+5)+"px")
            .style("top", event.pageY-28+"px")
    
    })
    .on("mouseout", ()=>{
        svg.selectAll(".guidelines").remove()
        tooltip.transition().duration(500).style("opacity",0);

    })
    .on("click", (event, d)=>{
        svg.selectAll(".points")
        .filter(point => point.id!==d.id)
        .attr("opacity", "0.2");
        svg.selectAll(".points")
        .filter(point => point.id===d.id)
        .attr("opacity", "1");
    });


    const monthStartDays = {
        1: "Jan",
        32: "Feb",
        60: "Mar",
        91: "Apr",
        121: "May",
        152: "Jun",
        183: "Jul",
        214: "Aug",
        245: "Sep",
        275: "Oct",
        306: "Nov",
        336: "Dec"
    };

    const paceAxis = {
        4: '4:00',
        4.5 : "4:30",
        5: "5:00",
        5.5: "5:30",
        6:"6:00",
        6.5: "6:30",
        7: "7:00",
        7.5: "7:30",
        8: "8:00"

    }


    const yAxis = d3.axisLeft(yScale).ticks(Object.keys(paceAxis)
    .length).tickValues(Object.keys(paceAxis).map(Number))
    .tickFormat(d=> paceAxis[d]);;

    const xAxis = d3.axisBottom(xScale).ticks(Object.keys(monthStartDays)
    .length).tickValues(Object.keys(monthStartDays).map(Number))
    .tickFormat(d=> monthStartDays[d]);

    svg.append("g").attr("transform", "translate(0,0)").call(yAxis);
    svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);

    svg.append("text")
    .attr("class", "axis-label")
    .attr("x", margin.left-20)
    .attr("y", height/2)
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90) translate(-260, -260)`)
    .text('Pace (min:sec)');

    svg.append("text")
    .attr("class", "axis-label")
    .attr("x", width/2)
    .attr("y", height+margin.bottom-15)
    .attr("text-anchor", "middle")
    .text("Time Of Year");

    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width-50}, 0)`);
    
    
    legend.append("rect")
    .attr("width", 80)
    .attr("height", 135)
    .attr("fill", "rgba(255,255,255,1)")
    .attr("transform", `translate(-20, -250)`)
    .on("click", (event, d)=>{
        svg.selectAll(".points")
        .attr("opacity", "1");
    });

    Object.keys(colorDict).forEach((key, i)=>{
        const legendRow = legend.append("g")
        .attr("transform", `translate(0, ${i*15})`)

        legendRow.append("circle")
        .attr("class", "legendCircle")
        .attr("r", 5)
        .attr("fill", colorDict[key])
        .on("click", (event,d)=>{
            console.log(i);
            console.log(key)
            
            svg.selectAll(".points")
            .filter((d, i)=>d.year!= +key)
            .attr("opacity", "0.1");
            
            svg.selectAll(".points")
            .filter((d,i)=> +d.year=== +key)
            .attr("opacity", "1");

        });

        legendRow.append("text")
        .attr("class", "legend-text")
        .attr("x", 20)
        .attr("y", 5)
        .attr("text-anchor", "start")
        .attr("font-size", "12px")
        .text(key);
    });
    sizeLegend = legend.append("g")
    .attr("transform", `translate(0, ${7*15+5})`);

    sizeLegend.append("circle")
    .attr("r", bubbleScale(3))
    .attr('transform', 'translate(0, 0)')
    .attr('fill', 'rgba(0,0,0,0.5)');

    sizeLegend.append("circle")
    .attr("r", bubbleScale(10))
    .attr("transform", "translate(37,0)")
    .attr('fill', 'rgba(0,0,0,0.5)');

    sizeLegend.append("text")
    .attr("class", "legend-text")
    .attr("x", 0)
    .attr('y', 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .text("3 km");

    sizeLegend.append("text")
    .attr("class", "legend-text")
    .attr("x", 37)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .text("10 km");

    

    
})

