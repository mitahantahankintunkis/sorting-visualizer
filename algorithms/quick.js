let swaps = new Array();
let dataCopy = new Array();

function partition(a, b) {
    let i = a;
    for (let j = a; j <= b; ++j) {
        if (dataCopy[j][0] <= dataCopy[b][0]) {
            swaps.push([i, j]);
            [dataCopy[i], dataCopy[j]] = [dataCopy[j], dataCopy[i]];
            i += 1
        }
    }

    return i - 1;
}


function quicksort(a, b) {
    if (a >= b) return;
    const m = partition(a, b);
    quicksort(a, m - 1);
    quicksort(m + 1, b);
}


export function sortStep(data, { frame, colorRange }) {
    if (frame == 0) {
        swaps = new Array();
        dataCopy = data.slice();
        quicksort(0, data.length - 1);
        swaps = swaps.reverse();
    }

    if (swaps.length == 0) return true;

    let [i, j] = swaps.pop();
    [data[i], data[j]] = [data[j], data[i]];
    data[i][1] = colorRange;
    data[j][1] = colorRange;

    return false;
}
