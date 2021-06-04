function fixDate(date) {
    let i = date.indexOf('T');
    date = date.substring(0, i);
    return date;
}