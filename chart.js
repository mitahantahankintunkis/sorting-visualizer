let xScale = d3.scaleBand()
    .domain([0, 1])
    .range([0, 1])
    .paddingInner(0.1);

let yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 1]);

export function render(cont, { data, width, height }) {
    if (xScale.domain()[1].length != data.length) {
        xScale = d3.scaleBand()
            .domain(data)
            .range([0, width])
            .paddingInner(0.1);
        
        yScale = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, height]);
    }

    const rects = cont.selectAll("rect").data(data, d => d);

    rects.enter().append("rect")
         .style("fill", "#de8d4f")
        .merge(rects)
         .attr("width", xScale.bandwidth())
         .attr("height", (d, i) => yScale(d))
    //.transition().duration()
         .attr("x", (d, i) => xScale(d))
         .attr("y", (d, i) => height - yScale(d));

    rects.exit().remove();
}
