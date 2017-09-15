export function timestampToDate(ts) {
    const dt = new Date(ts);
    return dt.toDateString();
}