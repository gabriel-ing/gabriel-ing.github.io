
/* function filterByCountry(countryCode){

    console.log(data);
    console.log("here");
    svg.selectAll(".points")
    .filter((d, i)=> data[i].Country!==countryCode)
    .attr("opacity", "0.1");
    svg.selectAll(".points")
    .filter((d, i)=> data[i].Country===countryCode)
    .attr("opacity", "1");
} */
    
Promise.all([d3.csv("All_time_batting_stats_over_1000_runs.csv"), d3.xml("CricketBatBlank.svg")]).then(([data, iconDoc]) => {

    
    console.log(data)

    const margin = { top: 20, right: 30, bottom: 50, left: 80 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const teams = {'IND':"rgb(101, 165, 238)",
        'AUS':"rgb(246,233,114)",
        'SA':"rgb(102,163,130)",
        'ENG':"rgb(211,49, 45)",
        'SL':"rgb(44,61, 133)",
        'WI':"rgb(132, 38, 74)",
        'PAK':"rgb(43, 62,62)",
        'NZ':"black",
        'BAN':"rgb(64, 96,82)",
        'ZIM':"rgb(207, 11,58)"}
    
    const av = data.map(d  => Number(d.Ave));
    const runs = data.map(d => Number(d.Runs) );
    const hs = data.map(d=>Number(d.HS));
    // console.log(runs, "runs")
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
    const yScale = d3.scaleLinear().domain([0, 16000]).range([height,0]); 
    const bubbleScale = d3.scaleLinear().domain([0, d3.max(hs)]).range([0.01, 0.1]);
    
    console.log(yScale(5))

    icon = iconDoc.documentElement
    
    data.forEach(d=>{
        const node = svg.append('g')
        //.attr("transform", `scale(${bubbleScale(d.HS)})`)
        //.attr("x", xScale(d.Ave))
        //.attr("y", yScale(d.Runs)) //
        .attr("transform", `translate(${xScale(d.Ave)}, ${yScale(d.Runs)}) scale(${bubbleScale(d.HS)})`)
        .attr("id", d.Player)
        .attr("class", `points ${d.Country}`)
        .on("mouseover", (event)=> {
            //console.log(d.Ave,d.Runs,  xScale(d.Ave),yScale(d.Runs))
            tooltip.transition().duration(200).style("opacity", 0.9)
            tooltip.html(`<p>${d.Player}<br> ${d.Runs} at ${d.Ave}</p>`)
                .style("left", (event.pageX+5)+"px")
                .style("top", event.pageY-28+"px")
        })
        .on("mouseout", ()=>{
            
            tooltip.transition().duration(500).style("opacity",0);
    
        });


        node.node().appendChild(icon.cloneNode(true));
    });



    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g").attr("transform", "translate(0,0)").call(yAxis);
    svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);


 
    buttonsSVG = d3.select('#chart')
    .append("svg")
    .attr("width", width)
    .attr("height", 200);

    var pos = 100;
    Object.keys(teams).forEach( (key, ind)=>{
        buttonsSVG.append('rect')
        .attr("width", 50)
        .attr("height", 30)
        .attr("class", `rect-${key} button`)
        .attr("transform", `translate(${pos} , 0)`)
        .attr("fill", teams[key])
        .on('click', ()=>{
            
            svg.selectAll(".points")
            .filter((d, i)=> data[i].Country!==key)
            .attr("opacity", "0.1")
            svg.selectAll(".points")
            .filter((d, i)=> data[i].Country===key)
            .attr("opacity", "1")
            
        });
        pos+=65;
        buttonsSVG.append('text')
        .attr("class", "button-label")
        .attr("transform", `translate(${pos+3}, 5)`)
        .text(key)


    });

    buttonsSVG.append("rect")
    .attr("fill", "rgb(220,220,220)")
    .attr("width", 50)
    .attr("height", 30)
    .attr("class", "button rect-reset")
    .attr("transform", `translate(${pos}, 0)`)
    .on("click", () => {
        svg.selectAll(".points")
        .attr("opacity", 1);
    });
    
    pos = 100
    const filterByYearYPos = 50;
    
    buttonsSVG.append("rect")
    .attr("transform", `translate(${pos}, ${filterByYearYPos})`)
    .attr("width", 50)
    .attr("height", 30)
    .attr("fill", "rgb(200,200,200)")
    .attr("class", "button year-filter")
    .on("click", ()=>{
        const rangeStart = Number(document.getElementById('range-start').value);
        const rangeEnd = Number(document.getElementById('range-end').value);
       
        if (isNaN(rangeStart) || isNaN(rangeEnd)) {
            console.error('Invalid range inputs');
            return;
        }
        console.log(rangeStart, rangeEnd)
        svg.selectAll(".points")
        .filter((d, i)=> !(Number(data[i].Year_of_debut) >= Number(rangeStart) && Number(data[i].Year_of_debut)< Number(rangeEnd)))
        .attr("opacity", "1")
        svg.selectAll(".points")
        .filter((d, i)=> !(Number(data[i].Year_of_debut) >= Number(rangeStart) && Number(data[i].Year_of_debut)< Number(rangeEnd)))
        .attr("opacity", "0.1")

    });
    

}
);