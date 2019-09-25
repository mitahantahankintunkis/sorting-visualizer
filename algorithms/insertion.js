export function sortStep(data, frame) {
    if (frame >= data.length) return true;

    let cur = data[frame];
    let i = frame;

    while (i > 0 && data[i - 1] > cur) {
        data[i] = data[i - 1];
        --i;
    }

    data[i] = cur;

    return false;
}
