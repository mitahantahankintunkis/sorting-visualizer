export function sortStep(data, { frame, colorRange }) {
    if (frame >= data.length) return true;

    let cur = data[frame];
    data[frame][1] = colorRange;
    let i = frame;

    while (i > 0 && data[i - 1][0] > cur[0]) {
        data[i] = data[i - 1];
        //data[i][1] = colorRange;
        --i;
    }

    data[i] = cur;
    data[i][1] = colorRange;

    return false;
}
