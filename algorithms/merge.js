let swaps = new Array();
let dataCopy = new Array();

function partition(a, b) {
    let i = a;
    for (let j = a; j <= b; ++j) {
        if (dataCopy[j] <= dataCopy[b]) {
            swaps.push([i, j]);
            [dataCopy[i], dataCopy[j]] = [dataCopy[j], dataCopy[i]];
            i += 1
        }
    }

    return i - 1;
}

//function merge(a, b, n, m) {
//    const mn = n < m ? n : m;
//    for (let i = a)
//}


function quicksort(a, b) {
    if (a >= b) return;
    console.log(a, b);
    const m = partition(a, b);
    quicksort(a, m - 1);
    quicksort(m + 1, b);
}


export function sortStep(data, frame) {
    if (frame == 0) {
        swaps = new Array();
        dataCopy = data.slice();
        quicksort(0, data.length - 1);
        swaps = swaps.reverse();
        console.log(dataCopy.slice(data.length - 10));
    }

    let [i, j] = swaps.pop();
    [data[i], data[j]] = [data[j], data[i]];

    return swaps.length == 0;
}
