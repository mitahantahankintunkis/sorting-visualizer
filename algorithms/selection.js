export function sortStep(data, { frame, colorRange }) {
    if (frame >= data.length) return true;

    // Finding minimum value in the array
    let minIndex = frame;
    for (let j = frame + 1; j < data.length; ++j) {
        if (data[minIndex][0] > data[j][0]) {
            minIndex = j;
        }
    }

    // Swapping
    [data[frame], data[minIndex]] = [data[minIndex], data[frame]];
    data[frame][1] = colorRange;
    data[minIndex][1] = colorRange;

    return false;
}
