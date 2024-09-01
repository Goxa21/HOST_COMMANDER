function RenderTime(hours, minutes) {
    let result = '';
    if (hours < 10) {
        result += '0' + hours + ':';
    }
    else {
        result += '' + hours + ':';
    }
    if (minutes < 10) {
        result += '0' + minutes;
    }
    else {
        result += '' + minutes;
    }
    return result;
}

function RenderDateStandart(day, month, year) {
    let result = '';
    result += '' + year + '-';
    if (month < 10) {
        result += '0' + month + '-';
    }
    else {
        result += '' + month + '-';
    }
    if (day < 10) {
        result += '0' + day;
    }
    else {
        result += '' + day;
    }
    return result;
}

function RenderTimeFull(hours, minutes, seconds) {
    let result = '';
    if (hours < 10) {
        result += '0' + hours + ':';
    }
    else {
        result += '' + hours + ':';
    }
    if (minutes < 10) {
        result += '0' + minutes + ':';
    }
    else {
        result += '' + minutes + ':';
    }
    if (seconds < 10) {
        result += '0' + seconds;
    }
    else {
        result += '' + seconds;
    }
    return result;
}

function RenderDate(day, month, year) {
    let result = '';
    if (day < 10) {
        result += '0' + day + '.';
    }
    else {
        result += '' + day + '.';
    }
    if (month < 10) {
        result += '0' + month + '.';
    }
    else {
        result += '' + month + '.';
    }
    result += '' + year;
    return result;
}