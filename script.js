  /*
      SETTING UP THE SVG CANVAS
      */
      const width = document.querySelector("#chart").clientWidth;
      const height = document.querySelector("#chart").clientHeight;
      const margin = {top: 25, left: 155, right: 100, bottom: 75};

      /*
      CREATE THE SVG CANVAS
    */
      const svg = d3.select("#chart")
        .append("svg")
        .attr("width",width)
        .attr("height", height);

      /*DEFINE DATA SET*/

      const data = [
        {year: 1996, stores: 1650},
        {year: 1998, stores: 2050},
        {year: 2000, stores: 4340},
        {year: 2002, stores: 7040},
        {year: 2004, stores: 12000},
        {year: 2006, stores: 21400},
        {year: 2008, stores: 23760},
        {year: 2010, stores: 24000},
        {year: 2012, stores: 27420},
        {year: 2014, stores: 29760},
        {year: 2016, stores: 30213},
        {year: 2018, stores: 34490},
        {year: 2020, stores: 38490}
      ];


      /*DEFINE SCALES*/

      const xScale = d3.scaleLinear()
        .domain([1995,2020])
        .range([margin.left, width-margin.right]);

      const yScale = d3.scaleLinear()
        .domain([0,45000])
        .range([height-margin.bottom, margin.top]);

      /*CREATE A LINE GENERATOR*/
      const line = d3.line()
        .x(function(d) { return xScale(d.year); })
        .y(function(d) { return yScale(d.stores); })
        .curve(d3.curveLinear);


      /*GENERATE AXES*/
      const xAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform",`translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.format("Y")));

      const yAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform",`translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

      /*DRAW THE MARKS */

      const path = svg.append("path")
        .datum(data)
          .attr("d", function(d) { return line(d); })
          .attr("stroke","#E11383")
          .attr("fill","none")
          .attr("stroke-width",2);

      const circle = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function(d) { return xScale(d.year); })
          .attr("cy", function(d) { return yScale(d.stores); })
          .attr("r",10)
          .attr("fill","#E11383");


      /*ADDING AXIS LABELS */
      svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height - 10)
        .attr("text-anchor","middle")
        .text("Year");

      svg.append("text")
        .attr("class","axisLabel")
        .attr("x", -height/2)
        .attr("y", 50)
        .attr("text-anchor","middle")
        .attr("transform","rotate(-90)")
        .text("Total stores");

    /*SIMPLE TOOLTIP*/ 

    const tooltip = d3.select("#chart")
        .append("div")
        .attr("class","tooltip"); 


        circle.on("mouseover", function(e) {
          let datum = d3.select(this).datum();
          let cx = +d3.select(this).attr("cx")+20;
          let cy = +d3.select(this).attr("cy")-10;
        
          tooltip.style("visibility","visible")  // make the tooltip visible
              .style("left", `${cx}px`)          // adjust the left (x) position of the tooltip
              .style("top", `${cy}px`)           // adjust the top (y) position of the tooltip
              .html(`<b>Year:</b> ${datum.year}<br><b>No.of Stores</b>: ${datum.stores} `); // update the text of the tooltip
        
          d3.select(this)
              .attr("stroke","#f5821F")
              .attr("stroke-width",2);
        }).on("mouseout", function() {
          tooltip.style("visibility","hidden");
          d3.select(this)
              .attr("stroke","none")
              .attr("stroke-width",0);
        });