let xScale = d3.scaleBand()
    .domain([0, 1])
    .range([0, 1])
    .paddingInner(0.1);

let yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 1]);

export function render(cont, { data, width, height, type }) {
    if (xScale.domain()[1].length != data.length) {
        xScale = d3.scaleBand()
            .domain(data)
            .range([0, width])
            .paddingInner(0.1);
        
        yScale = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, height]);
    }

    let selection;
    switch (type) {
        case "dots":
            cont.selectAll("rect").remove();

            selection = cont.selectAll("circle").data(data, d => d);
            selection.enter().append("circle")
                        .style("fill", "#de8d4f")
                     .merge(selection)
                        .attr("r", xScale.bandwidth() > 2 ? xScale.bandwidth() : 2)
                        .attr("cx", (d, i) => xScale(d))
                        .attr("cy", (d, i) => height - yScale(d));
            break;

        default:
            cont.selectAll("circle").remove();

            selection = cont.selectAll("rect").data(data, d => d);
            selection.enter().append("rect")
                        .style("fill", "#de8d4f")
                     .merge(selection)
                        .attr("width", xScale.bandwidth())
                        .attr("height", (d, i) => yScale(d))
            //.transition().duration(1000)
                        .attr("x", (d, i) => xScale(d))
                        .attr("y", (d, i) => height - yScale(d));
    }

    selection.exit().remove();
    //.transition().duration()
}
