d3.csv("Age_group_results.csv").then(function(data){
    const margin = {top: 20, right: 30, bottom: 30, left:30};
    const width = 850 - margin.right - margin.left;
    const height = 650 - margin.top -margin.bottom;
    
    console.log(data);

    const group = data.map(d => d.Group);
    const pastPercent = data.map(d=> d.Past);
    const futurePercent = data.map(d=> d.Future);



    const xpos = width/2;


    const centerOffset = 50;

    const max_value = d3.max([d3.max(pastPercent), d3.max(futurePercent)]);


    const yScale = d3.scaleBand().domain(group).range([20, height]).padding(0.1);
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, xpos]);


    const guideline_x = [
        xpos-xScale(75)-centerOffset,
        xpos-xScale(50)-centerOffset,
        xpos - xScale(25) - centerOffset, 
        xpos-centerOffset,
        xpos+centerOffset,
        xpos + xScale(25)+centerOffset, 
        xpos + xScale(50)+centerOffset,
        xpos+xScale(75)+centerOffset
    ];
    
    const guidelineLabels=[75, 50, 25,0,0,25,50,75];



    const svg = d3.select("#chart1")
    .append("svg")
    .attr("width", width)
    .attr("height", height+30);
    
    svg.selectAll("guidelines")
    .data(guideline_x)
    .enter()
    .append("line")
    .attr("class", "guidelines")
    .attr('x1',(d, i)=> guideline_x[i])
    .attr('x2',(d, i)=> guideline_x[i])
    .attr("y1",25 )
    .attr("y2", height-5)
    .attr("stroke", "rgba(80,80,80,0.7)")
    .attr("stroke-width", 2);

    let i=0;
    while (i<guidelineLabels.length){
        svg.append('text')
        .attr("class", "guideline-label")
        .attr('x', guideline_x[i])
        .attr("y", height+10)
        .attr("text-anchor", "middle")
        .text(`${guidelineLabels[i]}%`)
        i++
    }

    svg.append("text")
    .attr("class", "subtitle")
    .attr("x", xpos-centerOffset-30)
    .attr("y", 20)
    .text("Past");

    svg.append("text")
    .attr("class", "subtitle")
    .attr("x", xpos+centerOffset)
    .attr("y", 20)
    .text("Future");



    svg.selectAll(".future-bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "future-bar")
    .attr("x", xpos+centerOffset)
    .attr("y", (d, i) => yScale(d.Group))
    .attr("height", yScale.bandwidth())
    .attr("width", (d, i) => xScale(d.Future))
    .on("mouseover", (event, d)=>{
        d3.select(`#future-label-${d.index}`).attr('opacity', 1);
    })
    .on("mouseout", (event, d)=>{
        d3.select(`#future-label-${d.index}`).attr('opacity', 0);
    });

    svg.selectAll("future-bar-labels")
    .data(data)
    .enter()
    .append("text")
    .attr('class', "future-bar-labels")
    .attr('x',d=> xpos+(xScale(d.Future)*0.5)+centerOffset)
    .attr('y',(d, i) => yScale(d.Group)+0.5*yScale.bandwidth())
    .attr('id', d=>`future-label-${d.index}`)
    .attr('opacity', 0)
    .attr("text-anchor", "middle")
    .text(d =>`${Number(d.Future).toFixed(0)}%`);


    svg.selectAll(".past-bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "past-bar")
    .attr("id",  (d, i)=> `Past_${d.Group}`)
    .attr("x", (d, i)=> xpos-xScale(d.Past)-centerOffset)
    .attr("y", (d, i) => yScale(d.Group))
    .attr("height", yScale.bandwidth())
    .attr("width", (d, i) => xScale(d.Past))
    .on("mouseover", (event, d)=>{
        d3.select(`#past-label-${d.index}`).attr('opacity', 1);

    })
    .on("mouseout", (event, d)=>{
        d3.select(`#past-label-${d.index}`).attr('opacity', 0);
    });

    svg.selectAll("past-bar-labels")
    .data(data)
    .enter()
    .append("text")
    .attr('class', "past-bar-labels")
    .attr('x',d=> xpos-(xScale(d.Past)*0.5)-centerOffset)
    .attr('y',(d, i) => yScale(d.Group)+0.5*yScale.bandwidth())
    .attr('id', d=>`past-label-${d.index}`)
    .attr('opacity', 0)
    .attr("text-anchor", "middle")
    .text(d =>`${Number(d.Past).toFixed(0)}%`);


    svg.selectAll("group-label")
    .data(data)
    .enter()
    .append('text')
    .attr('x', xpos)
    .attr('text-anchor', 'middle')
    .attr('y', d => yScale(d.Group)+(0.5*yScale.bandwidth()))
    .text( d=> d.Group);



});
