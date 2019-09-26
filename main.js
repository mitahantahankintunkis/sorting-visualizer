import { render } from './chart.js';
import * as SelectionSort from './algorithms/selection.js';
import * as InsertionSort from './algorithms/insertion.js';
import * as Quicksort from './algorithms/quick.js';
import * as Mergesort from './algorithms/merge.js';

const width = 600;
const height = 600;
const svg = d3.select(".chart").append("svg");

svg.attr("width", "100%")
   .attr("height", "100%")
   .attr("viewBox", `0 0 ${width} ${height}`);

let data = new Array(100);
for (let i = 0; i < data.length; ++i) data[i] = i + 1;

const props = {
    data: data,
    height: height,
    width: width,
    type: "bar"
}

let stepSize = 1;
let handle = null;
let frameIndex = 0;

let sortFunctions = {
    "selectionsort": SelectionSort.sortStep,
    "insertionsort": InsertionSort.sortStep,
    "quicksort":     Quicksort.sortStep,
};

// Shuffle
function sort() {
    for (let step = 0; step < stepSize; ++step) {
        const key = $("#sAlgorithm")[0].value;

        if (!sortFunctions.hasOwnProperty(key)) {
            console.log("Invalid sort function");
            return;
        }

        const sorted = sortFunctions[key](data, frameIndex);
        if (sorted) {
            render(svg, props);
            return;
        }

        ++frameIndex;
    }

    render(svg, props);
    handle = requestAnimationFrame(sort);
}

function shuffleAndSort() {
    // Shuffle has a constant step size
    for (let step = 0; step < data.length / 50; ++step) {
        if (frameIndex >= data.length) {
            frameIndex = 0;
            setTimeout(() => handle = requestAnimationFrame(sort), 500);
            return;
        }

        let temp = data[frameIndex];
        let j = Math.floor(Math.random() * data.length);

        if (!data[frameIndex] || !data[j]) console.log(j, data.length);

        data[frameIndex] = data[j];
        data[j] = temp;

        ++frameIndex;
    }

    render(svg, props);
    handle = requestAnimationFrame(shuffleAndSort);
}

function stopAnimation() {
    frameIndex = 0;
    if (handle) cancelAnimationFrame(handle);
}

function updateData(n) {
    data = data.filter((d) => d <= n).slice(0, n);
    for (let i = data.length; i < n; ++i) data.push(i + 1);

    props.data = data;
    render(svg, props);
}

// Event listeners
$(window).on("load", () => {
    $("#nElements").trigger("input");
    $("#steps").trigger("input");
    $("#sType").trigger("input");
});

$("#sType").on("input", function() {
    props.type = this.value;
    render(svg, props);
});

$("#bSort").on("click", function() {
    stopAnimation();
    handle = requestAnimationFrame(shuffleAndSort);
});

$("#nElements").on("input", function() {
    stopAnimation();
    const n = this.valueAsNumber;
    updateData(n);
});

$("#steps").on("input", function() {
    stepSize = this.valueAsNumber;
});

$("#sAlgorithm").on("input", () => {
    stopAnimation();
});
