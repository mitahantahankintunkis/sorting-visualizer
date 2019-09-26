let swaps    = new Array();
let dataCopy = new Array();


function radixSort() {
    // Smaller bases look cooler but are slower
    const base = 4;
    const buckets = new Array();
    const indices = new Array();

    for (let i = 0; i < base; ++i) { 
        buckets.push(new Array());
        indices.push(0);
    }

    let offset = 1;
    while (offset <= dataCopy.length) {
        for (let i = 0; i < base; ++i) indices[i] = 0;
        for (let d of dataCopy) {
            const bi = Math.floor(d / offset) % base;
            buckets[bi][indices[bi]] = d;
            ++indices[bi];
        }
        offset *= base;

        let index = 0;
        for (let i = 0; i < base; ++i) {
            for (let j = 0; j < indices[i]; ++j) {
                if (!buckets[i][j]) break;
                dataCopy[index] = buckets[i][j];
                swaps.push([index, dataCopy[index]]);
                ++index;
            }
        }
    }
}

export function sortStep(data, { frame, colorRange }) {
    if (frame == 0) {
        swaps = new Array();
        dataCopy = data.map(d => d[0]);
        radixSort();
        swaps = swaps.reverse();
    }

    if (swaps.length == 0) return true;

    let [i, v] = swaps.pop();
    data[i][0] = v;
    data[i][1] = colorRange;

    return false;
}
