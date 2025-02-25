
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
    
d3.csv("All_time_batting_stats_over_1000_runs.csv").then((data) => {

    
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

    svg = d3.select("#chart svg")
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

    
    
    const cricketBat = svg.select("#cricket-bat-base");
    console.log(cricketBat);
    


    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);


    
    
    

}
);