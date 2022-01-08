import moment from 'moment';

export function dateRangeValidator(startDate, endDate) {
    const dateDiff = moment(endDate).diff(startDate, 'days');

    if (dateDiff > 100) {
        return 'RANGE_TOO_LARGE';
    } else if (dateDiff < 0) {
        return 'NOT_CHRONOLOGICAL';
    }

    return 'VALID_DATE';
}