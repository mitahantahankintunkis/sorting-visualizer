let xScale = d3.scaleBand()
    .domain([0, 1])
    .range([0, 1])
    .paddingInner(0.1);

let yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 1]);

let colorScale = d3.scaleSequential()
    .domain([0, 10])
    .interpolator(d3.interpolatePlasma);
//.interpolator(d3.interpolateWarm);
//.interpolator(d3.interpolateViridis);
//.interpolator(d3.interpolateMagma);
//.interpolator(d3.interpolateInferno);

export function render(cont, { data, width, height, type, colorRange }) {
    if (xScale.domain()[1].length != data.length) {
        xScale = d3.scaleBand()
            .domain(data.map((d, i) => i))
            .range([0, width])
            .paddingInner(0.1);
        
        yScale = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, height]);

        colorScale = d3.scaleSequential()
            .domain([0, colorRange])
            .interpolator(colorScale.interpolator());
    }

    let selection;

    switch (type) {
        case "dots":
            cont.selectAll("rect").remove();

            selection = cont.selectAll("circle").data(data, d => d[0]);
            selection.enter().append("circle")
            //.style("fill", "#de8d4f")
                     .merge(selection)
                        .style("fill", (d, i) => colorScale(d[1]))
                        .attr("r", xScale.bandwidth() > 2 ? xScale.bandwidth() : 2)
                        .attr("cx", (d, i) => xScale(i))
                        .attr("cy", (d, i) => height - yScale(d[0]));
            break;

        default:
            cont.selectAll("circle").remove();

            selection = cont.selectAll("rect").data(data, d => d[0]);
            selection.enter().append("rect")
            //.style("fill", "#de8d4f")
                     .merge(selection)
                        .style("fill", (d, i) => colorScale(d[1]))
                        .attr("width", xScale.bandwidth())
                        .attr("height", (d, i) => yScale(d[0]))
                        .attr("x", (d, i) => xScale(i))
                        .attr("y", (d, i) => height - yScale(d[0]));
            //.transition().duration(1000)
    }

    selection.exit().remove();
    //.transition().duration()
}
