Promise.all([d3.csv("batting_stats.csv"), d3.xml("CricketBatBlank.svg")]).then(([data, iconDoc]) => {
    console.log(data)

    const margin = { top: 20, right: 30, bottom: 50, left: 80 };
    const width = 1000 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    const av = data.map(d  => Number(d.Ave));
    const runs = data.map(d => Number(d.Runs) );
    const hs = data.map(d=>Number(d.HS));
    console.log(runs, "runs")
    const tooltip = d3.select("#tooltip")

    svg = d3.select("#chart")
    .append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    console.log(d3.max(av))
    console.log(d3.max(runs), "runs")
    const xScale = d3.scaleLinear().domain([0, d3.max(av)+10]).range([0, width ]);
    const yScale = d3.scaleLinear().domain([0, d3.max(runs)+70]).range([height,0]); 
    const bubbleScale = d3.scaleLinear().domain([0, d3.max(hs)]).range([0.03, 0.2]);
    
    console.log(yScale(5))

    icon = iconDoc.documentElement
    
    data.forEach(d=>{
        const node = svg.append('g')
        .attr("transform", `translate(${xScale(d.Ave)}, ${yScale(d.Runs)}) scale(${bubbleScale(d.HS)})`)
        .attr("id", d.Player)
        .on("mouseover", (event)=> {
            console.log(d.Ave,d.Runs,  xScale(d.Ave),yScale(d.Runs))
            tooltip.transition().duration(200).style("opacity", 0.9)
            tooltip.html(`<p>${d.Player}</p>`)
                .style("left", (event.pageX+5)+"px")
                .style("top", event.pageY-28+"px")
        });


        node.node().appendChild(icon.cloneNode(true));
    });



    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g").attr("transform", "translate(0,0)").call(yAxis);
    svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);


}
);