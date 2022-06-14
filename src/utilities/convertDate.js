
export const convertDateToString = (str) => {
    if(str === null) return 'Unknow';
    const year = str.substring(0, 4);
    const month = monthText(parseInt(str.substring(5, 7)));
    const day = parseInt(str.substring(8, 10));
    return `${day} ${month} ${year}`;
}

function monthText(str) {
    switch (str) {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        case 12:
            return 'December';
    }
}
