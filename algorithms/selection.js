export function sortStep(data, frame) {
    if (frame >= data.length) return true;

    // Finding minimum value in the array
    let minIndex = frame;
    for (let j = frame + 1; j < data.length; ++j) {
        if (data[minIndex] > data[j]) {
            minIndex = j;
        }
    }

    // Swapping
    [data[frame], data[minIndex]] = [data[minIndex], data[frame]];

    return false;
}
